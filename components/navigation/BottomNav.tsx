"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, TrendingUp, UtensilsCrossed } from "lucide-react";

const tabs = [
  { href: "/rutinas", label: "Rutinas", icon: Dumbbell },
  { href: "/nutricion", label: "Nutrición", icon: UtensilsCrossed },
  { href: "/progreso", label: "Progreso", icon: TrendingUp },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg-surface pb-6">
      <div className="mx-auto flex max-w-[430px] items-center justify-around px-4 pt-3">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                active ? "text-bronze" : "text-text-muted"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
