import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

export const setAuthToken = ({
  token,
  isRememberMe,
}: {
  token: string;
  isRememberMe?: boolean;
}) => {
  if (isRememberMe) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};
