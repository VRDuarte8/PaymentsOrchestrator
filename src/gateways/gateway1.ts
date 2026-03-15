import axios from 'axios';
import {
  PaymentGateway,
  PaymentData,
  PaymentResult,
} from './gatewayInterface.js';

export class Gateway1 implements PaymentGateway {
  private baseUrl = process.env.GATEWAY1_URL || 'http://localhost:3001';
  private token: string | null = null;

  private async authenticate() {
    if (this.token) return;

    const response = await axios.post(`${this.baseUrl}/login`, {
      email: 'dev@betalent.tech',
      token: 'FEC9BB078BF338F464F96B48089EB498',
    });

    this.token = response.data.token;
  }

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      await this.authenticate();

      const response = await axios.post(
        `${this.baseUrl}/transactions`,
        {
          amount: data.amount,
          name: data.name,
          email: data.email,
          cardNumber: data.cardNumber,
          cvv: data.cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
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
