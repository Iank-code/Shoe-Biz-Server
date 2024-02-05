import * as yup from "yup";

export const registerValidationScheme = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Password confirmation should match the password field"
    )
    .required("Password confirmation is required"),
});

export type RegisterInput = yup.InferType<typeof registerValidationScheme>;
