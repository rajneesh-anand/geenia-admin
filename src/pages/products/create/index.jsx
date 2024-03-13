import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const AddProductForm = dynamic(() =>
  import("@components/product/create-product")
);

export default function ItemCreatePage() {
  return (
    <>
      <Seo
        title="Add Product"
        description="Add Product"
        canonical="/products/create"
      />
      <AddProductForm />
    </>
  );
}

ItemCreatePage.Layout = Layout;

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
