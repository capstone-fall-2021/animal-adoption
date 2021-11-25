import ProfileForm from "~/components/Forms/add-profile-form";
import styled from "styled-components";
import { getAvailabilities } from "~/lib/availability";
import { getDispositions } from "~/lib/disposition";
import { getTypes, getBreeds } from "~/lib/type";

export const getServerSideProps = async () => {
  const allTypes = await getTypes();
  const allBreeds = await getBreeds();
  const allDispositions = await getDispositions();
  const allAvailabilities = await getAvailabilities();
  return {
    props: {
      allTypes,
      allBreeds,
      allDispositions,
      allAvailabilities,
    },
  };
};
const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export default function AddProfile({
  allTypes,
  allBreeds,
  allDispositions,
  allAvailabilities,
}) {
  return (
    <>
      <Title>Add a Profile</Title>
      <ProfileForm
        allTypes={allTypes}
        allBreeds={allBreeds}
        allDispositions={allDispositions}
        allAvailabilities={allAvailabilities}
      />
    </>
  );
}
