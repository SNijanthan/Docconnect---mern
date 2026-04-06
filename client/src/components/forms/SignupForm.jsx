import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Link to="/">
        <div className="flex items-center gap-2 px-4 sm:px-6 py-4">
          <img src="/logo.png" alt="doc-connect" className="w-8 h-8" />

          <h1 className="text-lg sm:text-xl font-semibold">DocConnect</h1>
        </div>
      </Link>

      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl p-5 sm:p-6 lg:p-10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl text-center">
              Welcome
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base lg:text-lg mt-1">
              Please fill your details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter name here"
                    required
                    className="py-5"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="py-5"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center text-sm">
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10 py-5"
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Select gender</Label>
                  <select
                    name="gender"
                    id="gender"
                    className="pr-10 py-5"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose here
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3 pt-4">
            <Button className="w-full bg-green-600 hover:bg-green-700 py-5">
              Signup
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
