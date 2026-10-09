import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate({
      to: "/admin/login",
    });
  }

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/admin/",
    },
    {
      label: "Courses",
      icon: BookOpen,
      to: "/admin/courses",
    },
    {
      label: "Students",
      icon: Users,
      to: "/admin/students",
    },
    {
      label: "Payments",
      icon: CreditCard,
      to: "/admin/payments",
    },
    // {
    //   label: "Orders",
    //   icon: ShoppingCart,
    //   to: "/admin/orders",
    // },
    {
  label: "Settings",
  icon: Settings,
  to: "/admin/settings",
},
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
        <div>
          <h1 className="text-lg font-black">WONDER LAMPE</h1>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border p-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-background transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b px-6">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              WONDER LAMPE
            </h1>
            <p className="text-xs font-medium text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{
                  exact: item.to === "/admin/",
                }}
                activeProps={{
                  className:
                    "flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground",
                }}
                inactiveProps={{
                  className:
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">
        <div className="p-4 pt-20 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}