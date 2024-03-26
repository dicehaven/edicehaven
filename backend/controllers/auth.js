import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js';

const register = () => async (req, res) => {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);
    res.json(
      {
        success: true,
        message: "User created successfully.",
        result
      }
    );
  } catch (error) {
    console.log(error);
  }
}


const login = () => async (req, res) => {
  console.log('llegando aca 222...')
  try {
    let user = await UserModel.findOne({ "userName": req.body.userName })
    if (!user)
      throw new Error('User not found');
    if (!user.authenticate(req.body.password))
      throw new Error("Email and/or password don't match.");
    // Issue the token
    let payload = {
      id: user._id,
      username: user.userName,
      isAdmin: user.admin,
    }

    let token = jwt.sign(payload, config.SECRETKEY,
      {
        algorithm: 'HS512',
        expiresIn: "20min"
      });

    // Send the token to the client
    return res.json(
      {
        success: true,
        token: token
      }
    );

  } catch (error) {
    console.log(error);
  }
}


export { register, login }