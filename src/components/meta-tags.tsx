import Head from "next/head";
import React from "react";

const MetaTags = (props: any) => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <title>{`PRODUCTS - ${props.title}`}</title>
      <meta name="title" content={`PRODUCTS - ${props.title}`} />
      <meta name="description" content="Welcome to products" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={`PRODUCTS - ${props.title}`} />
      <meta property="og:description" content="Welcome to products" />

      <meta property="og:image" content="" />
      <meta property="og:type" content="website" />

      <meta property="og:url" content={process.env.NEXT_PUBLIC_HOMEPAGE_URL} />
      <meta name="twitter:card" content="PRODUCTS" />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Products" />

      <meta property="og:site_name" content="PRODUCTS" />
      <meta name="twitter:image:alt" content="PRODUCTS" />
    </Head>
  );
};

export default MetaTags;
