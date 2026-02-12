"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserApis } from "@/apis/users";
import type { GetUserInfoPayload } from "@/types/infoUser";       

type MenuItem = { id: string; label: string; href: string };

const ITEMS: MenuItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "nodes", label: "Nodes", href: "/nodes" },
  { id: "orders", label: "Orders", href: "/orders" },
  { id: "employee", label: "Employee", href: "/employee" },
  { id: "settings", label: "Settings", href: "/settings" },
];

function formatDecimal(v?: { $numberDecimal: string }) {
  const raw = v?.$numberDecimal;
  if (!raw) return "--";
  const n = Number(raw);
  if (!Number.isFinite(n)) return raw;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function SidebarMenuSimple() {
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href);
  };

  const u = userInfo?.user;
  const e = userInfo?.employee;

  const name = u?.name || u?.username || "Player";
  const role = u?.roles || e?.roleInNode || "Member";
  const level = u?.level ?? "--";
  const xp = u?.xpScore ?? "--";
  const usd = u?.usdBalance ? formatDecimal(u.usdBalance) : "--";

  return (
    <aside className="h-screen w-[280px] shrink-0 border-r border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/60 backdrop-blur flex flex-col">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-primary/25 bg-primary/10 flex items-center justify-center font-extrabold">
            WN
          </div>
          <div className="min-w-0">
            <div className="font-bold leading-5 truncate">World of Nodes</div>
            <div className="text-xs opacity-70 truncate">Control Center</div>
          </div>
        </div>
      </div>

      {/* User mini */}
      <div className="px-5 pb-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-primary/25 bg-primary/10 flex items-center justify-center text-sm font-semibold">
              {name.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">
                {err ? "User unavailable" : userInfo ? name : "Loading..."}
              </div>
              <div className="text-xs opacity-70 truncate">
                {err ? "Please re-login" : String(role)}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-2 text-center">
              <div className="text-[10px] opacity-70">Level</div>
              <div className="font-bold text-sm">{level}</div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-2 text-center">
              <div className="text-[10px] opacity-70">XP</div>
              <div className="font-bold text-sm">{xp}</div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-2 text-center">
              <div className="text-[10px] opacity-70">USD</div>
              <div className="font-bold text-sm">{usd}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-black/10 dark:bg-white/10" />

      {/* Menu */}
      <nav className="px-3 py-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {ITEMS.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.id}
                href={it.href}
                className={[
                  "block rounded-2xl px-3 py-3 text-sm transition border",
                  active
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow"
                    : "bg-transparent hover:bg-zinc-900/5 dark:hover:bg-white/10 border-transparent",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
