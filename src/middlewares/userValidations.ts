import { body } from "express-validator";

export const registerValidation = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('o e-mail é obrigatório')
      .isEmail()
      .withMessage('insira um e-mail válido!'),
    body('password')
      .notEmpty()
      .withMessage('A senha é obrigatória')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínimo 5 caracteres!'),
  ];
};

export const loginValidation = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('o e-mail é obrigatório')
      .isEmail()
      .withMessage('insira um e-mail válido!'),
    body('password').isString().withMessage('A senha é obrigatória'),
  ];
};

export const userUpdateValidation = () => {
  return [
    body('password')
      .optional()
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínimo 5 caracteres!'),
  ];
};