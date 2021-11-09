import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import { useState } from "react";
import RegistrationForm from "~/components/RegistrationForm";

export default function Signup() {
  const router = useRouter();
  const [submissionErrors, setSubmissionErrors] = useState({});

  async function handleSubmit(body) {
    try {
      await $fetch("/api/register", {
        method: "POST",
        body,
      });

      router.push("/api/auth/signin");
    } catch (e) {
      let errors = {};

      for (const [k, v] of Object.entries(e.data.errors)) {
        errors[k] = { message: v };
      }

      setSubmissionErrors(errors);
    }
  }

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      submissionErrors={submissionErrors}
    />
  );
}
