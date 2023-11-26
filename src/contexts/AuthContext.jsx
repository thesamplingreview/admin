import { createContext, useState } from 'react';
import Cookie from 'js-cookie';

// using localStorage
const initialState = {
  token: Cookie.get('access_token') || '',
  refreshToken: Cookie.get('refresh_token') || '',
  user: null,
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({
  children,
}) => {
  const [token, setToken] = useState(initialState.token);
  const [refreshToken, setRefreshToken] = useState(initialState.refreshToken);
  const [user, setUser] = useState(initialState.user);

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      refreshToken,
      setRefreshToken,
      user,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
