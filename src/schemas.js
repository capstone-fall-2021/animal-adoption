import * as yup from "yup";

export const email = yup.string().email();

export const password = yup.string().min(10);
