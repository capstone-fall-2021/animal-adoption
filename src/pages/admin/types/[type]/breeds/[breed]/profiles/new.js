import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ProfileForm } from "~/components/profiles";
import { findAvailabilities } from "~/repositories/availabilities";
import { getBreedByName } from "~/repositories/breeds";
import { findDispositions } from "~/repositories/dispositions";
import { getTypeByName } from "~/repositories/types";
import { withAdminSession } from "~/session";

export const getServerSideProps = withAdminSession(async (context) => {
  const [type, breed] = await Promise.all([
    getTypeByName(context.query.type),
    getBreedByName(context.query.breed),
  ]);

  if (!type || !breed) {
    return { notFound: true };
  }

  const [dispositions, availabilities] = await Promise.all([
    findDispositions(),
    findAvailabilities(),
  ]);

  return {
    props: {
      type: type.name,
      breed: breed.name,
      dispositions,
      availabilities,
    },
  };
});

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export default function NewProfile({
  type,
  breed,
  dispositions,
  availabilities,
}) {
  const router = useRouter();

  async function handleSubmit({ image, ...data }) {
    const formData = new FormData();

    for (const [k, v] of Object.entries(data)) {
      formData.append(k, v);
    }

    formData.append("image", image[0]);

    await fetch(`/api/types/${type}/breeds/${breed}/profiles`, {
      method: "POST",
      body: formData,
    });

    router.push(`/admin/types/${type}/breeds/${breed}`);
  }

  return (
    <>
      <Title>Add a Profile</Title>
      <ProfileForm
        dispositions={dispositions}
        availabilities={availabilities}
        onSubmit={handleSubmit}
      />
    </>
  );
}

NewProfile.propTypes = {
  type: PropTypes.string,
  breed: PropTypes.string,
  dispositions: PropTypes.arrayOf(PropTypes.object),
  availabilities: PropTypes.arrayOf(PropTypes.object),
};
