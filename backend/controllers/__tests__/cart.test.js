import { getUserCart, getProductFromCart } from "../cart.js";
import CartModel from "../../models/cart.js"
import { jest } from '@jest/globals';

const mockCarts = [
  {
    _id: 'cart1',
    user: 'user1',
    items: [
      { product: 'product1', quantity: 2, price: 20 },
      { product: 'product2', quantity: 1, price: 30 }
    ],
    discount: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'cart2',
    user: 'user2',
    items: [
      { product: 'product3', quantity: 1, price: 15 }
    ],
    discount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


describe('Cart unit testing', () => {
  describe('getUserCart', () => {
    it('should retrieve the user cart successfully', async () => {
      const cartFunc = jest.spyOn(CartModel, 'find').mockReturnThis();
      const populateMock = jest.fn().mockResolvedValueOnce([mockCarts[0]]);
      CartModel.populate = populateMock;

      const req = { params: { userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
  
      await getUserCart()(req, res);
  
      expect(cartFunc).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User cart retrieved successfully",
        cart: [mockCarts[0]]
      });
    });
  });

  describe('getProductFromCart', () => {
    it('should return the specified product from the user\'s cart', async () => {
      const cartFunc = jest.spyOn(CartModel, 'findOne').mockResolvedValueOnce(mockCarts[0]); 
  
      const req = { params: { productId: 'product1', userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
  
      await getProductFromCart()(req, res);
  
      expect(cartFunc).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Product found in the user's cart",
        product: mockCarts[0].items[0]
      });
    });
  });
});