import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

const Header = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50 shadow-sm">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <img src="/logo.png" alt="doc-connect" className="w-8 h-8" />
        <h1 className="text-base sm:text-lg md:text-xl font-semibold">
          DocConnect
        </h1>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {role === "user" && (
          <Button
            className="
    inline-flex items-center gap-1.5

    px-3 py-1.5
    sm:px-4 sm:py-2

    text-xs sm:text-sm font-medium

    bg-sky-500 hover:bg-sky-600
    dark:bg-sky-600 dark:hover:bg-sky-500

    rounded-lg
    shadow-none hover:shadow-sm

    transition-all duration-200

    whitespace-nowrap
  "
          >
            {/* Icon */}
            <Stethoscope className="w-4 h-4" />

            {/* Text (hidden on mobile) */}
            <span className="hidden sm:inline">Consult Now</span>
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
