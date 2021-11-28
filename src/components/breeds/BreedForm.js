import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: inline-block;
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
`;

export default function BreedForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

  return (
    <center>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <DescriptionTextarea
              {...register("name")}
              rows="2"
              cols="30"
              placeholder="Enter the breed name"
            />
            <SubmitBtnLink type="submit">Submit</SubmitBtnLink>
          </div>
        </Form>
      </FormContainer>
    </center>
  );
}

BreedForm.propTypes = {
  onSubmit: PropTypes.func,
};
