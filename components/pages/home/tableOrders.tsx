"use client";

import { OrdersApis } from "@/apis/orders";
import { TradeDoc } from "@/types/orders";
import { momentJalali } from "@/utils/moment_jalali";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function TableOrdersInHome() {
  const ordersApis = new OrdersApis();
  const router = useRouter();

  const [listOrders, setListOrders] = useState<TradeDoc[] | null | "error">(null);

  useEffect(() => {
    const getdata = async () => {
      const res = await ordersApis.getNodes(); // همون چیزی که خودت داری صدا می‌زنی
      if (res.res.status === 200) {
        setListOrders(res?.data?.data);
      } else if (res.res.status === 401) router.push("/login");
      else {
        console.log("Error fetching nodes:", res);
        setListOrders("error");
      }
    };
    getdata();
  }, []);

  const fmtMoney = (d?: { $numberDecimal: string }) => {
    const n = Number(d?.$numberDecimal ?? 0);
    if (!Number.isFinite(n)) return "0";
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };


  const badgeClass = (type: TradeDoc["type"]) => {
    if (type === "buy") return "bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/30";
    return "bg-[var(--color-danger)]/15 text-[var(--color-danger)] border-[var(--color-danger)]/30";
  };

  const totals = useMemo(() => {
    if (!Array.isArray(listOrders)) return null;
    const count = listOrders.length;
    const totalAmount = listOrders.reduce((acc, o) => acc + (o.amount ?? 0), 0);
    const totalFee = listOrders.reduce((acc, o) => acc + (o.fee ?? 0), 0);
    const totalPaying = listOrders.reduce((acc, o) => acc + Number(o.pricePaying?.$numberDecimal ?? 0), 0);
    return { count, totalAmount, totalFee, totalPaying };
  }, [listOrders]);

  return (
    <div className="w-full">


      {/* States */}
      {listOrders === null && (
        <div
          className="
            rounded-2xl border p-6 text-center
            bg-background
            border-primary/35
            text-text
          "
        >
          <div className="animate-pulse text-sm opacity-80">Loading orders...</div>
        </div>
      )}

      {listOrders === "error" && (
        <div
          className="
            rounded-2xl border p-6
            bg-danger/10
            border-danger/30
            text-text
          "
        >
          <div className="font-semibold">Failed to fetch orders</div>
          <div className="text-sm opacity-80 mt-1">Check console logs and API response.</div>
        </div>
      )}

      {Array.isArray(listOrders) && listOrders.length === 0 && (
        <div
          className="
            rounded-2xl border p-6 text-center
            bg-background
            border-primary/35
            text-text
          "
        >
          <div className="text-sm opacity-80">No orders found.</div>
        </div>
      )}

      {/* Table */}
      {Array.isArray(listOrders) && listOrders.length > 0 && (
        <div
          className="
            overflow-hidden rounded-2xl border
            bg-background
            border-primary/35
            shadow-sm
          "
        >
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead
                className="
                  bg-primary/12
                  text-text
                  text-center
                "
              >
                <tr className="h-12 text-center">
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Paying</th>
                  <th>Fee</th>
                  <th>NodeId</th>
                  <th>CreatedAt</th>
                </tr>
              </thead>

              <tbody className="text-text">
                {listOrders.map((o, idx) => (
                  <tr
                    key={o._id?.$oid ?? idx}
                    className="
                      border-t border-primary/25
                      hover:bg-primary/8
                      transition-colors 
                    "
                  >
                    <td className="px-4 py-3 opacity-80">{idx + 1}</td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(o.type)}`}>
                        {o.type.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-4 py-3 font-medium">{o.amount}</td>
                    <td className="px-4 py-3">{fmtMoney(o.price)}</td>
                    <td className="px-4 py-3 font-semibold">{fmtMoney(o.pricePaying)}</td>
                    <td className="px-4 py-3">{(o.fee ?? 0).toLocaleString(undefined, { maximumFractionDigits: 6 })}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs opacity-85">{o.nodeId.toString() ?? "-"}</code>
                    </td>

                    <td className="px-4 py-3">{momentJalali(o.createdAt?.toString() , "jYYYY/jMM/jDD HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      )}
    </div>
  );
}
