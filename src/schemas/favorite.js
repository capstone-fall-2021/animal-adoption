import * as yup from "yup";

export default yup.object({
  profileId: yup.number().required(),
});
