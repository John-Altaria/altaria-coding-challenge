import * as yup from "yup";

const email = yup
  .string()
  .required("Please enter a valid email")
  .email("Please enter a valid email");
const password = yup.string().required("Password is required");
const confirmPassword = yup
  .string()
  .required("Confirm password")
  .oneOf([yup.ref("password"), null], "Passwords must match");

const signupSchema = yup.object().shape({
  email,
  password,
  confirmPassword,
});

export default signupSchema;
