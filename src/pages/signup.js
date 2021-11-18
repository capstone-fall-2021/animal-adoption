import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import { useState } from "react";
import RegistrationForm from "~/components/RegistrationForm";
import ErrorList from "~/components/ErrorList";

export default function Signup() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  async function handleSubmit(body) {
    try {
      await $fetch("/api/register", {
        method: "POST",
        body,
      });

      router.push("/api/auth/signin");
    } catch (e) {
      setErrors(e.data.errors);
    }
  }

  return (
    <>
      <ErrorList errors={errors}></ErrorList>
      <RegistrationForm onSubmit={handleSubmit} />
    </>
  );
}
