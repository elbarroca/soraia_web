import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/empty-state";

export const dynamic = "force-dynamic";

function formatOrderAmount(amount: string, currency: string): string {
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
    }).format(Number(amount));
  } catch {
    return `${currency} ${Number(amount).toFixed(2)}`;
  }
}

export default async function AdminOrdersPage() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Orders</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          {allOrders.length} orders
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <AdminEmptyState
                    icon={ShoppingBag}
                    title="No orders yet"
                    description="Orders will appear here when customers make purchases."
                  />
                </TableCell>
              </TableRow>
            ) : (
              allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.customerName}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {order.customerEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatOrderAmount(order.amount, order.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "paid" || order.status === "completed"
                          ? "default"
                          : order.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-[var(--color-ink-muted)]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
