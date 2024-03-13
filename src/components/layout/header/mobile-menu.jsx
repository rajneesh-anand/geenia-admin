import React, { useState } from "react";
import Link from "@components/ui/link";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import CloseIcon from "@components/icons/close-icon";
import { useSession, signOut } from "next-auth/react";
import { sidebarNavItems } from "@data/constant";

export default function MobileMenu() {
  const { closeSidebar } = useUI();
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="bg-yellow/50 border-yellow relative flex w-full shrink-0 items-center justify-between border-b py-0.5 ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7">
          <div role="button" onClick={closeSidebar} className="inline-flex">
            <Logo />
          </div>

          <button
            className="flex items-center justify-center px-4 py-5 text-2xl transition-opacity hover:opacity-60 focus:outline-none md:px-5 lg:py-8"
            onClick={closeSidebar}
            aria-label="close"
          >
            <CloseIcon className="mt-0.5" color="#000000" />
          </button>
        </div>
        {session && (
          <div className="border-b border-gray-200 py-4">
            <div className="text-center">
              <img
                className="mx-auto rounded-md"
                src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
                width={128}
                height={128}
                alt={session?.user?.name}
              />
              <p className="mt-1 text-[18px] font-medium uppercase ">
                {session?.user?.name}
              </p>
              <button
                type="button"
                className="bg-orange my-2 rounded-sm px-[12px] py-[4px] text-[14px] text-white "
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8 pt-4">
          <ul className="mx-3">
            {sidebarNavItems.map((item, idx) => (
              <li
                key={idx}
                className={`mb-1 last:mb-0   ${
                  pathname === `${item.href}`
                    ? "bg-slate-700 text-white"
                    : "text-rose-700"
                }`}
                onClick={closeSidebar}
              >
                <Link href={item.href} className="flex px-3 py-2 font-medium">
                  {item.icon}
                  <span className="ml-2 block font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
