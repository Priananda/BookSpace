import Cookies from 'js-cookie';

export const setAuthToken = (token: string) => {
  Cookies.set('token_user', token, { expires: 1 });
};

export const getAuthToken = () => {
  return Cookies.get('token_user');
};

export const clearAuthToken = () => {
  Cookies.remove('token_user');
};
