"use client";

import { UserApis } from "@/apis/users";
import type { GetUserInfoPayload, MongoDecimal } from "@/types/infoUser";
import { useEffect, useState } from "react";

// Formatting Helper
function dec(v?: MongoDecimal | { $numberDecimal: string } | string | number) {
  if (typeof v === "object" && v !== null && "$numberDecimal" in v) {
    const n = Number(v.$numberDecimal);
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  const n = Number(v);
  if (isNaN(n)) return v?.toString() ?? "--";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function iso(v?: string | null) {
  if (!v) return "--";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString();
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs opacity-50 uppercase tracking-tight">{label}</div>
      <div className="mt-1 text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
      <div className="text-sm opacity-50">{k}</div>
      <div className="text-sm font-semibold text-right text-white break-all">{v}</div>
    </div>
  );
}

export default function EmployeeManagement() {
  const [data, setData] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const api = new UserApis();
        const res = await api.getUserInfo();
        if (res?.data?.data) setData(res.data.data);
      } catch {
        console.error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  if (loading || !data) return <div className="p-10 opacity-50 text-white text-sm">Loading...</div>;

  const { user, employee, wallet, nodeEmployee } = data;

  // محاسبه سود (تفاوت قیمت فعلی و پایه)
  const profit = Number(nodeEmployee.currentPrice?.$numberDecimal) - Number(nodeEmployee.basePrice?.$numberDecimal);

  return (
    <div className="p-6 space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-2xl font-extrabold tracking-tight">Employee Dashboard</div>
          <div className="text-sm opacity-50 uppercase tracking-widest text-[10px] mt-1">Node: {nodeEmployee.symbol}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="text-[10px] opacity-50 uppercase font-bold">Wallet Balance</div>
          <div className="font-mono text-xl font-bold text-white">${dec(wallet.usBalance)}</div>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <StatCard label="Account Level" value={user.level} />
        <StatCard label="Total Trades" value={employee.countTrades} />
        <StatCard label="Referrals" value={employee.countReferrals} />
        <StatCard label="Total Earned" value={`$${dec(employee.earnedTotal)}`} />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Section 1: User Info */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="font-bold mb-4 opacity-80">Profile & Wallet</div>
          <div className="space-y-1">
            <Row k="Username" v={user.username} />
            <Row k="Email" v={user.email} />
            <Row k="Blocked" v={`$${dec(wallet.blocked)}`} />
            <Row k="Ref Code" v={user.referralCode} />
          </div>
        </section>

        {/* Section 2: Salary Rules */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="font-bold mb-4 opacity-80">Salary Rules</div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-xs opacity-50">Base Salary</div>
              <div className="font-bold text-lg text-white">${dec(nodeEmployee.salaryRules.base)}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <div className="text-xs opacity-50 text-center">Per Trade</div>
                <div className="font-bold text-white text-center">${dec(nodeEmployee.salaryRules.perTrade)}</div>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <div className="text-xs opacity-50 text-center">Per Ref</div>
                <div className="font-bold text-white text-center">${dec(nodeEmployee.salaryRules.perReferral)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Node Overview (MINIMAL) */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="font-bold mb-4 opacity-80 font-mono">Node Workplace</div>
          <div className="space-y-4">
            {/* Minimal Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                {nodeEmployee.icon ? (
                  <img src={nodeEmployee.icon} alt={nodeEmployee.symbol} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-black text-sm">{nodeEmployee.symbol.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <div className="font-bold text-lg">{nodeEmployee.name}</div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest">{nodeEmployee.symbol}</div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
                <Row k="Current Price" v={`$${dec(nodeEmployee.currentPrice)}`} />
                <Row k="Node Profit" v={`$${dec(profit)}`} />
            </div>
          </div>
        </section>
      </div>

      {/* Footer / Meta Info (CLEAN) */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-[10px] opacity-40 uppercase font-bold mb-1">Employee ID</div>
            <div className="text-xs font-mono opacity-80 truncate">{employee._id}</div>
          </div>
          <div>
            <div className="text-[10px] opacity-40 uppercase font-bold mb-1">Joined At</div>
            <div className="text-xs font-mono opacity-80">{iso(employee.joinedAt)}</div>
          </div>
          <div>
            <div className="text-[10px] opacity-40 uppercase font-bold mb-1">Updated At</div>
            <div className="text-xs font-mono opacity-80">{iso(employee.updatedAt)}</div>
          </div>
          <div>
            <div className="text-[10px] opacity-40 uppercase font-bold mb-1">System Status</div>
            <div className="text-xs font-mono opacity-80">{employee.active ? "ACTIVE" : "INACTIVE"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}