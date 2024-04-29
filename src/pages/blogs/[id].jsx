import React, { useState } from "react";
import Layout from "@components/layout";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import { BlogProvider } from "@contexts/blog.context";
import { BlogView } from "@components/blog/blog-view";

// const BlogView = dynamic(() => import("@components/blog/blog-view"), {
//   ssr: false,
// });

export default function BlogViewPage() {
  return (
    <>
      <Seo title="Blog" description="Blog View" canonical="blogs" />
      <BlogProvider>
        <BlogView />
      </BlogProvider>
    </>
  );
}

BlogViewPage.Layout = Layout;

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
