"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

export const NavBarItem = ({ href, icon, label, isCollapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-500 ${
        isCollapsed ? "justify-center" : ""
      } ${
        isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-gray-100"
      }`}
    >
      <div className={`${isActive ? "text-primary-foreground" : "text-gray-500"}`}>{icon}</div>
      {!isCollapsed && (
        <span className={`text-sm ${isActive ? "text-primary-foreground font-bold" : ""}`}>
          {label}
        </span>
      )}
      {isCollapsed && <span className="sr-only">{label}</span>}
    </Link>
  );
};
