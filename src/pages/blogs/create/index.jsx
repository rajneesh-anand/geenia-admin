import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const AddBlogForm = dynamic(() => import("@components/blog/create-blog"));

export default function BlogCreatePage() {
  return (
    <>
      <Seo
        title="Create Blog"
        description="Create Blog"
        canonical="blogs/create"
      />
      <AddBlogForm />
    </>
  );
}

BlogCreatePage.Layout = Layout;

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
