import { body } from 'express-validator';

export const productValidation = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome é obrigatório'),
    body('amount')
      .notEmpty()
      .withMessage('O valor é obrigatório')
      .matches(/^\d+([.,]\d{1,2})?$/)
      .withMessage('O valor deve ser um número positivo com até duas casas decimais')
  ];
};
