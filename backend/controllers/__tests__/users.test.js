import { getUsers } from "../users.js";
import UserModel from "../../models/user.js"
import { jest } from '@jest/globals';


const mockUsers = [
  {
    _id: '1',
    fullName: 'John Doe',
    userName: 'johndoe',
    email: 'john@example.com',
    hashedPassword: 'hashedpassword1',
    salt: 'randomsalt1',
    created: new Date('2022-01-01T00:00:00.000Z'),
    updated: new Date('2022-01-02T00:00:00.000Z'),
    admin: false
  },
  {
    _id: '2',
    fullName: 'Jane Smith',
    userName: 'janesmith',
    email: 'jane@example.com',
    hashedPassword: 'hashedpassword2',
    salt: 'randomsalt1',
    created: new Date('2022-01-03T00:00:00.000Z'),
    updated: new Date('2022-01-04T00:00:00.000Z'),
    admin: true
  }
];


describe('Users unit testing', () => {
  describe('getUsers', () => {
    it('should return all users', async () => {

      const userFunc = jest.spyOn(UserModel, 'find').mockResolvedValue(mockUsers);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };

      await getUsers()(req, res);

      expect(userFunc).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User found successfully",
        users: mockUsers
      });
    });
  });
});