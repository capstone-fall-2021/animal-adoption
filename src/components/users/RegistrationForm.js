import PropTypes from "prop-types";
import * as yup from "yup";
import { FormError } from "~/components/form";
import { registration, useFormWithSchema } from "~/schemas";
import styled from "styled-components";

const FormInput = styled.input`
  background: rgb(245, 245, 245);
  border: rgba(0, 0, 0, 0);
  font-size: 13;
  height: 30px;
  width: 200px;
  margin-bottom: 5px;
  border: 8px;
  margin-top: 10px;
`;

const SubmitButt = styled.input`
  font-size: 13;
  :default {
    background-color: rgb(250, 187, 1);
    color: black;
  }
  &:active,
  &:hover {
    background: rgb(250, 213, 1);
    scale: 1;
  }
  border-radius: 8px;
  height: 30px;
  width: 200px;
  box-shadow: none;
`;

export default function RegistrationForm({ onSubmit, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormWithSchema(
    registration.shape({
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "passwords must match"),
    })
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div>Error: {error}</div>}
      <div>
        <FormInput {...register("email")} placeholder="Email" />
        <br />
        <FormError error={errors.email} />
      </div>
      <div>
        <FormInput
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <br />
        <FormError error={errors.password} />
      </div>
      <div>
        <FormInput
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
        />
        <br />
        <FormError error={errors.confirmPassword} />
      </div>
      <div>
        <SubmitButt type="submit" value="Register" />
      </div>
    </form>
  );
}

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
};
