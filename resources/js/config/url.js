const {
    VITE_API_HOST = "127.0.0.1",
    VITE_API_PORT = "8000",
} = import.meta.env;

const API_PROTOCOL = VITE_API_HOST.indexOf("http") === 0 ? "" : "http://";
export const BASE_URL = `${API_PROTOCOL}${VITE_API_HOST}:${VITE_API_PORT}`;
export const API_URL = `${BASE_URL}`;
export const AUTH_TOKEN_NAME = "@dme.login.access_token";
export const HTTP_TIMEOUT = 10000;

export const POST = "post";
export const PUT = "put";
export const GET = "get";
export const DELETE = "delete";
