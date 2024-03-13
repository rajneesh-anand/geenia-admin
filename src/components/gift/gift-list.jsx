import Link from "next/link";
import dayjs from "dayjs";
import EditIcon from "@components/icons/edit-icon";

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
      {data.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden align-middle ">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 uppercase text-blue-600 ">
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Mobile
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Code
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Created Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Received Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  {data.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="whitespace-no-wrap px-3 py-4 ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap px-3 py-4 ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {maskMobileNumber(item.mobile)}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap px-3 py-4 ">
                          <div className="flex items-center">
                            <div className="text-md font-bold uppercase leading-5 text-indigo-900">
                              {item.redeemCode}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap px-3 py-4 ">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {dayjs(item.createdAt).format("DD/MM/YYYY")}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-no-wrap px-3 py-4">
                          <div className="flex items-center">
                            <div
                              className={
                                item.redeemStatus === "Created"
                                  ? "rounded-full bg-green-700 px-4 py-0.5 text-sm font-semibold leading-5 text-white"
                                  : "rounded-full bg-rose-700 px-4 py-0.5 text-sm font-semibold leading-5 text-white"
                              }
                            >
                              {item.redeemStatus}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-no-wrap px-3 py-4">
                          {item.receivedAt && (
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {dayjs(item.receivedAt).format("DD/MM/YYYY")}
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="whitespace-no-wrap px-3 py-4 ">
                          <div className="flex items-center">
                            <Link
                              href={`/gift/${item.redeemCode}/${item.mobile}`}
                            >
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
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="bg-rose-700 px-8  py-2 font-semibold text-white">
            No Gifts
          </p>
        </div>
      )}
    </>
  );
};

export default GiftList;
