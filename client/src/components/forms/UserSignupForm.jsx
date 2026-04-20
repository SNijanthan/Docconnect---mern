import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { userRegister } from "../../api/authApi";
import { showError, showSuccess } from "../../utils/toast";

const UserSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFormInputs = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRegister(formData);
      setError("");
      showSuccess("Welcome 👋");
      setFormData({});
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.message);
      showError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-50 glass-header border-b border-border/60 shadow-sm">
        <Link to="/" className="flex items-center gap-2.5">
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
          <div className="bg-card rounded-2xl border border-border shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-blue-500" />

            <div className="px-6 sm:px-8 pt-8 pb-8">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center shadow-sm">
                  <User size={22} className="text-sky-500" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
                Create account
              </h1>
              <p className="text-center text-sm text-muted-foreground mt-1.5 mb-7">
                Join DocConnect and access quality healthcare
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </Label>
                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      required
                      className="pl-9 h-11 rounded-xl border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                      onChange={handleFormInputs}
                    />
                  </div>
                </div>

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
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="pl-9 h-11 rounded-xl border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                      onChange={handleFormInputs}
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
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-9 pr-11 h-11 rounded-xl border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                      onChange={handleFormInputs}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label="Toggle password"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    defaultValue=""
                    required
                    className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 transition-colors cursor-pointer"
                    onChange={handleFormInputs}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2.5">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl font-semibold btn-sky text-white border-0 shadow-md shadow-sky-500/20 mt-1"
                >
                  Create account
                </Button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-medium underline-offset-4 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignupForm;
