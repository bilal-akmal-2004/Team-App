import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required().label("Name"),
  email: Joi.string().email({ tlds: false }).required().label("Email"),
  password: Joi.string().min(6).required().label("Password"),
});
