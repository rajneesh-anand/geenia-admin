import { DataTable } from "mantine-datatable";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "@framework/api-request";
import { Box, Group } from "@mantine/core";
import Link from "next/link";
import EditIcon from "@components/icons/edit-icon";
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

export default function OrderList() {
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const http = useAxiosAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [recordsData, setRecordsData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "id",
    direction: "asc",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const fetchItemData = async () => {
      const { data } = await http.get(
        `/order/list?limit=${pageSize}&page=${page}`
      );
      console.log(data);
      setTotalRecords(data.totalRecords);
      setRecordsData(data.data);
      setIsMounted(true);
    };
    fetchItemData();

    // const from = (page - 1) * pageSize;
    // const to = from + pageSize;
    // setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize]);

  //   useEffect(() => {
  //     const data = sortBy(initialRecords, sortStatus.columnAccessor);
  //     setInitialRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  //     setPage(1);
  //   }, [sortStatus]);

  const onPageChange = async (p) => {
    console.log(p);
    setPage(p);
    // const { data } = await http.get(`/item/list?limit=${pageSize}&page=${p}`);
  };

  return (
    <div className="datatables">
      {isMounted && recordsData.length > 0 ? (
        <DataTable
          noRecordsText="No results match your search query"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={recordsData}
          columns={[
            {
              accessor: "orderDate",
              title: "Order Date",
              sortable: true,
              render: ({ orderDate }) => (
                <div className="flex items-center">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {dayjs(orderDate).format("DD/MM/YYYY")}
                  </div>
                </div>
              ),
            },
            {
              accessor: "orderNumber",
              title: "Order Number",
              sortable: true,
              render: ({ orderNumber }) => (
                <div className="flex items-center gap-2">
                  <div className="font-medium">{orderNumber}</div>
                </div>
              ),
            },

            {
              accessor: "name",
              title: "Customer Name",
              sortable: true,
              render: ({ name }) => (
                <div className="flex items-center">
                  <div className="text-sm font-medium leading-5 text-gray-900 ">
                    {name}
                  </div>
                </div>
              ),
            },
            {
              accessor: "mobile",
              title: "Mobile",
              sortable: false,
              render: ({ mobile }) => (
                <div className="flex items-center">
                  <div className="text-sm font-medium leading-5 text-gray-900 ">
                    {maskMobileNumber(mobile)}
                  </div>
                </div>
              ),
            },

            {
              accessor: "totalAmount",
              title: "Order Amount",
              sortable: false,
              render: ({ totalAmount }) => (
                <div className="flex items-center">
                  <div className="text-sm font-medium leading-5 text-gray-900 ">
                    {totalAmount}
                  </div>
                </div>
              ),
            },

            {
              accessor: "orderStatus",
              title: "Order Status",
              sortable: true,
              render: ({ orderStatus }) => (
                <div className="flex items-center">
                  <div
                    className={
                      orderStatus === "Shipped"
                        ? "rounded-full bg-green-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                        : "rounded-full bg-rose-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                    }
                  >
                    {orderStatus}
                  </div>
                </div>
              ),
            },

            {
              accessor: "actions",
              title: <Box mr={6}>Action</Box>,
              textAlign: "right",
              render: (item) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <Link href={`/orders/detail/${item.orderNumber}`}>
                    <EditIcon className="text-xl lg:text-2xl" color="#000000" />
                  </Link>
                </Group>
              ),
            },
          ]}
          totalRecords={totalRecords}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => onPageChange(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
          paginationActiveBackgroundColor="#40c057"
        />
      ) : (
        <div className="flex h-48 items-center justify-center">
          <p className="bg-rose-700 px-8  py-2 font-semibold text-white">
            No Orders !
          </p>
        </div>
      )}
    </div>
  );
}
