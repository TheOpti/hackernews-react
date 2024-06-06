import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setToken: () => {},
  removeToken: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
