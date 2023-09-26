/* eslint-disable prettier/prettier */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  user_password: yup.string().min(8).max(25).required(),
});

export const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const firstnameSchema = yup.object().shape({
  firstname: yup.string().trim().required(),
});
export const lastnameSchema = yup.object().shape({
  lastname: yup.string().trim().required(),
});
export const passwordSchema = yup.object().shape({
  user_password: yup.string().min(8).max(25).required(),
});
