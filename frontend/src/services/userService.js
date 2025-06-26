








// services/userService.js

import axios from "axios";
import { refreshToken } from "./authService"; // Pastikan file ini ada dan benar

// Buat instance Axios
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// INTERCEPTOR REQUEST - Sisipkan token Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTOR RESPONSE - Auto refresh token jika 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url === "/login" ||
      originalRequest.url === "/token" ||
      originalRequest._retry
    ) {
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

// =====================
// FUNGSI CRUD USER
// =====================

// Update user by ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
   throw error; 
  }
};




// Create new user
export const createUser = async (userData) => {
  try {
    const response = await api.post("/user", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};




// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user by ID (uuid)
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
