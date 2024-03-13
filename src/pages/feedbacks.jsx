import Layout from "@components/layout";
import axios from "axios";
import FeedbackList from "@components/feedback/feedback-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function FeedbackListPage({ feedBackList }) {
  return (
    <>
      <Seo
        title="Feedback"
        description="Admin Dashboard"
        canonical="feedback"
      />
      <FeedbackList data={feedBackList} />
    </>
  );
}

FeedbackListPage.Layout = Layout;

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
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/feedback/list?limit=50&page=${pageNumber}`
    );

    return {
      props: { feedBackList: data.data },
    };
  }
};
