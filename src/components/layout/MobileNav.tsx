
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookText,
  Edit,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Templates",
    icon: BookText,
    href: "/templates",
  },
  {
    label: "Editor",
    icon: Edit,
    href: "/editor",
  },
  {
    label: "Community",
    icon: MessageSquare,
    href: "/community",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 py-2 px-4",
                isActive ? "text-promptpal-purple" : "text-gray-500"
              )
            }
          >
            <item.icon size={20} />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
