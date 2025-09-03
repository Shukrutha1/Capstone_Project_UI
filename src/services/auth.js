import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'payroll_token';

export function setToken(token, remember = false) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  removeToken();
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = jwt_decode(token);
    return payload.role || payload.roles || payload.authorities || null;
  } catch (e) {
    return null;
  }
}

export function decodeToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
}
