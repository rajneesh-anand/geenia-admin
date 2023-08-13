import Layout from "@components/layout";
import axios from "axios";
import OrderDetail from "@components/order/order-detail";
import Seo from "@components/common/seo";

export default function OrderDetailPage({ order }) {
  return (
    <>
      <Seo title="Order" description="Admin Dashboard" canonical="/" />
      <OrderDetail data={order} />
    </>
  );
}

OrderDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/order/single-order/${id}`
  );

  return {
    props: { order: data.data },
  };
};
