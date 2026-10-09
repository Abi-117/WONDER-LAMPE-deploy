import { useEffect, useState } from "react";
import { Search, Eye, X } from "lucide-react";

const API_URL =  process.env.API_URL || "http://localhost:5000" || "https://wonder-lampe-deploy.onrender.com" ;

type Order = {
  _id: string;
  studentId?: {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
  };
  courseId?: {
    _id: string;
    courseName: string;
  };
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: "created" | "paid" | "failed";
  createdAt: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/payment/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    return (
      order.studentId?.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      order.studentId?.email
        ?.toLowerCase()
        .includes(searchText) ||
      order.courseId?.courseName
        ?.toLowerCase()
        .includes(searchText) ||
      order.razorpayOrderId
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">
          Orders
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage course orders and purchase records
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border bg-card p-4">
        <div className="relative max-w-md">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, course or order ID..."
            className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <p className="font-semibold text-muted-foreground">
            Loading orders...
          </p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <h2 className="text-xl font-bold">
            No Orders Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Course orders will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-bold">
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-6 py-5">
                      <span className="font-mono text-xs">
                        {order.razorpayOrderId}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold">
                        {order.studentId?.fullName || "-"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {order.studentId?.email || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {order.courseId?.courseName || "-"}
                    </td>

                    <td className="px-6 py-5 font-bold">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="rounded-lg border p-2 hover:bg-muted"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Order Details
                </h2>

                <p className="text-sm text-muted-foreground">
                  Complete purchase information
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Detail
                label="Student"
                value={
                  selectedOrder.studentId?.fullName || "-"
                }
              />

              <Detail
                label="Email"
                value={
                  selectedOrder.studentId?.email || "-"
                }
              />

              <Detail
                label="Mobile"
                value={
                  selectedOrder.studentId?.mobile || "-"
                }
              />

              <Detail
                label="Course"
                value={
                  selectedOrder.courseId?.courseName || "-"
                }
              />

              <Detail
                label="Amount"
                value={`₹${selectedOrder.amount.toLocaleString(
                  "en-IN"
                )}`}
              />

              <Detail
                label="Razorpay Order ID"
                value={selectedOrder.razorpayOrderId}
              />

              <Detail
                label="Razorpay Payment ID"
                value={
                  selectedOrder.razorpayPaymentId || "-"
                }
              />

              <Detail
                label="Status"
                value={selectedOrder.status.toUpperCase()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>

      <span className="max-w-[65%] break-all text-right text-sm font-bold">
        {value}
      </span>
    </div>
  );
}