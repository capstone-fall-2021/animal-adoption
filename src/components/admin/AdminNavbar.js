import Link from "next/link";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar() {
  return (
    <div className={styles.background}>
      <Link href="/admin/dispositions">
        <a className={styles.link}>Dispositions</a>
      </Link>
      <Link href="/admin/types">
        <a className={styles.link}>Types</a>
      </Link>
    </div>
  );
}
