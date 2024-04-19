import { getOrders } from "../orders.js";
import OrderModel from "../../models/order.js"
import { jest } from '@jest/globals';

const mockOrders = [
  {
    _id: 'order1',
    user: 'user1',
    orderId: 'ORD001',
    payerId: 'PAYER123',
    paymentId: 'PAYMENT123',
    paymentSource: 'credit_card',
    status: 'completed',
    totalPaid: 100.00,
    orderDetails: [
      { productId: 'product1', quantity: 1, unitPrice: 100.00 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'order2',
    user: 'user2',
    orderId: 'ORD002',
    payerId: 'PAYER124',
    paymentId: 'PAYMENT124',
    paymentSource: 'paypal',
    status: 'processing',
    totalPaid: 200.00,
    orderDetails: [
      { productId: 'product2', quantity: 2, unitPrice: 50.00 },
      { productId: 'product3', quantity: 1, unitPrice: 100.00 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

describe('Orders unit testing', () => {
  describe('getOrders', () => {
    it('should retrieve all the orders', async () => {
      const findMock = jest.spyOn(OrderModel, 'find').mockReturnThis();
      const populateMock = jest.fn().mockResolvedValue(mockOrders);
      OrderModel.populate = populateMock;

      const req = {}; 
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      await getOrders()(req, res);

      expect(findMock).toBeCalled();
      expect(OrderModel.populate).toBeCalledWith('user'); 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Orders found successfully",
        orders: mockOrders
      });
    });
  });
});