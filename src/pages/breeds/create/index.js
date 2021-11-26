import BreedForm from "~/components/Forms/add-breed-form";
import styled from "styled-components";
import { getTypes } from "~/lib/type";

export const getServerSideProps = async () => {
  const allTypes = await getTypes();
  return {
    props: {
      allTypes,
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

export default function AddDisposition({ allTypes }) {
  return (
    <>
      <Title>Add a Breed</Title>
      <center>
        <p>Breeds can only be created for already existing Types</p>
      </center>
      <BreedForm allTypes={allTypes} />
    </>
  );
}
