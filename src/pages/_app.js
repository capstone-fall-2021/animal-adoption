/* eslint-disable react/prop-types */
import { Provider as SessionProvider } from "next-auth/client";
import { $fetch } from "ohmyfetch";
import { SWRConfig } from "swr";
import Layout from "~/components/Layout";
import "~/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher: $fetch }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
