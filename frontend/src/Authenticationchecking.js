import { jwtDecode }from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return false; 
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      console.log("Token expired");
      localStorage.removeItem("authToken");
      return false; 
    }
    return true; 
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem("authToken");
    return false;
  }
};
