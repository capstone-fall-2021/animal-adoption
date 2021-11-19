import styled from "styled-components";
import DeleteProfileForm from "~/components/Forms/remove-profile-form";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export default function AddProfile() {
  return (
    <>
      <Title>Delete a Profile</Title>
      <DeleteProfileForm />
    </>
  );
}
