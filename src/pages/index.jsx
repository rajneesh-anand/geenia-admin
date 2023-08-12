import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loaders/spinner/spinner";
import { useUsersQuery } from "@framework/user-query";
import React, { useState } from "react";

const UserList = dynamic(() => import("@components/user/user-list"));

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useUsersQuery({
    limit: 25,
    page,
    ...query,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handlePagination(current) {
    setPage(current);
  }

  return (
    <>
      <UserList users={data.users} onPagination={handlePagination} />
    </>
  );
}

HomePage.Layout = Layout;

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
