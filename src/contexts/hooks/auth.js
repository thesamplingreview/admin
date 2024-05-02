import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoute, authRoute } from '@/helpers/route';
import request, { genRefreshRequest } from '@/helpers/request';
import AuthContext from '../AuthContext.jsx';

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  return [user, setUser];
}

export function usePermissions() {
  const { permissions, setPermissions } = useContext(AuthContext);

  return [permissions, setPermissions];
}

export function useToken() {
  const { token, setToken } = useContext(AuthContext);

  return [token, setToken];
}

export function useRefreshToken() {
  const { refreshToken, setRefreshToken } = useContext(AuthContext);

  return [refreshToken, setRefreshToken];
}

export function useFetchSetMy() {
  const { fetchSetUser } = useContext(AuthContext);

  return fetchSetUser;
}

/**
 * Generate API endpoint based on user role
 */
export function useRoleEndpoint(endpoint, version = 'v1') {
  const [user] = useAuth();

  const group = user.role_group === 'vendor' ? 'vendor' : 'admin';
  return `/${version}/${group}${endpoint}`;
}

/**
 * Fetcher with token and auto-refresh
 *
 * @return Promise
 */
export function useFetch() {
  const [token, setToken] = useToken();
  const [refresh] = useRefreshToken();

  const fetch = useCallback(async (
    url,
    options = null,
  ) => {
    const requestInstance = genRefreshRequest({
      token,
      refreshToken: refresh,
      updateTokenCb: setToken,
    });

    const response = await requestInstance({
      url,
      ...options,
    });

    return response?.data || null;
  }, [token, setToken, refresh]);

  return fetch;
}

/**
 * Perform login
 *
 * @return Void
 */
export function useLogin() {
  const [, setToken] = useToken();
  const [, setRefresh] = useRefreshToken();
  const fetchSetMy = useFetchSetMy();
  const navigate = useNavigate();

  const doLogin = useCallback(async (input, options) => {
    try {
      const { data } = await request({
        url: '/v1/auth/login',
        method: 'POST',
        data: input,
      });
      if (data.code !== 200) {
        throw new Error('Failed to login.');
      }
      const {
        jwt: { access, refresh },
        user,
      } = data.data;

      // use re-fetch for more data
      await fetchSetMy({
        jwtToken: access.token,
        jwtRefresh: refresh.token,
      });
      // set state
      setToken(access);
      setRefresh(refresh);

      // auto redirect
      navigate(options?.redirect || appRoute('/dashboard'));

      return user;
    } catch (err) {
      const errCode = err.response?.data?.code || 500;
      if (!err.response || errCode === 500) {
        throw new Error(err.message || 'Something went wrong, please contact support');
      }
      throw new Error('Invalid authentication!');
    }
  }, [navigate, setToken, setRefresh, fetchSetMy]);

  return doLogin;
}

/**
 * Perform logout
 *
 * @return Void
 */
export function useLogout() {
  const navigate = useNavigate();
  const [, setToken] = useToken();
  const [, setRefresh] = useRefreshToken();
  const [, setUser] = useAuth();

  const doLogout = useCallback((options = null) => {
    // set state
    setToken(null);
    setRefresh(null);
    setUser(null);

    // redirect
    navigate(options?.redirect || authRoute('/login'));
  }, [navigate, setToken, setRefresh, setUser]);

  return doLogout;
}
