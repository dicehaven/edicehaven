import { deleteUser, getUsers, updateUser } from "../controllers/users.js";

const user = (router) => {
    router.get("/users", getUsers());
    router.put("/users/update", updateUser());
    router.delete("/users/:id", deleteUser());
}

export default user;

