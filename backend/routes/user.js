import { deleteUser, getUsers, updateUser, getUser } from "../controllers/users.js";
import { isAdmin, isAuthenticated } from "../helpers/auth.js";

const user = (router) => {
    // get all users
    router.get("/users", isAuthenticated(), isAdmin(), getUsers());

    // update user - user id passed in user body
    router.put("/users/update", isAuthenticated(), updateUser());

    // delete user by id
    router.delete("/users/:id", isAuthenticated(), isAdmin(), deleteUser());

    // get one user
    router.get("/users/:id", isAuthenticated(), getUser());
}

export default user;

