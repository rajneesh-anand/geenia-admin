import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const ProductList = dynamic(() => import("@components/product/product-list"), {
  ssr: false,
});

export default function ProductListPage() {
  return (
    <>
      <Seo title="Products" description="Products List" canonical="/products" />
      <ProductList />
    </>
  );
}

ProductListPage.Layout = Layout;

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
