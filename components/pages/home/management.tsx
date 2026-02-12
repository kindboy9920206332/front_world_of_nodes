"use client";

import { UserApis } from "@/apis/users";
import type { GetUserInfoPayload, MongoDecimal } from "@/types/infoUser";
import { useEffect, useState } from "react";

function dec(v?: MongoDecimal) {
  const raw = v?.$numberDecimal;
  if (!raw) return "--";
  const n = Number(raw);
  if (!Number.isFinite(n)) return raw;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function iso(v?: string) {
  if (!v) return "--";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString();
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-4">
      <div className="text-xs opacity-70">{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-sm opacity-70">{k}</div>
      <div className="text-sm font-semibold text-right break-all">{v}</div>
    </div>
  );
}

export default function Management() {
  const [userInfo, setUserInfo] = useState<GetUserInfoPayload | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const api = new UserApis();
        const res = await api.getUserInfo();
        if (!mounted) return;
        setUserInfo(res?.data?.data ?? null);
      } catch {
        if (!mounted) return;
        setErr(true);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  if (err) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <div className="font-bold">Failed to load data</div>
          <div className="text-sm opacity-80">Please re-login or try again.</div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-4">
          Loading management data...
        </div>
      </div>
    );
  }

  const { user, employee, wallet } = userInfo;

  return (
    <div className="p-6 space-y-6  overflow-y-auto  ">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-extrabold">Management</div>
          <div className="text-sm opacity-70">Read-only overview (v0.1)</div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-4 py-3">
          <div className="text-xs opacity-70">Role</div>
          <div className="font-bold">{String(user.roles ?? employee.roleInNode ?? "Member")}</div>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatCard label="Level" value={user.level} />
        <StatCard label="XP Score" value={user.xpScore} />
        <StatCard label="USD Balance" value={dec(user.usdBalance)} />
      </div>

      {/* 3 Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Section 1: Profile */}
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-5">
          <div className="flex items-center justify-between">
            <div className="font-bold">Profile</div>
            <div className="text-xs opacity-60">User</div>
          </div>
          <div className="mt-4 divide-y divide-black/10 dark:divide-white/10">
            <Row k="Name" v={user.name} />
            <Row k="Username" v={user.username} />
            <Row k="Email" v={user.email} />
            <Row k="User ID" v={user._id} />
            <Row k="Onboarding" v={user.onboardingStep} />
          </div>
        </section>

        {/* Section 2: Progress */}
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-5">
          <div className="flex items-center justify-between">
            <div className="font-bold">Progress</div>
            <div className="text-xs opacity-60">Timeline</div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
              <div className="text-xs opacity-70">Last Login</div>
              <div className="font-semibold">{iso(user.lastLoginAt)}</div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
              <div className="text-xs opacity-70">Created</div>
              <div className="font-semibold">{iso(user.createdAt)}</div>
              <div className="mt-2 text-xs opacity-70">Updated</div>
              <div className="font-semibold">{iso(user.updatedAt)}</div>
            </div>
          </div>
        </section>

        {/* Section 3: Wallet + Employee */}
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] p-5">
          <div className="flex items-center justify-between">
            <div className="font-bold">Wallet & Job</div>
            <div className="text-xs opacity-60">Economy</div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
              <div className="text-xs opacity-70">Wallet Token</div>
              <div className="font-semibold break-all">{wallet.walletToken}</div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="text-[10px] opacity-70">Balance</div>
                  <div className="font-bold">{dec(wallet.usBalance)}</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="text-[10px] opacity-70">Blocked</div>
                  <div className="font-bold">{dec(wallet.blocked)}</div>
                </div>
              </div>

              <div className="mt-3 text-xs opacity-70">Wallet Created</div>
              <div className="font-semibold">{iso(String(wallet.createdAt))}</div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-4">
              <div className="text-xs opacity-70">Employee</div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="text-[10px] opacity-70">Node ID</div>
                  <div className="font-bold break-all">{employee.nodeId}</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="text-[10px] opacity-70">Active</div>
                  <div className="font-bold">{employee.active ? "Yes" : "No"}</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center">
                  <div className="text-[10px] opacity-70">Trades</div>
                  <div className="font-bold">{employee.countTrades}</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center">
                  <div className="text-[10px] opacity-70">Referrals</div>
                  <div className="font-bold">{employee.countReferrals}</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center">
                  <div className="text-[10px] opacity-70">Earned</div>
                  <div className="font-bold">{dec(employee.earnedTotal)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
