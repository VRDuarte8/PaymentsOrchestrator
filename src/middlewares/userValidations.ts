import { body } from "express-validator";

export const registerValidation = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome é obrigatório!')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter no mínimo 3 caracteres!'),
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
