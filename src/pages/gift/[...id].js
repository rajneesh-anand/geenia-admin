import Layout from "@components/layout";
import axios from "axios";
import GiftDetail from "@components/gift/gift-detail";
import Seo from "@components/common/seo";

export default function GiftDetailPage({ gift }) {
  return (
    <>
      <Seo title="gift" description="Admin Dashboard" canonical="/" />
      <GiftDetail data={gift} />
    </>
  );
}

GiftDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/coin/redeem/${id[0]}/${id[1]}`
  );

  return {
    props: { gift: data.data },
  };
};
