import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import styled from "styled-components";
import { AdminNavbar } from "~/components/admin";
import { TypeForm } from "~/components/types";
import { withAdminSession } from "~/session";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const getServerSideProps = withAdminSession();

export default function NewType() {
  const router = useRouter();

  async function handleSubmit(data) {
    await $fetch("/api/types", {
      method: "POST",
      body: data,
    });

    router.push("/admin/types");
  }

  return (
    <>
      <AdminNavbar />
      <Title>Add a Type</Title>
      <TypeForm onSubmit={handleSubmit} />
    </>
  );
}
