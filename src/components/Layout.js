import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import { useState } from "react";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      {children}
    </>
  );
}
