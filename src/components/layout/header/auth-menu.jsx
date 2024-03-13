import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

const AuthMenu = () => {
  const { data: session, status } = useSession();
  return (
    session && (
      <Menu as="div" className="relative hidden lg:inline-flex ml-auto">
        <Menu.Button className="inline-flex justify-center items-center group">
          <img
            className="rounded-full w-8 h-8"
            src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
            alt={session?.user?.name}
          />
        </Menu.Button>

        <Transition
          className="origin-top-right z-10 absolute top-full right-0 w-[160px] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <ul>
              <li className="font-medium border-b border-gray-200 px-4 py-2">
                <p className="text-[10px] font-medium uppercase text-gray-800">
                  {session?.user?.name}
                </p>
              </li>

              <li className="px-4 pb-3 text-center">
                <button
                  type="button"
                  className="my-2 py-[4px] px-[12px] bg-orange rounded-sm text-[14px] text-white "
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </Menu>
    )
  );
};

export default AuthMenu;
