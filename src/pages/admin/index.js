import styles from "~/components/layout.module.css";

export default function Index() {
  return (
    <div className={styles.section}>
      <div>
        <h1>Admin</h1>
        <div className={styles.admin_nav_background}>
          <a className={styles.admin_nav_links} href="admin/dispositions">
            Disposition
          </a>
          <a className={styles.admin_nav_links} href="admin/types">
            Type
          </a>
        </div>
      </div>
    </div>
  );
}
