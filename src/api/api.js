import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DEV_URL = "http://localhost:8080";
const PROD_URL = "https://nce-backend-production.up.railway.app/";

const api = axios.create({
  baseURL: DEV_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        sessionStorage.removeItem("token");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const handledError = handleError(error);
    throw handledError.errorMessage;
  },
);

function handleError(error) {
  if (error.response) {
    const { statusCode, message, timestamp } = error.response?.data ?? {};

    const resolvedStatusCode = error.status ?? 500;
    const resolvedMessage =
      message ?? "An error occurred. Please try again, refresh page or login";
    const resolvedTimestamp = timestamp ?? new Date().toISOString();

    if (error.status == 401) {
      sessionStorage.removeItem("token");
    }

    return {
      errorMessage: {
        statusCode: resolvedStatusCode,
        message: resolvedMessage,
        timestamp: resolvedTimestamp,
      },
    };
  } else if (error.request) {
    return {
      errorMessage: {
        statusCode: 500,
        message:
          "The server is not responding. Edit your request and try again",
        timestamp: new Date().toISOString(),
      },
    };
  } else {
    return {
      errorMessage: {
        statusCode: 500,
        message: "An unexpected error occurred.",
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export default api;
