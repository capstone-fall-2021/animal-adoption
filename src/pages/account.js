import React from "react";
import Link from "next/link";
import styles from "~/components/Layout.module.css";

export default function Account() {
  return (
    <div className={styles.section}>
      <center>
        <h1>Account</h1>
      </center>
      <center>
        <Link href="/admin/types" passhref>
          Add Type, Breed, or Profile
        </Link>
        <br />
        <Link href="/admin/dispositions" passhref>
          Add Disposition
        </Link>
        <br />
        <Link href="/profiles/delete" passhref>
          Delete a Profile
        </Link>
      </center>
    </div>
  );
}
