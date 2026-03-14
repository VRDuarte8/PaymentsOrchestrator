import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

// Register gateway
export const registerGateway = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const lastGateway = await prisma.gateway.findFirst({
      orderBy: { priority: 'desc' },
    });

    const priority = lastGateway ? lastGateway.priority + 1 : 1;

    const newGateway = await prisma.gateway.create({
      data: {
        name,
        isActive: true,
        priority,
      },
    });

    res.status(201).json({
      id: newGateway.id,
      name: newGateway.name,
      isActive: newGateway.isActive,
      priority: newGateway.priority,
    });
  } catch (error) {
    console.error('Erro de registro: ', error);
    return res.status(500).json({ error: 'erro interno ao registrar gateway' });
  }
};

// List Gateways
export const listGateways = async (req: Request, res: Response) => {
  try {
    const gateways = await prisma.gateway.findMany();

    return res.status(200).json(gateways);
  } catch (error) {
    console.error('Erro de listagem: ', error);
    return res.status(500).json({ error: 'erro interno ao listar gateways' });
  }
};

// List Gateway by ID
export const listGatewaybyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const gateway = await prisma.gateway.findUnique({
      where: { id },
    });

    if (!gateway) {
      return res.status(404).json({ error: 'Gateway não encontrado' });
    }

    return res.status(200).json(gateway);
  } catch (error) {
    console.error('Erro de listagem: ', error);
    return res.status(500).json({ error: 'erro interno ao listar gateway' });
  }
};

// Enable/Disable gateway
export const enableOrDisableGateway = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const gateway = await prisma.gateway.findUnique({
      where: { id },
    });

    if (!gateway) {
      return res.status(422).json({ errors: ['Gateway não encontrado!'] });
    }

    const updatedGateway = await prisma.gateway.update({
      where: { id },
      data: {
        isActive: !gateway.isActive,
      },
    });

    return res
      .status(200)
      .json({
        message: updatedGateway.isActive
          ? 'O gateway foi ativado'
          : 'O gateway foi desativado',
      });
  } catch (error) {
    console.error('Erro: ', error);
    return res
      .status(500)
      .json({ error: 'erro interno ao ativar ou desativar gateway' });
  }
};

// Change priority
export const changeGatewayPriority = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    let newPriority = parseInt(req.body.priority);

    const gateway = await prisma.gateway.findUnique({
      where: { id },
    });

    if (!gateway) {
      return res.status(422).json({ errors: ['Gateway não encontrado!'] });
    }

    const oldPriority = gateway.priority;

    if (oldPriority === newPriority) {
      return res
        .status(200)
        .json({ message: 'Prioridade já atribuida ao gateway' });
    }

    if (oldPriority > newPriority) {
      await prisma.gateway.updateMany({
        where: {
          id: {
            not: id,
          },
          priority: {
            gte: newPriority,
            lt: oldPriority,
          },
        },
        data: {
          priority: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.gateway.updateMany({
        where: {
          id: {
            not: id,
          },
          priority: {
            lte: newPriority,
            gt: oldPriority,
          },
        },
        data: {
          priority: {
            decrement: 1,
          },
        },
      });
    }

    const lastGateway = await prisma.gateway.findFirst({
      orderBy: { priority: 'desc' },
    });

    if (lastGateway!.priority != 1 && lastGateway!.priority < newPriority) {
      newPriority = lastGateway!.priority + 1;
    }

    await prisma.gateway.update({
      where: { id },
      data: { priority: newPriority },
    });

    return res
      .status(200)
      .json({ message: 'A prioridade foi alterada para ' + newPriority });
  } catch (error) {
    console.error('Erro: ', error);
    return res
      .status(500)
      .json({ error: 'erro interno ao alterar prioridade do gateway' });
  }
};

// Delete Gateway
export const deleteGateway = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const deletedGateway = await prisma.gateway.findUnique({ where: { id } });

    if (!deletedGateway) {
      return res.status(422).json({ errors: ['Gateway não encontrado!'] });
    }

    const deletedPriority = deletedGateway.priority;

    await prisma.gateway.delete({ where: { id } });

    await prisma.gateway.updateMany({
      where: {
        priority: {
          gt: deletedPriority,
        },
      },
      data: {
        priority: {
          decrement: 1,
        },
      },
    });

    return res.status(200).json({ message: 'Gateway deletado com sucesso' });
  } catch (error) {
    console.error('Erro de Delete: ', error);
    return res
      .status(500)
      .json({ error: 'Erro interno ao deletar o gateway!' });
  }
};
