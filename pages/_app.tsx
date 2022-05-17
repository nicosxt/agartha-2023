import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebaseConfig/init'
import { ChakraProvider } from '@chakra-ui/react'

// import '../style/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return  <>  <ChakraProvider>
  <FirebaseProvider>
    <Layout> 
    <Component {...pageProps} />
    </Layout>
  </FirebaseProvider>
  </ChakraProvider>
  </>
}
export default MyApp
