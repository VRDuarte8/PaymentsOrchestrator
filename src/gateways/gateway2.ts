import axios from 'axios';
import {
  PaymentGateway,
  PaymentData,
  PaymentResult,
} from './gatewayInterface.js';

export class Gateway2 implements PaymentGateway {
  private baseUrl = 'http://localhost:3002';

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transacoes`,
        {
          valor: data.amount,
          nome: data.name,
          email: data.email,
          numeroCartao: data.cardNumber,
          cvv: data.cvv,
        },
        {
          headers: {
            'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
            'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
          },
        },
      );

      return {
        success: true,
        transactionId: response.data.id,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'invalid_card',
      };
    }
  }
}
