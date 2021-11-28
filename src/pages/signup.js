import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import { useState } from "react";
import { RegistrationForm } from "~/components/users";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(body) {
    setError("");

    try {
      await $fetch("/api/register", {
        method: "POST",
        body,
      });

      router.push("/api/auth/signin");
    } catch (e) {
      setError(e.data);
    }
  }

  return <RegistrationForm onSubmit={handleSubmit} error={error} />;
}
