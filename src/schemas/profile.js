import * as yup from "yup";

export default yup.object({
  name: yup.string().required(),
  dob: yup.string().required(),
  description: yup.string().required(),
  dispositionIds: yup.array().of(yup.string()).required(),
  availabilityId: yup.string().required(),
  image: yup.mixed().required(),
});
