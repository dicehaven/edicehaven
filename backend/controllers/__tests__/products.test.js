import { getProducts, createProduct } from "../products.js";
import ProductModel from "../../models/product.js"
import { jest } from '@jest/globals';

const mockBoardGames = [
  {
    _id: 'bg1',
    name: 'Kingdom Quest Strategy Board Game',
    image: 'kingdom-quest.jpg',
    description: 'A complex strategy game where you build your kingdom and battle opponents to reign supreme.',
    brand: 'FantasyGames',
    category: ['Games', 'Board', 'Strategy'],
    price: 59.99,
    countInStock: 120,
    rating: 4.8,
    numReviews: 220,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'bg2',
    name: 'Puzzle Pals Adventure',
    image: 'puzzle-pals.jpg',
    description: 'Cooperative puzzle-solving game where players work together to solve mysteries and achieve common goals.',
    brand: 'PuzzleCraft',
    category: ['Games', 'Board Games', 'Family'],
    price: 34.95,
    countInStock: 85,
    rating: 4.6,
    numReviews: 159,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];


describe('Products unit testing', () => {
  describe('getProducts', () => {
    it('should return all products', async () => {

      const prodFunc = jest.spyOn(ProductModel, 'find').mockReturnThis();
      const sortMock = jest.fn().mockResolvedValue(mockBoardGames);
      ProductModel.sort = sortMock;

      const req = {
        query: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      await getProducts()(req, res);

      expect(prodFunc).toBeCalled();
      expect(sortMock).toBeCalledWith({ countInStock: -1, name: 1 }); 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        products: mockBoardGames
      });
    });
  });
});