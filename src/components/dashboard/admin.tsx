import Layout from "@components/layout";
// import ProductList from "@components/product/product-list";
// import ErrorMessage from "@components/ui/error-message";
// import Loader from "@components/ui/loader/loader";
// import { SortOrder } from "src/types/generated";
import { useState } from "react";
// import { useProductsQuery } from "@data/product/products.query";

export default function DashboardPage() {
  // const [page, setPage] = useState(1);
  // const [orderBy, setOrder] = useState("created_at");
  // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useProductsQuery({
  //   limit: 20,
  //   page,
  //   orderBy,
  //   sortedBy,
  // });

  // if (loading) return <Loader text="loading" />;
  // if (error) return <ErrorMessage message={error.message} />;

  // function handlePagination(current: any) {
  //   setPage(current);
  // }
  return (
    <>
      {/* <ProductList
        products={data?.products}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      /> */}
      <h1>Dashboard</h1>
    </>
  );
}
DashboardPage.Layout = Layout;
