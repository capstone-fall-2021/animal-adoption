import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import styled from "styled-components";
import { AdminNavbar } from "~/components/admin";
import { DispositionForm } from "~/components/dispositions";
import { withAdminSession } from "~/session";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const getServerSideProps = withAdminSession();

export default function NewDisposition() {
  const router = useRouter();

  async function handleSubmit(data) {
    await $fetch("/api/dispositions", {
      method: "POST",
      body: data,
    });

    router.push("/admin/dispositions");
  }

  return (
    <>
      <AdminNavbar />
      <Title>Add a Disposition</Title>
      <DispositionForm onSubmit={handleSubmit} />
    </>
  );
}
