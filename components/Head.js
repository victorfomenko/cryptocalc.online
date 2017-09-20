import React from 'react';
import Head from 'next/head';

export default ({head}) => {

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/static/favicon.ico?v=3" />
      <title>{'Crypto calculator'}</title>
      <meta name="author" content="Victor Fomenko"/>
      <meta name="keywords" content="Крипто калькулятор"/>
      <meta name="description" content="Крипто калькулятор"/>
    </Head>
  );
}
