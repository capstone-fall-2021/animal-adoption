import PropTypes from "prop-types";
import styled from "styled-components";
import { FormError } from "~/components/form";
import { breed, useFormWithSchema } from "~/schemas";

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

export default function BreedForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema(breed);

  return (
    <center>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input id="name" type="text" {...register("name")} />
            <div>
              <FormError error={errors.name} />
            </div>
          </div>
          <div>
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
