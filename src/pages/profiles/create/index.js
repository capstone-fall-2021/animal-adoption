import ProfileForm from "~/components/add_profile_form";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

const SubTitle = styled.p`
  font-size: 24px;
  padding-left: 100px;
`;

export default function AddProfile() {
  return (
    <>
      <Title>Add a Profile</Title>
      <ProfileForm />
    </>
  );
}
