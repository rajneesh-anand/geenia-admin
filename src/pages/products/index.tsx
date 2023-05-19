import Card from "@components/common/card";
import Layout from "@components/layout";
import Search from "@components/common/search";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "src/types/generated";
import { useState } from "react";
import { useProductsQuery } from "@data/product/products.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SortForm from "@components/common/sort-form";
import CategoryTypeFilter from "@components/product/category-type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("enrollmentDate");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsQuery({
    limit: 5,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <ProductList
        products={data?.products}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
ProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
