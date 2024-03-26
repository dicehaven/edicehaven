import { login, register } from "../controllers/auth.js";

//register and login
const auth = (router) => {
  router.post("/auth/register", register());
  router.post("/auth/login", login());
}

export default auth;


