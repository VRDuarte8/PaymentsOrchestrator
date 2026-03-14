import { body } from 'express-validator';

export const nameValidation = () => {
  return [body('name').notEmpty().withMessage('O nome é obrigatório')];
};

export const priorityValidation = () => {
  return [
    body('priority')
      .notEmpty()
      .withMessage('Informe a prioridade desejada!')
      .isInt({min: 1})
      .withMessage('Informe um número inteiro positivo maior que 0!'),
  ];
};
