import { jwtDecode } from "jwt-decode";

const authenticate = (token) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem('token', token);

    let decoded = jwtDecode(token);

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

const clearJWT = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('id');
  }
}

const getUsername = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('userName');
}

const isUserAdmin = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const token = sessionStorage.getItem('token')

  if (token) {
    let decoded = jwtDecode(token);
    return decoded.isAdmin;
  }

  return false;

}


const getUserId = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('id');
}

const getUserToken = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem('token');
}

export { authenticate, isAuthenticated, clearJWT, getUsername, getUserId, isUserAdmin, getUserToken }