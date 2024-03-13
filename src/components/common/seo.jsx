import React from "react";
import Head from "next/head";

const Seo = ({ title, description, canonical, css, js, image }) => (
  <Head>
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta name="og:type" property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta
      name="og:url"
      property="og:url"
      content={`${process.env.NEXTAUTH_URL}/${canonical}`}
    />
    <meta property="og:site_name" content="tswan" />
    <meta
      property="og:image"
      itemProp="image"
      content={`${process.env.NEXTAUTH_URL}/images/openGraph/og.png`}
    />
    <meta
      property="og:image:secure_url"
      content={`${process.env.NEXTAUTH_URL}/images/openGraph/og.png`}
    />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="200" />

    <meta name="twitter:card" property="twitter:card" content="summary" />
    <meta
      name="twitter:url"
      content={`${process.env.NEXTAUTH_URL}/${canonical}`}
    />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta
      name="twitter:description"
      property="twitter:description"
      content={description}
    />
    <meta name="twitter:site" property="twitter:site" content="@tswan" />
    <meta name="twitter:creator" property="twitter:site" content="@tswan" />

    <meta
      name="twitter:image"
      property="twitter:image"
      content={`${process.env.NEXTAUTH_URL}/images/openGraph/og.png`}
    />

    {canonical && (
      <link rel="canonical" href={`${process.env.NEXTAUTH_URL}/${canonical}`} />
    )}
    {js && <script type="text/javascript" src={js}></script>}
  </Head>
);
export default Seo;
