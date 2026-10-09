import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const API_URL =  process.env.API_URL || "http://localhost:5000";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Invalid email or password"
        );
        return;
      }

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      navigate({
        to: "/admin",
      });

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-premium">

        <div className="text-center">
          <h1 className="text-3xl font-black">
            Wonder Lampe
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="text-sm font-bold">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@wonderlampe.com"
              className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm font-semibold text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-primary font-bold text-primary-foreground disabled:opacity-60"
          >
            {loading
              ? "LOGIN..."
              : "LOGIN TO ADMIN"}
          </button>

        </form>

      </div>

    </div>
  );
}