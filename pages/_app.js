import '@/css/tailwind.css'
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import client from 'config/client'
import { ApolloProvider } from '@apollo/client'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
