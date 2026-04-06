import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
