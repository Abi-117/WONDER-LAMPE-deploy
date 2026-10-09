import { createFileRoute } from "@tanstack/react-router";
import Courses from "@/pages/admin/Courses";

export const Route = createFileRoute("/admin/courses")({
  component: Courses,
});