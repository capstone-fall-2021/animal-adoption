import Layout from "~/components/layout";
import styles from "~/components/layout.module.css";

export default function Account() {
  return (
    <>
      <Layout Home></Layout>
      <div className={styles.section}>
        <div>Account</div>
      </div>
    </>
  );
}
