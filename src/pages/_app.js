import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/components/Navbar/Navbar";
import Sidebar from "~/components/Navbar/Sidebar";
import "~/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SessionProvider session={session}>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
