import { jwtDecode } from "jwt-decode";

const authenticate = (token) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('token', token);

    let decoded = jwtDecode(token);

    console.log('decoded', decoded)

    sessionStorage.setItem('userName', decoded.userName)
    sessionStorage.setItem('id', decoded.id)
  }
}

const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return !!sessionStorage.getItem('token');
}

const clearJWT = ()=>{
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('id');
  }
}


const getUsername = ()=>{
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('userName');
}

export { authenticate, isAuthenticated, clearJWT, getUsername }