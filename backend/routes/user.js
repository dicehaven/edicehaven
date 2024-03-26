import { deleteUser, updateUser } from "../controllers/users.js";

const user = (router) => {
    router.put("/users/update/:id", updateUser());
    router.delete("/users/delete/:id", deleteUser());
}

export default user;

