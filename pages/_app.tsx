import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement, ReactNode, useState } from "react";
import type { NextPage } from "next";
import "../style/App.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const [darkMode, setDarkMode] = useState(router.pathname === '/');
  return (
    <ChakraProvider>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Component {...pageProps} setDarkMode={setDarkMode} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
