import { deleteUser, getUsers, updateUser, getUser } from "../controllers/users.js";

const user = (router) => {
    router.get("/users", getUsers());
    router.put("/users/update", updateUser());
    router.delete("/users/:id", deleteUser());
    router.get("/users/:id", getUser());
}

export default user;

