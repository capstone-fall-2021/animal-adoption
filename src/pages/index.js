import Layout from "~/components/layout";
import styles from "~/components/layout.module.css";

export default function Home() {
  return (
      <div className={styles.section}>
        <div className={styles.section}>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 1</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 2</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
          <div className={styles.news_item}>
            <div className={styles.align_center}>
              <div>animal name 3</div>
              <div className={styles.section}>Image</div>
            </div>
          </div>
        </div>
        <hr className={styles.section}/>
        <hr className={styles.section}/>
        <div className={styles.section}>
          <div className={styles.news_item}>News Item One News Item One News Item One News Item One News Item One</div>
          <div className={styles.news_item}>News Item Two News Item Two News Item Two News Item Two News Item Two</div>
          <div className={styles.news_item}>News Item Three News Item Three News Item Three News Item Three News Item Three</div>
        </div>
      </div>
  );
}
