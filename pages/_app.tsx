import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebaseConfig/init'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import FrontPage from '../components/layout/frontpage'
import "../style/App.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <ChakraProvider>
    <FirebaseProvider>
      <Layout>
        {/* {getLayout(<Component {...pageProps} />) }  */}
        <Component {...pageProps} />
      </Layout>
    </FirebaseProvider>
    
  </ChakraProvider>
  
}
export default MyApp
