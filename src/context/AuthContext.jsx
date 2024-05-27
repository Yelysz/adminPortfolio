import { useEffect } from "react";
import { useState } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { AuthContext } from "./useAuth.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors?.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // const signup = async (user) => {
  //   try {
  //     const res = await registerRequest(user);
  //     if (res.status === 200) {
  //       setUser(res.data);
  //       setIsAuthenticated(true);
  //     }
  //   } catch (error) {
  //     console.log(error.response.data);
  //     setErrors(error.response.data.message);
  //   }
  // };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      // console.log(res.data)
      setIsAuthenticated(true);
    } catch (error) {
      const errorsMessage = error.response.data.error;
      const errorMessage = error.response.data.message;
      setErrors(Array.isArray(errorsMessage) ? errorsMessage : [errorMessage]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        // console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
