import Footer from "@components/layout/footer";
import Header from "@components/layout/header";
import Sidebar from "@components/layout/sidebar";
import React from "react";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <div className="flex flex-col">
      <Header />
      <div className=" flex overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="px-4 py-2 w-full  mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
