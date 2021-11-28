import * as yup from "yup";

export default yup.object({
  description: yup.string().required(),
});
