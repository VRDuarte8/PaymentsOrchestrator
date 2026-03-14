import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

// Register product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        amount: parseFloat(amount.replace(',','.')),
      },
    });

    res.status(201).json({
      id: newProduct.id,
      name: newProduct.name,
      amount: newProduct.amount,
    });
  } catch (error) {
    console.error('Erro de registro: ', error);
    return res.status(500).json({ error: 'erro interno ao registrar produto' });
  }
};

// List all products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    return res.status(200).json(products);
  } catch (error) {
    console.error('Erro de listagem: ', error);
    return res.status(500).json({ error: 'erro interno ao listar produtos' });
  }
};

// List product by ID
export const listProductbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Erro de listagem: ', error);
    return res.status(500).json({ error: 'erro interno ao listar produto' });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { name, amount } = req.body;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(422).json({ errors: ['Produto não encontrado!'] });
    }

    const updatedData: any = {};

    if (name) {
      updatedData.name = name;
    }

    if (amount) {
      updatedData.amount = parseFloat(amount.replace(',','.'));
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).json({
      id: updatedProduct.id,
      name: updatedProduct.name,
      amount: updatedProduct.amount,
    });
  } catch (error) {
    console.error('Erro de update: ', error);
    return res.status(500).json({ error: 'erro interno ao atualizar produto' });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(422).json({ errors: ['Produto não encontrado!'] });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro de delete: ', error);
    return res.status(500).json({ error: 'erro interno ao deletar produto' });
  }
};
