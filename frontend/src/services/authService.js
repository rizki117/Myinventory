







import axios from "axios";

// Buat instance Axios
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// Interceptor REQUEST - Tambahkan token ke setiap permintaan
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor RESPONSE - Auto-refresh token jika 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if ((originalRequest.url === "/login" || originalRequest.url === "/token") || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshToken();
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// === Fungsi Auth ===
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.get("/token");
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.delete("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};