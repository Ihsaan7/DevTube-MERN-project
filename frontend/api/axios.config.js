import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  timeout: 10000,
});

// REQUEST INTERCEPTOR - Runs before every request
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Add token to Authorization header (fixed: headers not header)
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤 Request: ", config.method, config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Runs after every response
apiClient.interceptors.response.use(
  (response) => {
    // Return just the data part
    return response.data;
  },
  async (error) => {
    // Handle 401 - Token expired, try to refresh
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true; // Prevent infinite loop

      try {
        // Call refresh token endpoint
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/refresh-token",
          {},
          { withCredentials: true }
        );

        // Save new token
        const newToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Retry original request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(error.config);
      } catch (refreshError) {
        // Refresh failed - logout user
        console.error("❌ Token refresh failed");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    console.error("❌ Response error: ", error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
