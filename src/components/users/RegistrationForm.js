import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormError } from "~/components/form";
import { registration } from "~/schemas";

export default function RegistrationForm({ onSubmit, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      registration.shape({
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "passwords must match"),
      })
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div>Error: {error}</div>}
      <div>
        <input {...register("email")} placeholder="Email" />
        <FormError error={errors.email} />
      </div>
      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <FormError error={errors.password} />
      </div>
      <div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
        />
        <FormError error={errors.confirmPassword} />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  );
}

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
};
