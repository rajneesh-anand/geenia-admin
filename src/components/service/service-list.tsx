import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { ServicePaginator } from "src/types/generated";
import Link from "@components/ui/link";
import { EditIcon } from "@components/icons/edit copy";

export type IProps = {
  services?: ServicePaginator;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ServiceList = ({ services, onPagination }: IProps) => {
  const { data, paginatorInfo } = services! ?? {};

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Image
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Service Name
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Description
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Service Fee
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Discounted Fee
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>

                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Image
                          src={
                            item?.image ??
                            (siteSettings.product.placeholder as any)
                          }
                          alt={item.name}
                          layout="fixed"
                          width={42}
                          height={42}
                          className="rounded overflow-hidden"
                        />
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.price}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {item.discountedPrice}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div
                            className={`${
                              item.status === "Active"
                                ? "text-green-600"
                                : "text-amber-700"
                            } text-sm font-medium leading-5 `}
                          >
                            {item.status}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <Link
                          href={`/service/edit/${item.id}`}
                          className="text-base transition duration-200 hover:text-heading"
                          title="Edit"
                        >
                          <EditIcon width={16} />
                        </Link>
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
        <div className="flex justify-end items-center">
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
  );
};

export default ServiceList;
