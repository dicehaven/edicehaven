import UserModel from "../models/user.js"

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
  const { id } = req.params;
  try {
    await UserModel.updateOne({ _id: id }, {
      ...req.body
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

export { deleteUser, updateUser }