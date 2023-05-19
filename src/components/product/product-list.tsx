// import Pagination from "@components/ui/pagination";
import Image from "next/image";
// import { siteSettings } from "@settings/site.settings";
import { ProductPaginator } from "src/types/generated";
import dayjs from "dayjs";
import Select from "@components/ui/select/select";
import { useState } from "react";

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

type OptionType = {
  value: string;
  label: string;
};

const statusOptions: OptionType[] = [
  { value: "Active", label: "Active" },
  { value: "Disable", label: "Disable" },
];

const ProductList = ({ products, onPagination }: IProps) => {
  const { data, paginatorInfo } = products! ?? {};

  const handleChange = async (option: OptionType, userId: any) => {
    const statusValue = option.value;
    const UserId = userId;
    await fetch(`${process.env.API_URL}/user/status/${UserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userStatus: statusValue }),
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Photo
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Class
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Enrollment Date
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Mobile
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Email
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>

                  {/* <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Action
                  </th> */}
                </tr>
              </thead>

              <tbody className="bg-white">
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {/* <Image
                          src={
                            item?.image ??
                            (siteSettings.product.placeholder as any)
                          }
                          alt={item.name}
                          layout="fixed"
                          width={42}
                          height={42}
                          className="rounded overflow-hidden"
                        /> */}
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.class}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {dayjs(item.createdAt).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.mobile}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900 w-full">
                            <Select
                              defaultValue={{
                                value: item.status,
                                label: item.status,
                              }}
                              options={statusOptions}
                              isSearchable={false}
                              onChange={(option: any) =>
                                handleChange(option, item.id)
                              }
                              statusTextValue={item.status!}
                            />
                          </div>
                        </div>
                      </td>

                      {/* <td className="px-3 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )} */}
    </>
  );
};

export default ProductList;
