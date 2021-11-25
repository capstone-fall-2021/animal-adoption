import styled from "styled-components";
import DeleteProfileForm from "~/components/Forms/remove-profile-form";
import { getProfiles } from "~/lib/profile";

export const getServerSideProps = async () => {
  const profileAll = await getProfiles({ orderBy: [{ createdAt: "desc" }] });
  return {
    props: {
      profileAll,
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

export default function AddProfile({ profileAll }) {
  return (
    <>
      <Title>Delete a Profile</Title>
      <DeleteProfileForm allProfiles={profileAll} />
    </>
  );
}
