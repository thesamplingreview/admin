import { createContext, useState, useCallback } from 'react';
import Cookie from 'js-cookie';
import { differenceInHours } from 'date-fns';
import { getValue } from '@/helpers/utils';
import { genRefreshRequest } from '@/helpers/request';
import { useOnce } from '@/helpers/hooks';
import config from '@/config/app';
import CLoader from '@/components/CLoader.jsx';

// using localStorage
const initialState = {
  token: Cookie.get('access_token') || '',
  refreshToken: Cookie.get('refresh_token') || '',
  user: null,
  permissions: [],
};

const cachedUserData = (data) => {
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    vendor_id: data.vendor_id,
    role: getValue(data, 'user_role.code'),
    role_group: getValue(data, 'user_role.group'),
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
  const [permissions, setPermissions] = useState(initialState.permissions);

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
      setPermissions(data.permissions);
    } else {
      setUser(null);
    }
  }, [setUser]);

  const fetchSetUserHook = useCallback(async ({ jwtToken, jwtRefresh }) => {
    const doFetch = genRefreshRequest({
      token: jwtToken,
      refreshToken: jwtRefresh,
      updateTokenCb: setTokenHook,
    });

    const result = await doFetch('/v1/auth/my', {
      params: { scopes: 1 },
    });
    const { data } = result.data;
    // cross-verify again
    if (!data || !config.loginableRoleIds.includes(data.role_id)) {
      throw new Error('Unauthorized access.');
    }
    setUserHook(data);
    return data;
  }, [setTokenHook, setUserHook]);

  const initAuth = async () => {
    if (!token && !refreshToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await fetchSetUserHook({
        jwtToken: token,
        jwtRefresh: refreshToken,
      });
    } catch (err) {
      // ...
    }
    setLoading(false);
  };

  useOnce(() => {
    initAuth();
  });

  return (
    <AuthContext.Provider value={{
      token,
      setToken: setTokenHook,
      refreshToken,
      setRefreshToken: setRefreshHook,
      user,
      setUser: setUserHook,
      permissions,
      setPermissions,
      fetchSetUser: fetchSetUserHook,
    }}>
      {loading && <CLoader full />}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
