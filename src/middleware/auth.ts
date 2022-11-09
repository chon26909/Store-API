import { body } from "express-validator";

export const validateLogin = () => {
  body("email").isEmail();
  body("password").isEmpty();
};
