import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode }from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        console.log("Token expired");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthToken();
    const interval = setInterval(checkAuthToken, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuthToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setIsLoggedIn(false);
//       setLoading(false);
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         console.log("Token expired");
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//       } else {
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       console.error("Invalid token", error);
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     checkAuthToken();
//     const interval = setInterval(checkAuthToken, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, loading, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
