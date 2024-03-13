import Layout from "@components/layout";
import axios from "axios";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const EditBlogForm = dynamic(() => import("@components/blog/edit-blog"));

export default function BlogEditPage({ blog }) {
  console.log(blog);
  return (
    <>
      <Seo title="Blog Edit" description="Blog Edit" canonical="/blog/edit" />
      <EditBlogForm blog={blog} />
    </>
  );
}

BlogEditPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/blog/edit/${id}`
  );
  console.log(data);
  return {
    props: { blog: data.data },
  };
};
