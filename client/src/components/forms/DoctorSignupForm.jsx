import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { doctorRegister } from "../../api/authApi";
import { showError, showSuccess } from "../../utils/toast";

const SectionTitle = ({ step, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-7 h-7 rounded-lg bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-sky-500/30 shrink-0">
      {step}
    </div>
    <h3 className="font-semibold text-base text-foreground">{title}</h3>
  </div>
);

const FieldGroup = ({ children }) => (
  <div className="grid gap-3">{children}</div>
);

const StyledInput = ({ id, ...props }) => (
  <Input
    id={id}
    className="h-11 rounded-xl border-border focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
    {...props}
  />
);

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
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            DocConnect
          </span>
        </Link>
        <ModeToggle />
      </header>

      {/* Form */}
      <div className="flex flex-1 justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Header card */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-900/30 mb-4 shadow-sm">
              <span className="text-2xl">🩺</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Join Our Healthcare Network
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Complete your profile to start consulting patients
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-blue-500" />

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Basic Info */}
                <div>
                  <SectionTitle step="1" title="Basic Information" />
                  <FieldGroup>
                    <StyledInput
                      id="name"
                      placeholder="Full Name"
                      onChange={handleFormInputs}
                    />
                    <StyledInput
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      onChange={handleFormInputs}
                    />
                    <div className="relative">
                      <StyledInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleFormInputs}
                        className="h-11 rounded-xl border-border pr-11 focus:border-sky-400 focus:ring-sky-400/20 transition-colors"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        Gender
                      </Label>
                      <select
                        id="gender"
                        className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 transition-colors cursor-pointer"
                        defaultValue=""
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
                  </FieldGroup>
                </div>

                <div className="border-t border-border/60" />

                {/* Section 2: Contact */}
                <div>
                  <SectionTitle step="2" title="Contact Details" />
                  <FieldGroup>
                    <StyledInput
                      id="phone"
                      placeholder="Phone Number"
                      onChange={handleFormInputs}
                    />
                    <StyledInput
                      id="imageUrl"
                      type="url"
                      placeholder="Profile Image URL"
                      onChange={handleFormInputs}
                    />
                    {formData.imageUrl && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                        <img
                          src={formData.imageUrl}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                          alt="Preview"
                        />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            Image preview
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Looks good! ✓
                          </p>
                        </div>
                      </div>
                    )}
                  </FieldGroup>
                </div>

                <div className="border-t border-border/60" />

                {/* Section 3: Address */}
                <div>
                  <SectionTitle step="3" title="Clinic Address" />
                  <FieldGroup>
                    <StyledInput
                      id="firstLine"
                      placeholder="Address Line 1"
                      onChange={handleFormInputs}
                    />
                    <StyledInput
                      id="secondLine"
                      placeholder="Address Line 2 (optional)"
                      onChange={handleFormInputs}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <StyledInput
                        id="city"
                        placeholder="City"
                        onChange={handleFormInputs}
                      />
                      <StyledInput
                        id="state"
                        placeholder="State"
                        onChange={handleFormInputs}
                      />
                    </div>
                    <StyledInput
                      id="country"
                      placeholder="Country"
                      onChange={handleFormInputs}
                    />
                  </FieldGroup>
                </div>

                <div className="border-t border-border/60" />

                {/* Section 4: Professional */}
                <div>
                  <SectionTitle step="4" title="Professional Details" />
                  <FieldGroup>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="specialty"
                        className="text-sm font-medium"
                      >
                        Specialty
                      </Label>
                      <select
                        id="specialty"
                        className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 transition-colors cursor-pointer"
                        defaultValue=""
                        onChange={handleFormInputs}
                      >
                        <option value="" disabled>
                          Choose your specialty
                        </option>
                        <option value="general-physician">
                          General Physician
                        </option>
                        <option value="dermatology">Dermatology</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="gastroenterology">
                          Gastroenterology
                        </option>
                        <option value="cardiology">Cardiology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="neurology">Neurology</option>
                        <option value="gynecology">Gynecology</option>
                        <option value="ent">ENT</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="credentials"
                        className="text-sm font-medium"
                      >
                        Credentials
                      </Label>
                      <StyledInput
                        id="credentials"
                        placeholder="e.g. MBBS, MD, MS (comma-separated)"
                        onChange={handleFormInputs}
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate multiple credentials with commas
                      </p>
                    </div>
                  </FieldGroup>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl px-3 py-2.5">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl font-semibold btn-sky text-white border-0 shadow-md shadow-sky-500/20"
                  >
                    Create Doctor Account
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="text-sky-500 hover:text-sky-600 font-medium underline-offset-4 hover:underline transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignupForm;
