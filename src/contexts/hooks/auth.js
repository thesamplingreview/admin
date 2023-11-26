import { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { differenceInHours } from 'date-fns';
import { appRoute, authRoute } from '@/helpers/route';
import request from '@/helpers/request';
import { useOnce } from '@/helpers/hooks';
import AuthContext from '../AuthContext.jsx';

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  // using additional layer to enable customization
  const setUserInfo = useCallback((data) => {
    if (!data) {
      setUser(null);
    } else {
      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        roleId: data.role_id,
      });
    }
  }, [setUser]);

  return [user, setUserInfo];
}

export function useToken() {
  const { token, setToken } = useContext(AuthContext);

  // using additional layer to enable customization
  const setTokenExpiry = useCallback((newToken) => {
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

  return [token, setTokenExpiry];
}

export function useRefreshToken() {
  const { refreshToken, setRefreshToken } = useContext(AuthContext);

  // using additional layer to enable customization
  const setTokenExpiry = useCallback((newToken) => {
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

  return [refreshToken, setTokenExpiry];
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
    const requestInstance = request.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // response interceptor - retry with refresh token
    requestInstance.interceptors.response.use((resp) => {
      return resp;
    }, async (err) => {
      const originalRequest = err.config;
      /* eslint-disable no-underscore-dangle */
      if (err.response?.data?.code === 401 && !originalRequest._retry && refresh) {
        originalRequest._retry = true;
        const { data: refreshData } = await request({
          url: '/v1/auth/token-refresh',
          method: 'POST',
          data: { refresh_token: refresh },
        });
        const newToken = refreshData.data?.jwt?.access;
        if (!newToken) {
          return Promise.reject(err);
        }

        // reset token
        originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
        // update state
        setToken(newToken);

        return requestInstance(originalRequest);
      }
      /* eslint-enable no-underscore-dangle */
      return Promise.reject(err);
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
 * Perform auth check
 *
 * @param  {boolean}  options.lazy - enable lazy load
 * @return { isAuth, data, loading, error, doFetch }
 */
export function useAuthCheck(options = null) {
  const doFetch = useFetch();
  const [refresh] = useRefreshToken();
  const [user, setUser] = useAuth();
  const [loading, setLoading] = useState(!options?.lazy);
  const [error, setError] = useState(null);

  useOnce(async () => {
    if (!options?.lazy) {
      setLoading(true);
      try {
        // if no refresh token, no need query with server
        if (!refresh) {
          throw new Error('Invalid auth');
        }

        const { code, data } = await doFetch('/v1/auth/my');
        if (code !== 200) {
          throw new Error('Invalid auth');
        }
        setUser(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
  });

  return {
    loading,
    error,
    data: user,
    isAuth: Boolean(user),
    doFetch,
  };
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
