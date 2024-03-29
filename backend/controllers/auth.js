import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js';

const register = () => async (req, res) => {
  try {
    let newUser = new UserModel(req.body);

    let result = await UserModel.create(newUser);

    // Issue the token
    let payload = {
      id: result._id,
      userName: result.userName,
      isAdmin: result.admin,
    }

    let token = jwt.sign(payload, config.SECRETKEY,
      {
        algorithm: 'HS512',
        expiresIn: "20min"
      });

    return res.json(
      {
        success: true,
        message: "User created successfully.",
        token,
      }
    );
  } catch (error) {
    console.log(error);
    return res.json(
      {
        success: false,
        message: error.message,
      }
    );
  }
}



const login = () => async (req, res) => {
  try {
    let user = await UserModel.findOne({ "userName": req.body.userName })
    if (!user) {
      return res.json(
        {
          success: false,
          message: "User not found.",
        }
      );
    }

    if (!user.authenticate(req.body.password)) {
      return res.json(
        {
          success: false,
          message: "Email and/or password don't match.",
        }
      );
    }
    // Issue the token
    let payload = {
      id: user._id,
      userName: user.userName,
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
        message: "Login successful",
        token: token
      }
    );

  } catch (error) {
    console.log(error);
    return res.json(
      {
        success: false,
        message: error.message,
      }
    );
  }
}


export { register, login }