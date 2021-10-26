import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./layout.module.css";

const websiteName = "Animal Adoption Dating App";

export default function Layout({ children, home }) {
  return (
    <div>
      <header>
        <div className={styles.section}>
          <Link href="/">
            <a>
              <div className={styles.float_left}>Logo</div>
            </a>
          </Link>
          <div className={styles.float_left}>
            <Link href="/">
              <a>
                <h1>{websiteName}</h1>
              </a>
            </Link>
          </div>
          <div className={styles.float_right}>
            <Link href="account">
              <a>Account</a>
            </Link>{" "}
            | Login | Logout
          </div>
        </div>
        <hr className={styles.section} />
        <div>Menu</div>
        <hr />
      </header>
      <main>{children}</main>
    </div>
  );
}
