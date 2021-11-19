import ProfileForm from "~/components/Forms/add-profile-form";
import styled from "styled-components";

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
      <Title>Add a Profile</Title>
      <ProfileForm />
    </>
  );
}
