import { BASE_URL } from './constants';
import { handleResponse } from './utils';

const handleQuery = async ({ method, link, data, extraHeaders }) => {
  const headers = {
    ...extraHeaders,
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${BASE_URL}${link}`, {
    method,
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const login = (data) => {
  return handleQuery({
    method: 'POST',
    link: 'signin',
    data,
  });
};

export const register = (data) => {
  return handleQuery({
    method: 'POST',
    link: 'signup',
    data,
  });
};

export const logout = () => {
  return handleQuery({
    method: 'POST',
    link: 'signout',
  });
};
