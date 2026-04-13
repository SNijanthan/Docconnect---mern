import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50 shadow-sm">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <img src="/logo.png" alt="doc-connect" className="w-8 h-8" />
        <h1 className="text-base sm:text-lg md:text-xl font-semibold">
          DocConnect
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {role === "user" && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg border">
              Manage
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 z-100" align="end">
              <DropdownMenuItem onClick={() => navigate("/my-appointments")}>
                My Appointments
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
