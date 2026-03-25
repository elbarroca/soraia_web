import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/db/schema";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function getDashboardStats() {
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

  return {
    artworks: artworkCount.value,
    news: newsCount.value,
    exhibitions: exhibitionCount.value,
    orders: orderCount.value,
    contacts: contactCount.value,
    subscribers: subscriberCount.value,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { title: "Artworks", value: stats.artworks, icon: Image },
    { title: "News", value: stats.news, icon: Newspaper },
    { title: "Exhibitions", value: stats.exhibitions, icon: CalendarDays },
    { title: "Orders", value: stats.orders, icon: ShoppingBag },
    { title: "Contacts", value: stats.contacts, icon: Mail },
    { title: "Subscribers", value: stats.subscribers, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-2">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Welcome back, Soraia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-[var(--color-ink-muted)]" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
