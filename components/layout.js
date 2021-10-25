import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./layout.module.css";

const websiteName = "Animal Adoption Dating App";

export default function Layout({ children, home }) {
  return (
    <div>
      <header>
        <div className={styles.top}>
          <div className={styles.logo}>Logo</div>
          <div>
            <h1>{websiteName}</h1>
          </div>
          <div className={styles.account}>Account | Login | Logout</div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
