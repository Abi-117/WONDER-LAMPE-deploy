import { useEffect, useState } from "react";
import { Search, Eye, X } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://wonder-lampe-deploy.onrender.com";
  
type Student = {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  city?: string;
  whatsappNumber?: string;
  experienceLevel?: string;
  paymentStatus: "pending" | "paid" | "failed";
  courseId?: {
    courseName: string;
  } | null;
  createdAt: string;
};

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error("Students fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.fullName.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.mobile.includes(searchText)
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
          Students
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage registered Wonder Lampe students
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
            placeholder="Search name, email or mobile..."
            className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <p className="font-semibold text-muted-foreground">
            Loading students...
          </p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center">
          <h2 className="text-xl font-bold">
            No Students Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No registered students are available.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Mobile
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Experience
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-bold">
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-6 py-5">
                      <p className="font-bold">
                        {student.fullName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {student.mobile}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {student.courseId?.courseName || "-"}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {student.experienceLevel || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : student.paymentStatus === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.paymentStatus.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {formatDate(student.createdAt)}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() =>
                          setSelectedStudent(student)
                        }
                        className="rounded-lg border p-2 transition hover:bg-muted"
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

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Student Details
                </h2>

                <p className="text-sm text-muted-foreground">
                  Complete student information
                </p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-2 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Detail
                label="Full Name"
                value={selectedStudent.fullName}
              />

              <Detail
                label="Email"
                value={selectedStudent.email}
              />

              <Detail
                label="Mobile"
                value={selectedStudent.mobile}
              />

              <Detail
                label="WhatsApp"
                value={selectedStudent.whatsappNumber || "-"}
              />

              <Detail
                label="City"
                value={selectedStudent.city || "-"}
              />

              <Detail
                label="Experience"
                value={selectedStudent.experienceLevel || "-"}
              />

              <Detail
                label="Course"
                value={
                  selectedStudent.courseId?.courseName || "-"
                }
              />

              <Detail
                label="Payment Status"
                value={selectedStudent.paymentStatus}
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

      <span className="text-right text-sm font-bold">
        {value}
      </span>
    </div>
  );
}