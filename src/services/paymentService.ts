import { Gateway1 } from '../gateways/gateway1.js';
import { Gateway2 } from '../gateways/gateway2.js';
import { PaymentData, PaymentResult } from '../gateways/gatewayInterface.js';
import { prisma } from '../config/prisma.js';

const gatewayMap = {
  gateway1: new Gateway1(),
  gateway2: new Gateway2(),
};

export class PaymentService {
  static async processPayment(data: PaymentData) {
    const gateways = await prisma.gateway.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        priority: 'asc',
      },
    });

    if (!gateways.length) {
      throw new Error('Sem gateways ativos');
    }

    for (const gateway of gateways) {
      const gatewayInstance =
        gatewayMap[gateway.name as keyof typeof gatewayMap];

      if (!gatewayInstance) continue;

      try {
        const result: PaymentResult =
          await gatewayInstance.processPayment(data);

        if (result.success) {
          return {
            success: true,
            gateway: gateway.name,
            transactionId: result.transactionId,
          };
        }
      } catch (error) {
        console.log(`Gateway ${gateway.name} falhou`);
      }

      return {
        success: false,
        message: 'Todos os gateways falharam',
      };
    }
  }
}
