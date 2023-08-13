import React, { useState, useEffect, useRef } from "react";
import Link from "@components/ui/link";
import PhoneIcon from "@assets/icons/phone";
import UserIcon from "@assets/icons/user";
import { useRouter } from "next/router";
import OrderBox from "@assets/icons/order-box";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useRouter();
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  console.log(pathname);
  useEffect(() => {
    const clickHandler = (ev) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current?.contains(ev.target) ||
        trigger.current.contains(ev.target)
      )
        return;
      setSidebarOpen(false);
    };
    document?.addEventListener("click", clickHandler);
    return () => document?.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    let bodyElement = document.querySelector("body");
    if (sidebarExpanded) {
      bodyElement?.classList.add("sidebar-expanded");
    } else {
      bodyElement?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const sidebarNavItems = [
    {
      title: "Users",
      href: "/",
      icon: <UserIcon height={24} width={24} color="#FFFFFF" />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <OrderBox height={24} width={24} color="#FFFFFF" />,
    },
    {
      title: "Push Notification",
      href: "/notification",
      icon: <PhoneIcon height={24} width={24} color="#FFFFFF" />,
    },
  ];

  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={`flex flex-col absolute bg-slate-900 z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-60 lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-60 shrink-0 p-4 transition-all duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-60"
      }`}
    >
      <div className="flex sidebar-expanded:justify-between justify-center items-center pb-4 ">
        <button
          ref={trigger}
          className="lg:hidden text-gray-500 hover:text-gray-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>

        <div className="hidden lg:inline-flex 2xl:hidden justify-end mt-0">
          <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
            <span className="sr-only">Expand / collapse sidebar</span>
            <svg
              className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                className="text-gray-400"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-8  pt-4">
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span
              className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
            >
              •••
            </span>
          </h3>
          <ul>
            {sidebarNavItems.map((item, idx) => (
              <li
                key={idx}
                className={`px-3 py-2 mb-1 last:mb-0 hover:bg-slate-700  ${
                  pathname === `${item.href}` && "bg-slate-700"
                }`}
              >
                <Link href={item.href}>
                  <div className="lg:sidebar-expanded:flex">
                    {item.icon}
                    <span className=" text-sm text-white font-medium uppercase hidden lg:sidebar-expanded:block 2xl:opacity-100 duration-200 sidebar-expanded:ml-2  ">
                      {item.title}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
