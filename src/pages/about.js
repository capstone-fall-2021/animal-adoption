import styles from "~/components/layout.module.css";

export default function About() {
  return (
    <div className={styles.column_section}>
      <h1>About</h1>
      <p>
        This website is for people looking for animal companionship. Animal
        profiles are created in a way that is similar to how they would on a
        dating site. Different animals are better suited to different people,
        and even amongst the same species, there are personality differences
        that can be important when it comes to compatibility. This site hopes to
        provide a place where you can be informed about the personality of each
        animal before making a decision to adopt them.
      </p>
    </div>
  );
}
