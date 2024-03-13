// import React, { useState, useEffect, useRef } from "react";
// import Link from "@components/ui/link";
// import { useRouter } from "next/router";
// import { sidebarNavItems } from "@data/constant";

// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const { pathname } = useRouter();
//   const trigger = useRef(null);
//   const sidebar = useRef(null);
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);

//   useEffect(() => {
//     const clickHandler = (ev) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (
//         !sidebarOpen ||
//         sidebar.current?.contains(ev.target) ||
//         trigger.current.contains(ev.target)
//       )
//         return;
//       setSidebarOpen(false);
//     };
//     document?.addEventListener("click", clickHandler);
//     return () => document?.removeEventListener("click", clickHandler);
//   });

//   useEffect(() => {
//     let bodyElement = document.querySelector("body");
//     if (sidebarExpanded) {
//       bodyElement?.classList.add("sidebar-expanded");
//     } else {
//       bodyElement?.classList.remove("sidebar-expanded");
//     }
//   }, [sidebarExpanded]);

//   return (
//     <div
//       id="sidebar"
//       ref={sidebar}
//       className={`hidden lg:flex lg:flex-col absolute  bg-slate-900 z-40 lg:left-0 lg:top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-60 lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-60 shrink-0 p-4 transition-all duration-200 ease-in-out ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-60"
//       }`}
//     >
//       <div className="flex sidebar-expanded:justify-between justify-center items-center pb-4 ">
//         <button
//           ref={trigger}
//           className="lg:hidden text-gray-500 hover:text-gray-400"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           aria-controls="sidebar"
//           aria-expanded={sidebarOpen}
//         >
//           <span className="sr-only">Close sidebar</span>
//           <svg
//             className="w-6 h-6 fill-current"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
//           </svg>
//         </button>

//         <div className="hidden lg:inline-flex 2xl:hidden justify-end mt-0">
//           <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
//             <span className="sr-only">Expand / collapse sidebar</span>
//             <svg
//               className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 className="text-gray-400"
//                 d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="space-y-8  pt-4">
//         <div>
//           <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
//             <span
//               className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
//               aria-hidden="true"
//             >
//               •••
//             </span>
//           </h3>
//           <ul>
//             {sidebarNavItems.map((item, idx) => (
//               <li
//                 key={idx}
//                 className={`px-3 py-2 mb-1 last:mb-0 hover:bg-slate-700  ${
//                   pathname === `${item.href}` && "bg-slate-700"
//                 }`}
//               >
//                 <Link href={item.href}>
//                   <div className="lg:sidebar-expanded:flex">
//                     {item.icon}
//                     <span className="text-white font-medium hidden lg:sidebar-expanded:block 2xl:opacity-100 duration-200 sidebar-expanded:ml-2  ">
//                       {item.title}
//                     </span>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import PerfectScrollbar from "react-perfect-scrollbar";
import AnimateHeight from "react-animate-height";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CaretsDown from "@components/icons/carets-down";
import MenuDashboard from "@components/icons/menu-dashboard";
import CaretDown from "@components/icons/caret-down";
import { useUI } from "@contexts/ui.context";
import { sidebarNavItems } from "@data/constant";

const Sidebar = () => {
  const { pathname } = useRouter();
  const [currentMenu, setCurrentMenu] = useState("");
  const { sidebar, toggleSidebar } = useUI();
  console.log(pathname.split("/")[1]);

  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul = selector.closest("ul.sub-menu");
      if (ul) {
        let ele = ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );

    selector?.classList.add("active");
  };

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && sidebar) {
      toggleSidebar();
    }
  }, [pathname]);

  return (
    <div>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300 `}
      >
        <div className="h-full bg-[#212121]">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img
                className="ml-[5px] w-16 flex-none"
                src="/images/logo-white.svg"
                alt="logo"
              />
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-slate-400 rtl:rotate-180 "
              onClick={() => toggleSidebar()}
            >
              <CaretsDown color="#FFFFFF" className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              {sidebarNavItems.map((item, idx) =>
                item.subMenu ? (
                  <li className="menu nav-item" key={idx}>
                    <button
                      type="button"
                      className={`${
                        pathname.split("/")[1] === item.title.toLowerCase()
                          ? "active"
                          : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu(item.title)}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="text-[#ababab] dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                          {item.title}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu !== item.title
                            ? "-rotate-90 rtl:rotate-90"
                            : ""
                        }
                      >
                        <CaretDown />
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === item.title ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-50">
                        {item.subMenu.map((itm, index) => (
                          <li key={index}>
                            <Link href={itm.href}>{itm.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </AnimateHeight>
                  </li>
                ) : (
                  <li className="nav-item" key={idx}>
                    <Link href={item.href} className="group">
                      <div className="flex items-center">
                        {item.icon}
                        <span className="text-[#ababab] ltr:pl-3 rtl:pr-3 ">
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
