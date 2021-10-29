import { useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import Sidebar from "~/components/Navbar/Sidebar";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
