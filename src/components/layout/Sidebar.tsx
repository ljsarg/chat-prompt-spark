
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookText,
  Edit,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import Logo from "../ui/Logo";

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

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border flex flex-col h-screen sticky top-0 bg-white">
      <div className="h-14 border-b flex items-center px-4">
        <Logo />
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-promptpal-purple text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-promptpal-purple flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
