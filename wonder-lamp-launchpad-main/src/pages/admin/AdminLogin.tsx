import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =  process.env.API_URL || "http://localhost:5000";

export default function AdminLogin() {
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

      // Save login token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // Save admin details
      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      // Go to admin dashboard
      navigate("/admin");

    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-border bg-card p-8 shadow-premium">

          {/* Logo / Heading */}

          <div className="text-center">

            <h1 className="text-3xl font-black">
              Wonder Lampe
            </h1>

            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Admin Panel
            </p>

          </div>


          {/* Login Form */}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="text-sm font-bold"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@wonderlampe.com"
                className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary"
                required
              />

            </div>


            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="text-sm font-bold"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="mt-2 h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary"
                required
              />

            </div>


            {/* Error */}

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm font-semibold text-destructive">
                {error}
              </div>
            )}


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-primary font-bold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "LOGIN..."
                : "LOGIN TO ADMIN"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}