import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: inline-block;
`;

const SubmitBtnLink = styled.button`
  border-radius: 30px;
  background: #256ce1;
  padding: 10px 22px;
  margin-top: 10%;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const DescriptionTextarea = styled.textarea`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  @media screen and (max-width: 375px) {
    margin-left: 3%;
    width: 20em;
  }
`;

const FormContainer = styled.div`
  display: block;
  align-content: center;
  background: lightgrey;
  margin-left: 30%;
  margin-right: 30%;
  padding-top: 20px;
  border-radius: 30px;
  @media screen and (max-width: 375px) {
    margin-right: 10%;
    margin-left: 10%;
  }
`;

export default function DispositionForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <center>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DescriptionTextarea
            {...register("description")}
            rows="4"
            cols="50"
            placeholder="Enter disposition description"
          ></DescriptionTextarea>
          <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
        </Form>
      </FormContainer>
    </center>
  );
}

DispositionForm.propTypes = {
  onSubmit: PropTypes.func,
};
