import dynamic from "next/dynamic";
import useSticky from "@utils/use-sticky";
import React, { useState } from "react";
import { useUI } from "@contexts/ui.context";
import Container from "@components/ui/container";
import Logo from "@components/ui/logo";
import { Drawer } from "@components/common/drawer/drawer";
import Dropdown from "@components/common/dropdown";
import IconMenu from "@components/icons/menu";
import IconLogout from "@components/icons/logout";
import Link from "next/link";
import IconSearch from "@components/icons/search";
import IconXCircle from "@components/icons/x-circle";
import { useSession, signOut } from "next-auth/react";

const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const Header = () => {
  const { data: session, status } = useSession();
  const { toggleSidebar } = useUI();

  return (
    // <>
    //   <header
    //     className={`${
    //       sticky
    //         ? "header-sticky"
    //         : "relative py-[8px] border-b border-orange bg-[#f8f6f0]"
    //     }`}
    //   >
    //     <Container className="flex items-center">
    //       <Logo />

    //       <AuthMenu />
    //       <button
    //         onClick={handleMobileMenu}
    //         className="btn-orange lg:hidden block ml-auto"
    //       >
    //         <i className="icon_menu"></i>
    //       </button>
    //     </Container>
    //   </header>

    //   <Drawer
    //     placement="left"
    //     open={displaySidebar}
    //     onClose={closeSidebar}
    //     handler={false}
    //     showMask={true}
    //     level={null}
    //     contentWrapperStyle={contentWrapperCSS}
    //   >
    //     <MobileMenu />
    //   </Drawer>
    // </>

    <header className="sticky top-0 z-20">
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-slate-600 p-2 hover:bg-slate-600/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
              onClick={() => toggleSidebar()}
            >
              <IconMenu className="h-5 w-5" color="#fc0" />
            </button>
            <Link
              href="/"
              className="main-logo flex shrink-0 items-center ltr:ml-4 rtl:mr-2"
            >
              <img
                className="inline w-24 ltr:-ml-1 rtl:-mr-1"
                src="/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <div className="hidden sm:block ltr:mr-2 rtl:ml-2">
            {/* <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
              <li>
                <Link
                  href="/apps/calendar"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconCalendar />
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/todolist"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconEdit />
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/chat"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <IconChatNotification />
                </Link>
              </li>
            </ul> */}
          </div>
          <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <div className="sm:ml-auto">
              <div className="dropdown flex shrink-0">
                <Dropdown
                  offset={[0, 8]}
                  placement="bottom-end"
                  btnClassName="relative group block"
                  button={
                    <img
                      className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                      src="/images/placeholder/avatar.svg"
                      alt="userProfile"
                    />
                  }
                >
                  <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                    {session && (
                      <li>
                        <div className="flex items-center px-4 py-4">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src="/images/placeholder/avatar.svg"
                            alt="userProfile"
                          />
                          <div className="truncate ltr:pl-4 rtl:pr-4">
                            <h4 className="text-base">
                              {session?.user?.name}
                              <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                                Admin
                              </span>
                            </h4>
                            <button
                              type="button"
                              className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                            >
                              {session?.user?.email}
                            </button>
                          </div>
                        </div>
                      </li>
                    )}
                    <li className="border-t border-white-light dark:border-white-light/10">
                      <button
                        type="button"
                        className="!py-3 text-danger"
                        onClick={() => signOut()}
                      >
                        <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
