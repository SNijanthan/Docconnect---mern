import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, LogOut, ChevronDown } from "lucide-react";

const Header = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header border-b border-border/60 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-sm shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow">
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          {role === "user" ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background/80 hover:bg-accent text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Manage
                <ChevronDown size={14} className="opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-xl shadow-lg"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => navigate("/user/appointments")}
                  className="flex items-center gap-2 rounded-lg cursor-pointer"
                >
                  <CalendarDays size={14} className="text-sky-500" />
                  My Appointments
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30"
                >
                  <LogOut size={14} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-500 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/40 text-sm font-medium transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
