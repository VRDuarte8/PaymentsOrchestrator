import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { PaymentService } from '../services/paymentService.js';
import { TransactionStatus } from '@prisma/client';

export const purchase = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, name, email, cardNumber, cvv } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      return res.status(422).json({ errors: ['Produto não encontrado!'] });
    }

    const total = product.amount.toNumber() * parseInt(quantity);

    const amount = Math.round(total * 100);

    let client = await prisma.client.findUnique({ where: { email } });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name,
          email,
        },
      });
    }

    const paymentResult = await PaymentService.processPayment({
      amount,
      name,
      email,
      cardNumber,
      cvv,
    });

    if (
      !paymentResult ||
      !paymentResult.success ||
      !paymentResult.transactionId
    ) {
      return res.status(402).json({
        error: 'Falha no pagamento!',
      });
    }

    const gateway = await prisma.gateway.findFirst({
      where: { name: paymentResult.gateway },
    });

    const cardLastNumbers = cardNumber.slice(-4);

    const transaction = await prisma.transaction.create({
      data: {
        clientId: client.id,
        gatewayId: gateway!.id,
        externalId: paymentResult.transactionId,
        status: TransactionStatus.APPROVED,
        amount,
        cardLastNumbers,
      },
    });

    const transaction_products = await prisma.transactionProduct.create({
      data: {
        transactionId: transaction.id,
        productId: product.id,
        quantity: parseInt(quantity),
      },
    });

    return res.status(201).json({
      message: 'Transação concluída!',
      transaction_id: transaction.id,
      gateway: paymentResult.gateway,
      amount,
    });
  } catch (error) {
    console.error('Erro na compra: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao registrar a compra!' });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        products: true
      }
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Erro na listagem: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao listar transações!' });
  }
};

export const listTransactionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const transaction = await prisma.transaction.findUnique({ where: { id } });

    if (!transaction) {
      return res.status(422).json({ error: 'Transação não encontrada!' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Erro na listagem: ', error);
    return res.status(500).json({ error: 'Erro interno ao listar transação!' });
  }
};

export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();

    res.status(200).json(clients);
  } catch (error) {
    console.error('Erro na listagem: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao listar clientes!' });
  }
};

export const listClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const client = await prisma.client.findUnique({ where: { id } });

    if (!client) {
      return res.status(422).json({ error: 'Cliente não encontrado!' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error('Erro na listagem: ', error);
    return res.status(500).json({ error: 'Erro interno ao listar cliente!' });
  }
};
