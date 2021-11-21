import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import FormError from "~/components/form-error";
import { email, password } from "~/schemas";

const schema = yup.object({
  email: email.required(),
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

export default function RegistrationForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
