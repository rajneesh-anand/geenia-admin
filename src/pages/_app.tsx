import "@assets/css/main.css";
import "@assets/css/custom.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "react-query";

import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/seo/default-seo";

type ExtendedAppProps<P = {}> = {
  dehydratedState?: DehydratedState;
} & AppProps<P>;

type Props = {
  children?: React.ReactNode;
};

const Noop: React.FC<Props> = ({ children }) => <>{children}</>;

const CustomApp = ({
  Component,
  pageProps,
  dehydratedState,
}: ExtendedAppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <>
            <DefaultSeo />

            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
            </Layout>

            <ToastContainer />
          </>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
