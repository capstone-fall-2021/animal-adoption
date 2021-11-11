import BreedForm from "~/components/Forms/add_breed_form";
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
      <Title>Add a Breed</Title>
      <center>
        <p>Breeds can only be created for already existing Types</p>
      </center>
      <BreedForm />
    </>
  );
}
