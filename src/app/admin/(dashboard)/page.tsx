import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Image,
  Newspaper,
  CalendarDays,
  ShoppingBag,
  Mail,
  Users,
} from "lucide-react";
import { db } from "@/db";
import {
  artworks,
  news,
  exhibitions,
  orders,
  contacts,
  newsletterSubscribers,
  type Order,
} from "@/db/schema";
import { count, desc } from "drizzle-orm";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
  try {
    const [
      [artworkCount],
      [newsCount],
      [exhibitionCount],
      [orderCount],
      [contactCount],
      [subscriberCount],
    ] = await Promise.all([
      db.select({ value: count() }).from(artworks),
      db.select({ value: count() }).from(news),
      db.select({ value: count() }).from(exhibitions),
      db.select({ value: count() }).from(orders),
      db.select({ value: count() }).from(contacts),
      db.select({ value: count() }).from(newsletterSubscribers),
    ]);

    let recentOrders: Order[] = [];
    try {
      recentOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(5);
    } catch {
      console.warn("[DB] Recent orders fetch failed — using empty array");
    }

    return {
      artworks: artworkCount.value,
      news: newsCount.value,
      exhibitions: exhibitionCount.value,
      orders: orderCount.value,
      contacts: contactCount.value,
      subscribers: subscriberCount.value,
      recentOrders,
    };
  } catch {
    console.warn("[DB] Dashboard stats failed — using zeros");
    return {
      artworks: 0,
      news: 0,
      exhibitions: 0,
      orders: 0,
      contacts: 0,
      subscribers: 0,
      recentOrders: [] as Order[],
    };
  }
}

function orderStatusVariant(
  status: string
): "default" | "secondary" | "destructive" {
  if (status === "paid" || status === "completed") return "default";
  if (status === "pending") return "secondary";
  return "destructive";
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { title: "Artworks", value: stats.artworks, icon: Image, href: "/admin/artworks" },
    { title: "News", value: stats.news, icon: Newspaper, href: "/admin/news" },
    { title: "Exhibitions", value: stats.exhibitions, icon: CalendarDays, href: "/admin/exhibitions" },
    { title: "Orders", value: stats.orders, icon: ShoppingBag, href: "/admin/orders" },
    { title: "Contacts", value: stats.contacts, icon: Mail, href: "/admin/contacts" },
    { title: "Subscribers", value: stats.subscribers, icon: Users, href: "/admin/newsletter" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-2">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Welcome back, Soraia.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href} className="block">
            <Card className="transition-shadow hover:shadow-md hover:border-[var(--color-border-strong)]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-[var(--color-ink-muted)]" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="mt-2 text-xs text-[var(--color-ink-muted)]">View →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/artworks/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add Artwork
        </Link>
        <Link
          href="/admin/settings"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Manage Settings
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Recent Orders</h2>
        <Card>
          {stats.recentOrders.length === 0 ? (
            <CardContent className="py-10 text-center text-sm text-[var(--color-ink-muted)]">
              No orders yet
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <div>{order.customerName}</div>
                        <div className="text-xs text-[var(--color-ink-muted)]">
                          {order.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: order.currency ?? "EUR",
                        }).format(Number(order.amount))}
                      </TableCell>
                      <TableCell>
                        <Badge variant={orderStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[var(--color-ink-muted)]">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          )}
          <div className="border-t border-[var(--color-border)] px-6 py-3">
            <Link
              href="/admin/orders"
              className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              View all orders →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
