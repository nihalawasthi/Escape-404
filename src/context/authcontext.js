import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../appwrite/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      const accountDetails = await authService.loginUser(
        userInfo.email,
        userInfo.password
      );
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await authService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const contextData = {
    loading,
    user,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};