import styles from "~/components/Layout.module.css";
import { useSession } from "next-auth/react";

export default function Dispositions() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className={styles.section}>
        <div>
          <h1>Dispositions</h1>
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
