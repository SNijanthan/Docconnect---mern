import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border/50 shadow-sm">
        <Link to="/home" className="flex items-center gap-2">
          <img src="/logo.png" alt="doc-connect" className="w-8 h-8" />
          <h1 className="text-lg sm:text-xl font-semibold">DocConnect</h1>
        </Link>
        <div className="flex items-center gap-8">
          {role === "user" && (
            <Button
              variant="default"
              size="lg"
              className="hover:scale-105 hover:cursor-pointer py-4 px-10"
            >
              Consult now
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default Header;
