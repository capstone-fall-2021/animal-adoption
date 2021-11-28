import { useRouter } from "next/router";
import { $fetch } from "ohmyfetch";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BreedForm } from "~/components/breeds";
import { getTypeByName } from "~/repositories/types";
import { withAdminSession } from "~/session";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export const getServerSideProps = withAdminSession(async (context) => {
  const type = await getTypeByName(context.query.type);

  if (!type) {
    return { notFound: true };
  }

  return {
    props: {
      type: type.name,
    },
  };
});

export default function NewBreed({ type }) {
  const router = useRouter();

  async function handleSubmit(data) {
    await $fetch(`/api/types/${type}/breeds`, {
      method: "POST",
      body: data,
    });

    router.push(`/admin/types/${type}`);
  }

  return (
    <>
      <Title>Add a Breed</Title>
      <BreedForm onSubmit={handleSubmit} />
    </>
  );
}

NewBreed.propTypes = {
  type: PropTypes.string,
};
