import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FormError } from "~/components/form";
import { disposition } from "~/schemas";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(disposition),
  });

  return (
    <center>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <input {...register("description")} id="description" type="text" />
            <div>
              <FormError error={errors.description} />
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

DispositionForm.propTypes = {
  onSubmit: PropTypes.func,
};
