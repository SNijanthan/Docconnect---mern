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
import { doctorRegister } from "../../api/authApi";
import { showError, showSuccess } from "../../utils/toast";

const DoctorSignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFormInputs = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        address: {
          firstLine: formData.firstLine,
          secondLine: formData.secondLine,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
        specialties: formData.specialty ? [formData.specialty] : [],
        credentials: formData.credentials?.split(","),
      };

      await doctorRegister(payload);

      setError("");
      showSuccess("Account created successfully 🎉 Redirecting...");
      setFormData({});
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.message);
      showError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="w-8 h-8" />
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">
            DocConnect
          </h1>
        </Link>
        <ModeToggle />
      </div>

      {/* FORM */}
      <div className="flex flex-1 justify-center px-4 py-6">
        <Card className="w-full max-w-2xl p-4 sm:p-6 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-center">
              Join Our Healthcare Network
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">
              Fill in your details to start as a doctor
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC INFO */}
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Basic Information
                </h3>

                <div className="grid gap-4">
                  <Input
                    id="name"
                    placeholder="Full Name"
                    onChange={handleFormInputs}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleFormInputs}
                  />

                  {/* Password */}
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleFormInputs}
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

                  {/* Gender */}
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Select gender</Label>
                    <select
                      id="gender"
                      className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
                      defaultValue=""
                      onChange={handleFormInputs}
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
              </div>

              <div className="border-t" />

              {/* CONTACT */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Contact Details</h3>

                <div className="grid gap-4">
                  <Input
                    id="phone"
                    placeholder="Phone Number"
                    onChange={handleFormInputs}
                  />
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="Profile Image URL"
                    onChange={handleFormInputs}
                  />

                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="border-t" />

              {/* ADDRESS */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Address</h3>

                <div className="grid gap-4">
                  <Input
                    id="firstLine"
                    placeholder="Address Line 1"
                    onChange={handleFormInputs}
                  />
                  <Input
                    id="secondLine"
                    placeholder="Address Line 2"
                    onChange={handleFormInputs}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="city"
                      placeholder="City"
                      onChange={handleFormInputs}
                    />
                    <Input
                      id="state"
                      placeholder="State"
                      onChange={handleFormInputs}
                    />
                  </div>

                  <Input
                    id="country"
                    placeholder="Country"
                    onChange={handleFormInputs}
                  />
                </div>
              </div>

              <div className="border-t" />

              {/* PROFESSIONAL */}
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Professional Details
                </h3>

                <div className="grid gap-4">
                  <select
                    id="specialty"
                    className="w-full p-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
                    defaultValue=""
                    onChange={handleFormInputs}
                  >
                    <option value="" disabled>
                      Choose Specialty
                    </option>
                    <option value="general-physician">General Physician</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="gastroenterology">Gastroenterology</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="neurology">Neurology</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="ent">ENT</option>
                  </select>

                  <Input
                    id="credentials"
                    placeholder="e.g. MBBS, MD"
                    onChange={handleFormInputs}
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full py-3 sm:py-5 font-semibold"
              >
                Create Doctor Account
              </Button>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/" className="underline">
                  Login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSignupForm;
