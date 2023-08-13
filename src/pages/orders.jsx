import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loaders/spinner/spinner";
import React, { useState } from "react";
import { useOrdersQuery } from "@framework/order-query";
import Seo from "@components/common/seo";

const OrderList = dynamic(() => import("@components/order/order-list"));

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    limit: 25,
    page,
    ...query,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handlePagination(current) {
    setPage(current);
  }

  return (
    <>
      <Seo title="Orders" description="Admin Dashboard" canonical="/orders" />
      <OrderList orders={data.orders} onPagination={handlePagination} />
    </>
  );
}

OrdersPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
