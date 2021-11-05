import React, { useState } from "react";
import ProfileForm from "~/components/add_profile_form";
import styles from "~/components/Layout.module.css";

export default function Account() {
  return (
    <div className={styles.section}>
      <div>
        <h1>Account</h1>
      </div>
      <a href="/profiles/create" passhref>
        Add Profile Form
      </a>
    </div>
  );
}
