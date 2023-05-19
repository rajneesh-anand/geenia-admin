import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layout";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "src/types/generated";

import { useOrdersQuery } from "@data/orders/orders.query";

const OrderList = dynamic(() => import("@components/orders/order-list"));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("orderDate");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    limit: 25,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <OrderList
        orders={data?.orders}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

OrdersPage.Layout = AppLayout;
