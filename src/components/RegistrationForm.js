import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import FormError from "~/components/FormError";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords must match"),
  })
  .required();

export default function RegistrationForm({ onSubmit, submissionErrors }) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const errors = {
    ...formState.errors,
    ...submissionErrors,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
