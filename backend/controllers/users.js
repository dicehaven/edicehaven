import UserModel from "../models/user.js"

const getUsers = () => async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(
      {
        success: true,
        message: "User found successfully",
        users
      }
    );

  } catch (error) {
    console.log(error);
  }
}

const deleteUser = () => async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteOne({ _id: id })

    return res.json(
      {
        success: true,
        message: "User deleted successfully"
      }
    );

  } catch (error) {
    console.log(error);
  }
}

const updateUser = () => async (req, res) => {
  const { id, ...rest } = req.body;
  try {
    await UserModel.updateOne({ _id: id }, {
      ...rest,
    })

    return res.json(
      {
        success: true,
        message: "User updated successfully"
      }
    );

  } catch (error) {
    console.log(error);
  }
}

const getUser = () => async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }

}


export { deleteUser, updateUser, getUsers, getUser }