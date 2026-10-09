import { useEffect, useState } from "react";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://wonder-lampe-deploy.onrender.com";
  
type Course = {
  _id: string;
  courseName: string;
  subName: string;
  duration: string;
  price: number;
  status: boolean;
};

type FormData = {
  courseName: string;
  subName: string;
  duration: string;
  price: string;
  status: boolean;
};

const emptyForm: FormData = {
  courseName: "",
  subName: "",
  duration: "",
  price: "",
  status: true,
};

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const authHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // =========================
  // GET COURSES
  // =========================
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/courses`);
      const data = await response.json();

      if (data.success) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Fetch courses error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // =========================
  // OPEN ADD FORM
  // =========================
  const handleAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // =========================
  // OPEN EDIT FORM
  // =========================
  const handleEdit = (course: Course) => {
    setEditingId(course._id);

    setForm({
      courseName: course.courseName,
      subName: course.subName || "",
      duration: course.duration || "",
      price: String(course.price),
      status: course.status,
    });

    setShowForm(true);
  };

  // =========================
  // SAVE COURSE
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.courseName.trim()) {
      alert("Please enter course name");
      return;
    }

    if (!form.price || Number(form.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        courseName: form.courseName.trim(),
        subName: form.subName.trim(),
        duration: form.duration.trim(),
        price: Number(form.price),
        status: form.status,
      };

      const url = editingId
        ? `${API_URL}/api/courses/${editingId}`
        : `${API_URL}/api/courses`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save course");
      }

      alert(
        editingId
          ? "Course updated successfully"
          : "Course added successfully"
      );

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await fetchCourses();
    } catch (error) {
      console.error("Save course error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE COURSE
  // =========================
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/courses/${id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete course");
      }

      alert("Course deleted successfully");

      await fetchCourses();
    } catch (error) {
      console.error("Delete course error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // TOGGLE STATUS
  // =========================
  const handleToggleStatus = async (course: Course) => {
    try {
      const response = await fetch(
        `${API_URL}/api/courses/${course._id}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            courseName: course.courseName,
            subName: course.subName,
            duration: course.duration,
            price: course.price,
            status: !course.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      await fetchCourses();
    } catch (error) {
      console.error("Status update error:", error);
      alert("Unable to update status");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Courses
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your academy courses
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          + Add Course
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Course" : "Add New Course"}
            </h2>

            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ✕ Close
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            {/* COURSE NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Course Name *
              </label>

              <input
                type="text"
                value={form.courseName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    courseName: e.target.value,
                  })
                }
                placeholder="Example: STOCK MARKET PRO"
                className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2"
              />
            </div>

            {/* SUB NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sub Name
              </label>

              <input
                type="text"
                value={form.subName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subName: e.target.value,
                  })
                }
                placeholder="Example: Stock Market Training"
                className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2"
              />
            </div>

            {/* DURATION */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Duration
              </label>

              <input
                type="text"
                value={form.duration}
                onChange={(e) =>
                  setForm({
                    ...form,
                    duration: e.target.value,
                  })
                }
                placeholder="Example: 5 Days"
                className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Price *
              </label>

              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                placeholder="Example: 4999"
                className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2"
              />
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-3 md:col-span-2">
              <input
                id="course-status"
                type="checkbox"
                checked={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.checked,
                  })
                }
                className="h-4 w-4"
              />

              <label
                htmlFor="course-status"
                className="text-sm font-medium"
              >
                Active Course
              </label>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Course"
                    : "Add Course"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-lg border px-6 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* COURSES TABLE */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">
                  Course Name
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Sub Name
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Duration
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Price
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-muted-foreground"
                  >
                    {loading
                      ? "Loading courses..."
                      : "No courses found"}
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {course.courseName}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {course.subName || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {course.duration || "-"}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      ₹{course.price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          handleToggleStatus(course)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.status
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleEdit(course)
                          }
                          className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(course._id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default CoursesPage;