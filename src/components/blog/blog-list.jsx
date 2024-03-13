import React from "react";
import Pagination from "@components/ui/pagination";
import Link from "next/link";
import dayjs from "dayjs";
import EditIcon from "@components/icons/edit-icon";

const BlogList = ({ data, onPagination }) => {
  const { blogs, paginatorInfo } = data ?? {};

  return (
    <>
      {blogs.length > 0 ? (
        <>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden align-middle ">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase text-blue-600 ">
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Photo
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Title
                      </th>
                      <th className="w-[168px] px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Description
                      </th>

                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Date
                      </th>
                      <th className="w-[148px] px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Status
                      </th>

                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {blogs.map((item, index) => {
                      return (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                <img
                                  className="rounded-md"
                                  src={
                                    item.image ??
                                    "/images/placeholder/avatar.svg"
                                  }
                                  width="64"
                                  height="64"
                                  alt={item.title}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {item.title}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {item.description}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {dayjs(item.createdAt).format("DD/MM/YYYY")}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div
                                className={
                                  item.status === "Published"
                                    ? "rounded-full bg-green-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                                    : "rounded-full bg-rose-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                                }
                              >
                                {item.status}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <Link href={`/blogs/edit/${item.id}/`}>
                                <EditIcon
                                  className="text-xl lg:text-2xl"
                                  color="#000000"
                                />
                              </Link>
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

          {!!paginatorInfo.total && (
            <div className="my-2 flex items-center  justify-center py-4">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
                showLessItems
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="bg-rose-700 px-8  py-2 font-semibold text-white">
            No Blogs
          </p>
        </div>
      )}
    </>
  );
};

export default BlogList;
