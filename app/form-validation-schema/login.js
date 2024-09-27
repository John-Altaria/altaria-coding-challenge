import * as yup from "yup";

const email = yup
  .string()
  .required("Please enter a valid email")
  .email("Please enter a valid email");
const password = yup.string().required("Password is required");

const loginSchema = yup.object().shape({
  email,
  password,
});

export default loginSchema;
