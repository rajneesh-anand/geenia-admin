import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const OrderList = dynamic(() => import("@components/order/order-list"), {
  ssr: false,
});

export default function OrderListPage() {
  return (
    <>
      <Seo title="Orders" description="Orders List" canonical="/orders" />
      <OrderList />
    </>
  );
}

OrderListPage.Layout = Layout;

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
