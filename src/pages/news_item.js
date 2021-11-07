import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";

export default function News_Items() {
  const { data: status } = useSession();

  if (status === "authenicated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>News Items</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.section}>
        <div>
          <h1>Not Authorized</h1>
        </div>
      </div>
    );
  }
}
