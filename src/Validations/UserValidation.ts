/* eslint-disable prettier/prettier */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  user_password: yup.string().min(8).max(25).required(),
});
