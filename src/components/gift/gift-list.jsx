import Link from "@components/ui/link";
import dayjs from "dayjs";

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
const GiftList = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Mobile
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Code
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Created Date
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Received Date
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
                            {item.name}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {maskMobileNumber(item.mobile)}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-md font-bold leading-5 text-indigo-900">
                            {item.redeemCode}
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
                          <div
                            className={
                              item.redeemStatus === "Created"
                                ? "text-sm font-medium leading-5 text-orange"
                                : "text-sm font-medium leading-5 text-green-900"
                            }
                          >
                            {item.redeemStatus}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        {item.receivedAt && (
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {dayjs(item.receivedAt).format("DD/MM/YYYY")}
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <Link
                            href={`/gift/${item.redeemCode}/${item.mobile}`}
                            className="px-8 py-1.5 bg-yellow text-white hover:bg-orange"
                          >
                            Edit
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
    </>
  );
};

export default GiftList;
