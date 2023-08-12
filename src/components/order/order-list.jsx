import Pagination from "@components/ui/pagination";
import Link from "@components/ui/link";
import dayjs from "dayjs";

const OrderList = ({ orders, onPagination }) => {
  const { data, paginatorInfo } = orders ?? {};

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle">
            {data.length > 0 && (
              <>
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Order Number
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Order Date
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Name
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Order Amount
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Status
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                        Action
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
                                {item.orderNumber}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {dayjs(item.orderDate).format("DD/MM/YYYY")}
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
                                {item.email}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item.totalAmount}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div
                                className={
                                  item.orderStatus === "Pending"
                                    ? "text-sm font-medium leading-5 text-red-600"
                                    : "text-sm font-medium leading-5 text-green-600"
                                }
                              >
                                {item.orderStatus}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                            {item.orderStatus != "Pending" && (
                              <div className="flex items-center">
                                <Link
                                  href={`/order/${item.orderNumber}`}
                                  className="px-8 py-1.5 bg-yellow text-white hover:bg-orange"
                                >
                                  View Order
                                </Link>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}

            {!!paginatorInfo.total && (
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

export default OrderList;
