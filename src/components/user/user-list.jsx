import Pagination from "@components/ui/pagination";
import dayjs from "dayjs";

function maskMobileNumber(number) {
  return (
    "+91" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}
const UserList = ({ users, onPagination }) => {
  const { data, paginatorInfo } = users ?? {};

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle">
            {data && data.length > 0 && (
              <>
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
                        Mobile
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Date
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                  alt={item.name}
                                />
                              </div>
                            </div>
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
                                {item.mobile && maskMobileNumber(item.mobile)}
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
                            {item.createdAt && (
                              <div className="flex items-center">
                                <div className="text-sm font-medium leading-5 text-gray-900">
                                  {dayjs(item.createdAt).format("DD/MM/YYYY")}
                                </div>
                              </div>
                            )}
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div
                                className={
                                  item.userStatus === "Active"
                                    ? "text-sm font-medium leading-5 text-green-600"
                                    : "text-sm font-medium leading-5 text-red-600"
                                }
                              >
                                {item.userStatus}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}

            {paginatorInfo && !!paginatorInfo.total && (
              <div className="flex justify-end items-center  py-4 my-2">
                <Pagination
                  total={paginatorInfo.total}
                  current={paginatorInfo.currentPage}
                  pageSize={paginatorInfo.perPage}
                  onChange={onPagination}
                  showLessItems
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
