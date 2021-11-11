import React, { useState } from "react";
import Link from "next/link";
import styles from "~/components/Layout.module.css";

export default function Account() {
  return (
    <div className={styles.section}>
      <center>
        <h1>Account</h1>
      </center>
      <center>
        <Link href="/profiles/create" passhref>
          Add Profile
        </Link>
        <br />
        <Link href="/dispositions/create" passhref>
          Add Disposition
        </Link>
        <br />
        <Link href="/types/create" passhref>
          Add Type
        </Link>
        <br />
        <Link href="/breeds/create" passhref>
          Add Breed
        </Link>
      </center>
    </div>
  );
}
