import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormInputData = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAuth(formData);
      dispatch(
        login({
          user: data.user,
          role: data.role,
        }),
      );
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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="doc-connect-logo" className="w-8 h-8" />
          <h1 className="text-lg sm:text-xl font-semibold">DocConnect</h1>
        </Link>

        <ModeToggle />
      </div>

      {/* LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl p-5 sm:p-6 lg:p-10 shadow-xl bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-center">
              Login to your account
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base lg:text-lg mt-1">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
                {/* EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    onChange={handleFormInputData}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="py-5"
                  />
                </div>

                {/* PASSWORD */}
                <div className="grid gap-2">
                  <div className="flex items-center text-sm">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto hover:underline">
                      Forgot?
                    </a>
                  </div>

                  <div className="relative">
                    <Input
                      onChange={handleFormInputData}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10 py-5"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-center mt-2">{error}</p>
              )}
              <div className="flex-col gap-3 pt-4">
                <Button
                  className="w-full py-5 hover:cursor-pointer font-semibold"
                  type="submit"
                >
                  Login
                </Button>
              </div>
              <div className="flex flex-col items-center mt-4 gap-2">
                <p className="text-sm text-center mb-2">
                  New here?{" "}
                  <Link to="/signup" className="underline">
                    Sign Up
                  </Link>
                </p>

                <p className="text-sm text-center">
                  Are you a doctor?{" "}
                  <Link to="/doctor/signup" className="underline">
                    Join our platform
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
