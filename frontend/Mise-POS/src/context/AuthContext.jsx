import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pos_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(name, pin) {
    const loggedInUser = await loginUser(name, pin);
    setUser(loggedInUser);
    localStorage.setItem("pos_user", JSON.stringify(loggedInUser));
    return loggedInUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("pos_user");
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}