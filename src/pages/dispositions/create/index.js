import DispositionForm from "~/components/Forms/add-disposition-form";
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
      <Title>Add a Disposition</Title>
      <DispositionForm />
    </>
  );
}
