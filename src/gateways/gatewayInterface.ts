export interface PaymentGateway {
  processPayment(data: PaymentData): Promise<PaymentResult>
}

export interface PaymentData {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}