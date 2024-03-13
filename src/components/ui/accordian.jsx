import cn from "classnames";
import { Disclosure, Transition } from "@headlessui/react";
import ArrowDown from "@components/icons/arrow-down";

export const Accordion = ({ item, variant = "gray" }) => {
  const { title, content } = item;
  return (
    <div className="w-full">
      <div className="shadow-category bg-skin-fill group mx-auto mb-4 w-full rounded">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="text-skin-base flex w-full justify-between px-5 py-4 text-start text-base font-medium focus:outline-none 2xl:px-6 2xl:py-6">
                <span
                  className={cn(
                    "text-heading pe-2 text-sm font-medium leading-relaxed",
                    {
                      "md:text-base": variant === "gray",
                      "md:text-base lg:text-lg": variant === "transparent",
                    }
                  )}
                >
                  {title}
                </span>
                <ArrowDown
                  className={`text-skin-base -mr-2 flex-shrink-0 text-xl text-opacity-60 group-hover:text-opacity-100 lg:-mr-1.5 lg:text-2xl ${
                    open ? "rotate-180 transform" : ""
                  }`}
                />
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <Disclosure.Panel static>
                    <div className="2xl:text-15px text-skin-base -mt-1  px-5  pb-4 text-sm leading-7 opacity-70 2xl:mt-0  2xl:px-6 2xl:pb-7">
                      {content}
                    </div>
                  </Disclosure.Panel>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
