import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';

export type TokenType = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
};

let sessionToken: TokenType | null = null;

export const getToken = () => sessionToken ?? getItem<TokenType>(TOKEN);
export const setToken = (token: TokenType, remember = false) => {
  sessionToken = token;
  if (remember) {
    setItem<TokenType>(TOKEN, token);
  }
};
export const removeToken = () => {
  sessionToken = null;
  removeItem(TOKEN);
};
