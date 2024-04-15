import { login, register } from "../controllers/auth.js";

//register and login
const auth = (router) => {
  // register route
  router.post("/auth/register", register());

  // login route
  router.post("/auth/login", login());
}

export default auth;


