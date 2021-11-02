import Layout from "~/components/layout";
import styles from "~/components/layout.module.css";

export default function News() {
  return (
    <>
      <Layout Home></Layout>
      <div className={styles.section}>
        <div>News</div>
      </div>
    </>
  );
}
