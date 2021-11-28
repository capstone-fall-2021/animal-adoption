import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";

export default function useFormWithSchema(schema) {
  return useForm({
    resolver: yupResolver(schema),
  });
}
