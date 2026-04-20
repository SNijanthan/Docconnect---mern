import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { loginAuth } from "../../api/authApi";
import { showError } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleFormInputData = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAuth(formData);
      dispatch(login({ user: data.user, role: data.role }));
      setError("");
      setFormData({ email: "", password: "" });
      if (data.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      showError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-50 glass-header border-b border-border/60 shadow-sm">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-500/30">
            <img
              src="/logo.png"
              alt="DocConnect"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            DocConnect
          </span>
        </Link>
        <ModeToggle />
      </header>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
            {/* Card top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-blue-500" />

            <div className="px-6 sm:px-8 pt-8 pb-8">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shadow-sm">
                  <Lock size={22} className="text-sky-500" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
                Welcome back
              </h1>
              <p className="text-center text-sm text-muted-foreground mt-1.5 mb-7">
                Sign in to your DocConnect account
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <Input
                      onChange={handleFormInputData}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="pl-9 h-11 rounded-xl bg-background border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <Input
                      onChange={handleFormInputData}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-9 pr-11 h-11 rounded-xl bg-background border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label="Toggle password"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2.5">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl font-semibold btn-sky text-white border-0 shadow-md shadow-sky-500/20"
                >
                  Sign in
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Links */}
              <div className="space-y-2.5 text-center">
                <p className="text-sm text-muted-foreground">
                  New to DocConnect?{" "}
                  <Link
                    to="/signup"
                    className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    Create account
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  Are you a doctor?{" "}
                  <Link
                    to="/doctor/signup"
                    className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    Join the platform
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
