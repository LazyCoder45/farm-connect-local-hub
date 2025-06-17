
export interface Order {
  id: string;
  cropId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  advancePayment: number; // 20% of total
  remainingPayment: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  transportId?: string;
  deliveryAddress: string;
  expectedDeliveryDate: Date;
  paymentStatus: 'advance_paid' | 'completed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}
