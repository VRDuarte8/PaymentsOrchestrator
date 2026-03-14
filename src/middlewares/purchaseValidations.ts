import { body } from 'express-validator';

export const purchaseValidation = () => {
  return [
    body('product_id').notEmpty().withMessage('O id do produto é obrigatório'),
    body('quantity')
      .notEmpty()
      .withMessage('A quantidade é obrigatória')
      .isInt()
      .withMessage('O valor deve ser um número inteiro positivo'),
    body('name').notEmpty().withMessage('O nome do cliente é obrigatório'),
    body('email')
      .notEmpty()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage('Email inválido'),
    body('cardNumber')
      .notEmpty()
      .withMessage('Envie o número do cartão')
      .isNumeric()
      .withMessage('Número do cartão deve conter apenas números')
      .isLength({ min: 16, max: 16 })
      .withMessage('Cartão deve ter 16 dígitos'),
    body('cvv')
      .notEmpty()
      .withMessage('Envie o cvv do cartão')
      .isNumeric()
      .isLength({ min: 3, max: 3 }),
  ];
};
