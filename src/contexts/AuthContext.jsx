import { createContext, useState, useCallback } from 'react';
import Cookie from 'js-cookie';
import { differenceInHours } from 'date-fns';
import { genRefreshRequest } from '@/helpers/request';
import { useOnce } from '@/helpers/hooks';
import CLoader from '@/components/CLoader.jsx';

// using localStorage
const initialState = {
  token: Cookie.get('access_token') || '',
  refreshToken: Cookie.get('refresh_token') || '',
  user: null,
};

const cachedUserData = (data) => {
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    email: data.email,
    name: data.name,
  };
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(initialState.token);
  const [refreshToken, setRefreshToken] = useState(initialState.refreshToken);
  const [user, setUser] = useState(initialState.user);

  // additional layer for state update
  const setTokenHook = useCallback((newToken) => {
    if (!newToken) {
      setToken('');
      Cookie.remove('access_token');
    } else if (typeof newToken === 'object') {
      setToken(newToken.token);
      // sync with cookie
      Cookie.set('access_token', newToken.token, {
        expires: Math.ceil(differenceInHours(new Date(newToken.expiry), new Date()) / 24),
      });
    } else {
      setToken(newToken);
    }
  }, [setToken]);

  const setRefreshHook = useCallback((newToken) => {
    if (!newToken) {
      setRefreshToken('');
      Cookie.remove('refresh_token');
    } else if (typeof newToken === 'object') {
      setRefreshToken(newToken.token);
      // sync with cookie
      Cookie.set('refresh_token', newToken.token, {
        expires: Math.ceil(differenceInHours(new Date(newToken.expiry), new Date()) / 24),
      });
    } else {
      setRefreshToken(newToken);
    }
  }, [setRefreshToken]);

  const setUserHook = useCallback((data) => {
    if (data) {
      setUser(cachedUserData(data));
    } else {
      setUser(null);
    }
  }, [setUser]);

  useOnce(async () => {
    if (!token && !refreshToken) {
      setLoading(false);
    }

    const doFetch = genRefreshRequest({
      token,
      refreshToken,
      updateTokenCb: setTokenHook,
    });

    setLoading(true);
    try {
      const allowedRoles = [2, 3, 9];
      const result = await doFetch('/v1/auth/my');
      const { data } = result.data;
      if (data && allowedRoles.includes(data.role_id)) {
        setUserHook(data);
      }
    } catch (err) {
      // ...
    }
    setLoading(false);
  });

  return (
    <AuthContext.Provider value={{
      token,
      setToken: setTokenHook,
      refreshToken,
      setRefreshToken: setRefreshHook,
      user,
      setUser: setUserHook,
    }}>
      {loading && <CLoader full />}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
