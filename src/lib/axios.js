import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // specific check for 401 and avoid infinite loops
    // Also skip if the failed request was already a refresh attempt
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh_token')) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/refresh_token', {});
        const { token } = response.data;

        localStorage.setItem('accessToken', token);

        // Update header for the failed request
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear everything and redirect to login
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Or use a cleaner way to redirect if available
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);