import { APP_ROUTE, AUTH_ROUTE } from '@/config/route';

export function appRoute(path) {
  return `${APP_ROUTE}/${path}`.replace(/\/+/g, '/');
}

export function authRoute(path) {
  return `${AUTH_ROUTE}/${path}`.replace(/\/+/g, '/');
}
