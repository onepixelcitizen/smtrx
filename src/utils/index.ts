import Cookies, { CookieAttributes } from "js-cookie";

const AUTH_COOKIE_NAME = "smtrx-auth";

const setCookie = (
  name: string,
  value: string,
  options: CookieAttributes = {},
): void => {
  const isSecure = process.env.NODE_ENV === "production";
  Cookies.set(name, value, {
    secure: isSecure,
    expires: new Date(new Date().getTime() + 60 * 60 * 1000), // expires in 1 hour
    ...options,
  });
};

const getCookie = (name: string): string | undefined => Cookies.get(name);

const deleteCookie = (name: string): void => Cookies.remove(name);

export const setAuthToken = (value: string): void => {
  setCookie(AUTH_COOKIE_NAME, value, {
    ...(process.env.NODE_ENV === "production" && { sameSite: "Strict" }),
  });
};

export const getAuthToken = (): string | undefined => {
  return getCookie(AUTH_COOKIE_NAME);
};

export const deleteAuthToken = (): void => {
  deleteCookie(AUTH_COOKIE_NAME);
};

export const groupBy = (arr: {}[], key: any) =>
  arr?.reduce((p: any, c: any) => {
    (p[c[key]] = p[c[key]] || []).push(c);
    return p;
  }, {});
