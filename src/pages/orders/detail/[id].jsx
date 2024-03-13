import Layout from "@components/layout";
import axios from "axios";
import dynamic from "next/dynamic";
import Seo from "@components/common/seo";
import { getSession } from "next-auth/react";

const OrderDetail = dynamic(() => import("@components/order/order-detail"), {
  ssr: false,
});

export default function OrderDetailPage({ order }) {
  return (
    <>
      <Seo
        title="Order Detail"
        description="Admin Dashboard"
        canonical="/orders"
      />
      <OrderDetail data={order} />
    </>
  );
}

OrderDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { id } = ctx.params;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/order/detail/${id}`
    );

    return {
      props: { order: data.data },
    };
  }
};
