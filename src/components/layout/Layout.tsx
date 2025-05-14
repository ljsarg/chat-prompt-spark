
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 py-6 px-4 md:px-8">
          <Outlet />
        </main>
        {isMobile && <MobileNav />}
      </div>
    </div>
  );
};

export default Layout;
