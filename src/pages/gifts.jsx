import Layout from "@components/layout";
import axios from "axios";
import GiftList from "@components/gift/gift-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function GiftPage({ giftList }) {
  return (
    <>
      <Seo title="Gifts" description="Admin Dashboard" canonical="gifts" />
      <GiftList data={giftList} />
    </>
  );
}

GiftPage.Layout = Layout;

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
    const { page } = ctx.query;
    const pageNumber = page ? page : 1;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/coin/redeem-list?limit=50&page=${pageNumber}`
    );

    return {
      props: { giftList: data.data },
    };
  }
};
