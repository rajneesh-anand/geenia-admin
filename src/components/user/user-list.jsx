import dayjs from "dayjs";
import React, { useState } from "react";
import { useModalAction } from "@components/modal/modal.context";
import NotificationButton from "@components/ui/icon-button/notification-button";

function maskMobileNumber(number) {
  return (
    "+7" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}
const UserList = ({ data }) => {
  const { openModal } = useModalAction();

  function handleMessageForm(mobile) {
    openModal("MESSAGE_VIEW", mobile);
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden align-middle">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-blue-600 uppercase ">
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                      Photo
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left  ">
                      Name
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left  ">
                      Mobile
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left  ">
                      Email
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left  ">
                      Date
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                      Status
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {data.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              <img
                                className="rounded-md"
                                src={
                                  item.image ?? "/images/placeholder/avatar.svg"
                                }
                                width="64"
                                height="64"
                                alt={item.name}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {maskMobileNumber(item.mobile)}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.email}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap ">
                          {item.createdAt && (
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {dayjs(item.createdAt).format("DD/MM/YYYY")}
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <div
                              className={
                                item.userStatus === "Active"
                                  ? "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-green-700 text-white"
                                  : "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-rose-700 text-white"
                              }
                            >
                              {item.userStatus}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-no-wrap ">
                          <div className="flex items-center">
                            <NotificationButton
                              onClick={() => handleMessageForm(item.mobile)}
                              color="#000000"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="bg-rose-700 font-semibold  py-2 px-8 text-white">
            No Users
          </p>
        </div>
      )}
    </>
  );
};

export default UserList;
