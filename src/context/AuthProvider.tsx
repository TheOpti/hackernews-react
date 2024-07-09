import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

export interface AuthContextProps {
  authenticatedUser: string | null;
  setToken: (token: string, username: string) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authenticatedUser: null,
  setToken: () => {},
  removeToken: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');

    setAuthenticatedUser(username);
  }, []);

  const setToken = (token: string, username: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    setAuthenticatedUser(username);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
