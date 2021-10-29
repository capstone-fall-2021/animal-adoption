import Layout from "~/components/layout";
import styles from "~/components/layout.module.css";

export default function Home() {
  return (
    <div className={styles.section}>
      <div>Animals</div>
      <hr />
      <div>News</div>
    </div>
  );
}
