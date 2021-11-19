import TypeForm from "~/components/Forms/add-type-form";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 45px;
  text-align: center;
  display: inline-block;
  position: relative;
  width: 100%;
`;

export default function AddDisposition() {
  return (
    <>
      <Title>Add a Type</Title>
      <TypeForm />
    </>
  );
}
