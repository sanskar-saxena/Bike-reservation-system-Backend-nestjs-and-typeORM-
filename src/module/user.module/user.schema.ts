import * as joi from 'joi';
import { ERole } from 'src/models/user.models';
export const userSignupSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error('full name must be at least 3 characters'))
    .required(),
  email: joi.string().email().error(new Error('Email is Invalid')).required(),
  password: joi
    .string()
    .min(5)
    .error(new Error('password must be at least 5 characters'))
    .required(),
  role: joi
    .string()
    .valid(ERole.Regular, ERole.Manager)
    .error(new Error('Only two options are allowed i.e regular and manager'))
    .required(),
});

export const userSigninSchema = joi.object({
  email: joi
    .string()
    .trim()
    .email()
    .error(new Error('Email is Invalid'))
    .required(),
  password: joi
    .string()
    .trim()
    .min(5)
    .error(new Error('password must be at least 5 characters'))
    .required(),
});

export const userUpdateSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(30)
    .error(new Error('full name must be at least 3 characters')),
  email: joi.string().email().error(new Error('Email is Invalid')),
  password: joi
    .string()
    .min(5)
    .empty('')
    .error(new Error('password must be at least 5 characters')),
  roles: joi
    .string()
    .valid(ERole.Regular, ERole.Manager)
    .error(new Error('Only two options are allowed i.e regular and manager')),
  id: joi.string().empty().error(new Error('Id is not passed')),
});
