import {
  BookOpen,
  Users,
  CreditCard,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://wonder-lampe-deploy.onrender.com";
  
type DashboardData = {
  totalCourses: number;
  activeCourses: number;
  totalStudents: number;
  paidStudents: number;
  pendingStudents: number;
  failedStudents: number;
  totalRevenue: number;
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Total Courses",
      value: data?.totalCourses ?? 0,
      icon: BookOpen,
    },
    {
      title: "Total Students",
      value: data?.totalStudents ?? 0,
      icon: Users,
    },
    {
      title: "Paid Students",
      value: data?.paidStudents ?? 0,
      icon: CreditCard,
    },
    {
      title: "Total Revenue",
      value: `₹${(data?.totalRevenue ?? 0).toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-semibold text-muted-foreground">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome to Wonder Lampe Admin Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    {card.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Overview */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Active Courses
          </p>

          <h3 className="mt-2 text-2xl font-black">
            {data?.activeCourses ?? 0}
          </h3>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Pending Students
          </p>

          <h3 className="mt-2 text-2xl font-black">
            {data?.pendingStudents ?? 0}
          </h3>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Failed Payments
          </p>

          <h3 className="mt-2 text-2xl font-black">
            {data?.failedStudents ?? 0}
          </h3>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="mt-8 rounded-2xl border bg-card p-8">
        <h2 className="text-xl font-black">
          Wonder Lampe Academy
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage your courses, students, payments and orders
          from this admin panel.
        </p>
      </div>
    </div>
  );
}