"use client";

import { NodesApis } from "@/apis/node";
import { NodeDoc } from "@/types/nodes";
import { momentJalali } from "@/utils/moment_jalali";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function TableNodesInHome() {
  const nodesApis = new NodesApis();
  const router = useRouter();

  const [nodes, setNodes] = useState<NodeDoc[] | null | "error">(null);

  useEffect(() => {
    const getdata = async () => {
      const res = await nodesApis.getNodes();

      if (res?.res?.status === 200) {
        // با توجه به چیزی که خودت نوشتی: res.data.data
        // اگر ساختار متفاوت بود فقط همین خط رو آپدیت کن
        setNodes(res?.data?.data ?? []);
      } else if (res?.res?.status === 401) {
        router.push("/login");
      } else {
        console.log("Error fetching nodes:", res);
        setNodes("error");
      }
    };

    getdata();
  }, [router]);

  // Decimal128 formatter
  const fmtMoney = (d?: { $numberDecimal: string }, maxFrac = 6) => {
    const n = Number(d?.$numberDecimal ?? 0);
    if (!Number.isFinite(n)) return "0";
    return n.toLocaleString(undefined, { maximumFractionDigits: maxFrac });
  };

  const boolPill = (v: boolean, trueLabel = "ON", falseLabel = "OFF") =>
    v ? (
      <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/30">
        {trueLabel}
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold bg-[var(--color-danger)]/15 text-[var(--color-danger)] border-[var(--color-danger)]/30">
        {falseLabel}
      </span>
    );

  const summary = useMemo(() => {
    if (!Array.isArray(nodes)) return null;

    const count = nodes.length;
    const totalSupply = nodes.reduce((acc, n) => acc + (n.totalSupply ?? 0), 0);
    const circulating = nodes.reduce((acc, n) => acc + (n.circulatingSupply ?? 0), 0);
    const workers = nodes.reduce((acc, n) => acc + (n.workersCount ?? 0), 0);
    const investors = nodes.reduce((acc, n) => acc + (n.investorsCount ?? 0), 0);

    const paused = nodes.filter((n) => n.tradeRules?.tradingPaused).length;

    return { count, totalSupply, circulating, workers, investors, paused };
  }, [nodes]);

  return (
    <div className="w-full space-y-4">
        
      {/* States */}
      {nodes === null && (
        <div className="rounded-2xl border p-6 text-center bg-background border-primary/35 text-text">
          <div className="animate-pulse text-sm opacity-80">Loading nodes...</div>
        </div>
      )}

      {nodes === "error" && (
        <div className="rounded-2xl border p-6 bg-danger/10 border-danger/30 text-text">
          <div className="font-semibold">Failed to fetch nodes</div>
          <div className="text-sm opacity-80 mt-1">Check console logs and API response.</div>
        </div>
      )}

      {Array.isArray(nodes) && nodes.length === 0 && (
        <div className="rounded-2xl border p-6 text-center bg-background border-primary/35 text-text">
          <div className="text-sm opacity-80">No nodes found.</div>
        </div>
      )}

      {/* Table */}
      {Array.isArray(nodes) && nodes.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-background border-primary/35 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full text-sm">
              <thead className="bg-primary/12 text-text text-center">
                <tr className="h-12">
                  <th className="px-3">#</th>
                  <th className="px-3 text-left">Node</th>
                  <th className="px-3">Type</th>
                  <th className="px-3">Base</th>
                  <th className="px-3">Current</th>
                  <th className="px-3">Min</th>
                  <th className="px-3">Max</th>
                  <th className="px-3">Supply</th>
                  <th className="px-3">Circulating</th>
                  <th className="px-3">Workers</th>
                  <th className="px-3">Investors</th>
                  <th className="px-3">Paused</th>
                  <th className="px-3">Buy Fee%</th>
                  <th className="px-3">Sell Fee%</th>
                </tr>
              </thead>

              <tbody className="text-text">
                {nodes.map((n, idx) => (
                  <tr
                    key={n._id?.$oid ?? idx}
                    className="border-t border-primary/25 hover:bg-primary/8 transition-colors"
                  >
                    <td className="px-3 py-3 opacity-80 text-center">{idx + 1}</td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        {n.icon ? (
                          <img
                            src={n.icon}
                            alt={n.name}
                            className="h-8 w-8 rounded-xl border border-primary/20 object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-xl border border-primary/20 flex items-center justify-center text-xs opacity-70">
                            {n.symbol?.slice(0, 2)?.toUpperCase() ?? "--"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="font-semibold truncate">{n.name}</div>
                          <div className="text-xs opacity-70 truncate">{n.symbol}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold bg-primary/10 border-primary/25">
                        {String(n.type ?? "-").toUpperCase()}
                      </span>
                    </td>

                    <td className="px-3 py-3 text-center">{fmtMoney(n.basePrice)}</td>
                    <td className="px-3 py-3 text-center font-semibold">{fmtMoney(n.currentPrice)}</td>
                    <td className="px-3 py-3 text-center">{fmtMoney(n.minPrice)}</td>
                    <td className="px-3 py-3 text-center">{fmtMoney(n.maxPrice)}</td>

                    <td className="px-3 py-3 text-center">{(n.totalSupply ?? 0).toLocaleString()}</td>
                    <td className="px-3 py-3 text-center">{(n.circulatingSupply ?? 0).toLocaleString()}</td>

                    <td className="px-3 py-3 text-center">{(n.workersCount ?? 0).toLocaleString()}</td>
                    <td className="px-3 py-3 text-center">{(n.investorsCount ?? 0).toLocaleString()}</td>

                    <td className="px-3 py-3 text-center">
                      {boolPill(!!n.tradeRules?.tradingPaused, "PAUSED", "LIVE")}
                    </td>

                    <td className="px-3 py-3 text-center">
                      {(n.tradeRules?.feePercentBuy ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>

                    <td className="px-3 py-3 text-center">
                      {(n.tradeRules?.feePercentCell ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 text-xs opacity-70 border-t border-primary/25">
            Tip: prices are Decimal128 → formatted via <code>fmtMoney</code>.
          </div>
        </div>
      )}
    </div>
  );
}
