import Layout from "~/components/layout";
import styles from "~/components/layout.module.css";

export default function About() {
  return (
    <>
      <Layout Home></Layout>
      <div className={styles.section}>
        <div>
          <h1>About</h1>
        </div>
      </div>
    </>
  );
}
