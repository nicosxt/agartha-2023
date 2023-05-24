import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import "../style/App.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return <ChakraProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>

}
export default MyApp
