import Layout from "@components/layout";
import axios from "axios";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const EditProductForm = dynamic(() =>
  import("@components/product/edit-product")
);

export default function ItemEditPage({ product }) {
  return (
    <>
      <Seo
        title="Product Edit"
        description="Product Edit"
        canonical="/product/edit"
      />
      <EditProductForm data={product} />
    </>
  );
}

ItemEditPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/product/edit/${id}`
  );

  return {
    props: { product: data.data },
  };
};
