import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoute, authRoute } from '@/helpers/route';
import request, { genRefreshRequest } from '@/helpers/request';
import AuthContext from '../AuthContext.jsx';

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  return [user, setUser];
}

export function useToken() {
  const { token, setToken } = useContext(AuthContext);

  return [token, setToken];
}

export function useRefreshToken() {
  const { refreshToken, setRefreshToken } = useContext(AuthContext);

  return [refreshToken, setRefreshToken];
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
  const [, setUser] = useAuth();
  const navigate = useNavigate();

  const doLogin = useCallback(async (input, options) => {
    try {
      const { data } = await request({
        url: '/v1/auth/login',
        method: 'POST',
        data: input,
      });
      if (data.code !== 200) {
        throw new Error('Unable to login.');
      }
      const {
        jwt: { access, refresh },
        user,
      } = data.data;

      // set state
      setToken(access);
      setRefresh(refresh);
      setUser(user);

      // auto redirect
      navigate(options?.redirect || appRoute('/dashboard'));

      return user;
    } catch (err) {
      const errCode = err.response?.data?.code || 500;
      if (!err.response || errCode === 500) {
        // eslint-disable-next-line no-console
        console.log(err);
        throw new Error('Something went wrong, please contact support');
      }
      throw new Error('Invalid authentication!');
    }
  }, [navigate, setToken, setRefresh, setUser]);

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
