/* eslint-disable prettier/prettier */
import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  user_password: yup.string().min(4).max(25).required(),
});

export const signupSchema = yup.object().shape({
  lastname: yup.string().trim().required('Inscrivez votre nom'),
  firstname: yup.string().trim().required('Inscrivez votre prénom'),
  user_address: yup.string().trim().required('Inscrivez votre adresse'),
  email: yup
    .string()
    .email()
    .required('Votre adresse e-mail n&apos;est pas valide'),
  user_password: yup
    .string()
    .min(8)
    .max(25)
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .matches(/[#?!@$%^&*-]/)
    .required(
      'Le mot de passe est requis et doit respecter les critères suivants : au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial .'
    ),
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
  user_password: yup.string().min(4).max(25).required(),
});

export const citySchema = yup.object().shape({
  user_address: yup.string().trim().required(),
});

export const nameSchema = yup.object().shape({
  name: yup.string().trim().required(),
});
export const raceSchema = yup.object().shape({
  race: yup.string().trim().required(),
});
