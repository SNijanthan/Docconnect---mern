import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="doc-connect" className="w-8 h-8" />
          <h1 className="text-lg sm:text-xl font-semibold">DocConnect</h1>
        </Link>

        <ModeToggle />
      </div>
    </>
  );
};

export default Header;
