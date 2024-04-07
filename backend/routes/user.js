import { deleteUser, getUsers, updateUser, getUser } from "../controllers/users.js";
import { isAdmin, isAuthenticated } from "../helpers/auth.js";

const user = (router) => {
    router.get("/users", isAuthenticated(), isAdmin(), getUsers());
    router.put("/users/update", isAuthenticated(), updateUser());
    router.delete("/users/:id", isAuthenticated(), isAdmin(), deleteUser());
    router.get("/users/:id", isAuthenticated(), getUser());
}

export default user;

