import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./layout.module.css";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import { useState } from "react";

const websiteName = "Animal Adoption Dating App";

export default function Layout({ children, home }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
}
