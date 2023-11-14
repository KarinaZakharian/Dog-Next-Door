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
  user_address: yup
    .string()
    .trim()
    .min(5, "L'adresse doit comporter au moins 5 caractères")
    .matches(/[a-z]/, "L'adresse doit contenir au moins une lettre minuscule")
    .matches(
      /[A-Z]/,
      "L'adresse doit comporter contenir au moins une lettre majuscule"
    )
    .matches(/[0-9]/, "L'adresse doit comporter contenir au moins un chiffre")
    .required('Inscrivez votre adresse'),
  email: yup.string().email().required("Votre adresse e-mail n'est pas valide"),
  user_password: yup
    .string()
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
    .max(25, 'Le mot de passe ne peut pas dépasser 25 caractères')
    .matches(
      /[a-z]/,
      'Le mot de passe doit contenir au moins une lettre minuscule'
    )
    .matches(
      /[A-Z]/,
      'Le mot de passe doit contenir au moins une lettre majuscule'
    )
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(
      /[#?!@$%^&*-]/,
      'Le mot de passe doit contenir au moins un caractère spécial'
    )
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
