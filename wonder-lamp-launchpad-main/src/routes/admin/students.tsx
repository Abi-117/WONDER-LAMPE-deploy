import { createFileRoute } from "@tanstack/react-router";
import Students from "@/pages/admin/Students";

export const Route = createFileRoute("/admin/students")({
  component: Students,
});