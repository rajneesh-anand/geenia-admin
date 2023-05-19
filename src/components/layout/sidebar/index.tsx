import React, { useState, useEffect, useRef } from "react";
import Link from "@components/ui/link";
import { useRouter } from "next/router";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (text: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const router = useRouter();
  const pathname = router.pathname;

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = (ev: Event) => {
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
    let bodyElement: Element | null = document.querySelector("body");
    if (sidebarExpanded) {
      bodyElement?.classList.add("sidebar-expanded");
    } else {
      bodyElement?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-60 lg:w-20 lg:sidebar-expanded:!w-60 2xl:!w-60 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
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

          <Link href="/" className="lg:hidden lg:sidebar-expanded:block">
            <img src="/images/logo.jpg" width="120" height="28" alt="logo" />
          </Link>
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

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
              >
                <Link
                  href="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === "/" && "!text-indigo-500"
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname === "/" && "text-indigo-600"
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === "/" && "text-indigo-200"
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname === "/" && "text-indigo-300"
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("orders") && "bg-gray-900"
                }`}
              >
                <Link
                  href="/orders"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("orders") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("orders") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("orders") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes("orders") && "text-indigo-300"
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Orders
                    </span>
                  </div>
                </Link>
              </li>
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("services") && "bg-gray-900"
                }`}
              >
                <Link
                  href="/service"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("service") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("service") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("service") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span
                      className={` ${
                        pathname.includes("service") && "text-indigo-300"
                      } text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200`}
                    >
                      Services
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
