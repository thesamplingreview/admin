import Qs from 'qs';
import axios from 'axios';
import config from '@/config/app';

const instance = axios.create({
  baseURL: config.apiUrl,
  paramsSerializer: (params) => (Qs.stringify(params, { arrayFormat: 'indices' })),
});

// Request interceptor - log outgoing requests
instance.interceptors.request.use(
  (request) => {
    const fullUrl = `${request.baseURL}${request.url}`;
    console.log('📤 API Request:', {
      method: request.method?.toUpperCase(),
      url: fullUrl,
      endpoint: request.url,
      baseURL: request.baseURL,
      hasAuth: !!request.headers?.Authorization,
      timestamp: new Date().toISOString(),
    });
    return request;
  },
  (error) => {
    console.error('❌ Request Error (before send):', error);
    return Promise.reject(error);
  }
);

// Response interceptor - log responses and errors
instance.interceptors.response.use(
  (response) => {
    console.log('📥 API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      data: response.data,
      timestamp: new Date().toISOString(),
    });
    return response;
  },
  (error) => {
    // Network error (no response from server)
    if (!error.response) {
      console.error('🌐 Network Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullUrl: error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown',
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      
      // Check for common issues
      if (error.code === 'ERR_NETWORK') {
        console.error('💡 Possible causes:');
        console.error('   - API server is down or unreachable');
        console.error('   - CORS issue (check browser console for CORS errors)');
        console.error('   - Network connectivity issue');
        console.error('   - SSL/TLS certificate issue');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('💡 Connection refused - API server may not be running');
      } else if (error.code === 'ETIMEDOUT') {
        console.error('💡 Request timeout - API server may be slow or unreachable');
      }
    } else {
      // HTTP error response
      console.error('❌ API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url,
        method: error.config.method?.toUpperCase(),
        data: error.response.data,
        headers: error.response.headers,
        timestamp: new Date().toISOString(),
      });
    }
    
    return Promise.reject(error);
  }
);

export default instance;

/**
 * Refresh request
 */
export async function postRefreshToken(refreshToken) {
  try {
    console.log('🔄 Attempting token refresh...');
    const { data: refreshData } = await instance({
      url: '/v1/auth/token-refresh',
      method: 'POST',
      data: { refresh_token: refreshToken },
    });
    console.log('✅ Token refresh successful');
    return refreshData.data?.jwt?.access;
  } catch (error) {
    console.error('❌ Token refresh failed:', error);
    throw error;
  }
}

/**
 * Generate request instance with referesh token
 *
 * @return Axios instance
 */
export function genRefreshRequest({
  token,
  refreshToken = '',
  updateTokenCb = null,
}) {
  const newInstance = instance.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // response interceptor - retry with refresh token
  newInstance.interceptors.response.use((resp) => {
    return resp;
  }, async (err) => {
    const originalRequest = err.config;
    /* eslint-disable no-underscore-dangle */
    if (err.response?.data?.code === 401 && !originalRequest._retry && refreshToken) {
      console.log('🔄 401 Unauthorized - attempting token refresh...');
      originalRequest._retry = true;
      try {
        const newToken = await postRefreshToken(refreshToken);
        if (!newToken) {
          console.error('❌ Token refresh returned no token');
          return Promise.reject(err);
        }

        // reset token
        originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
        originalRequest._retryToken = newToken;

        // callback
        if (updateTokenCb) {
          updateTokenCb(newToken);
        }

        console.log('✅ Token refreshed, retrying original request');
        return newInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed during retry:', refreshError);
        return Promise.reject(err);
      }
    }
    /* eslint-enable no-underscore-dangle */
    return Promise.reject(err);
  });

  return newInstance;
}
