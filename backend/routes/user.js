import { deleteUser, updateUser } from "../controllers/users.js";

const user = (router) => {
    router.put("/update/:id", updateUser());
    router.delete("/delete/:id", deleteUser());
}

export default user;

