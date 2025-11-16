"use client";

import { useSidebar } from "@/context/SidebarContext";
import {
  LayoutDashboard,
  Route,
  Map,
  Package,
  Users,
  Trophy,
  UserRound,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Routes", href: "/routes", icon: Route },
  { name: "Plan Route", href: "/plan-route", icon: Map },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Customers", href: "/customers", icon: UserRound },
  { name: "Activity Log", href: "/activity-log", icon: Activity },
];

const bottomMenu = [
  { name: "Profile", href: "/profile", icon: UserRound },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen 
        bg-ns-surface dark:bg-ns-surface-dark
        border-r border-ns-border dark:border-ns-border-dark
        shadow-sm 
        flex flex-col justify-between 
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Toggle Button - centered vertically */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute right-[-12px] top-1/2 -translate-y-1/2 
          h-8 w-8 flex items-center justify-center 
          rounded-full border bg-ns-primary dark:bg-ns-primary-dark 
          text-white shadow
        "
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* TOP SECTION */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-center mb-4">
          {collapsed ? (
            <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
          ) : (
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={50}
              priority
            />
          )}
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                  transition-all relative
                  ${
                    active
                      ? "bg-ns-primary dark:bg-ns-primary-dark text-white"
                      : "text-ns-text-muted dark:text-ns-text-muted-dark hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <Icon size={20} />

                {!collapsed && item.name}

                {active && !collapsed && (
                  <div className="relative flex items-center">
                    <span
                      className="
                          w-2 h-2 
                          rounded-full absolute 
                          animate-liveTail
                          bg-ns-live-light dark:bg-ns-live-dark
                          shadow-[0_0_6px_rgba(52,211,153,0.8)] 
                          dark:shadow-[0_0_6px_rgba(22,163,74,0.9)]
                        "
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="px-4 py-6 border-t border-ns-border dark:border-ns-border-dark space-y-2">
        {bottomMenu.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                ${
                  active
                    ? "bg-ns-bg text-ns-text dark:bg-ns-border-dark dark:text-ns-text-dark"
                    : "text-ns-text-muted dark:text-ns-text-muted-dark hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon size={20} />
              {!collapsed && item.name}
            </Link>
          );
        })}

        <button
          className={`
            flex items-center gap-3 w-full px-3 py-2 text-sm 
            text-ns-danger rounded-lg 
            hover:bg-ns-danger-soft dark:hover:bg-ns-danger-soft-dark
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
