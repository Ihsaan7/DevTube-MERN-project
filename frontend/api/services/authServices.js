import apiClient from "../axios.config.js";

// ==================== REGISTER ====================
// Purpose: Sign up a new user with files (avatar, coverImage)
export const register = async (userData) => {
  try {
    // userData should have: username, email, password, fullName, avatar, coverImage

    // Create FormData (needed for file upload)
    const formData = new FormData();

    // Add text fields
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("fullName", userData.fullName);

    // Add files
    if (userData.avatar) {
      formData.append("avatar", userData.avatar); // File object from input
    }
    if (userData.coverImage) {
      formData.append("coverImage", userData.coverImage); // File object from input
    }

    // Call API - Note: backend route is /users/signup (not /register)
    const response = await apiClient.post("/users/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Save token and user to localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("❌ Register Error:", error);
    throw error;
  }
};

// ==================== LOGIN ====================
// Purpose: Login existing user with email & password
export const login = async (credentials) => {
  try {
    // credentials = { email, password }

    // Call API
    const response = await apiClient.post("/users/login", credentials);

    // Save token and user to localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error);
    throw error;
  }
};

// ==================== LOGOUT ====================
// Purpose: Logout user and clear session
export const logout = async () => {
  try {
    // Call API to invalidate refresh token on server
    await apiClient.post("/users/logout");

    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("❌ Logout Error:", error);
    // Even if API fails, clear local data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

// ==================== GET CURRENT USER ====================
// Purpose: Get logged-in user's profile data
export const getCurrentUser = async () => {
  try {
    // Call API - token is automatically added by interceptor
    const response = await apiClient.get("/users/profile");

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("❌ Get User Error:", error);
    throw error;
  }
};

// ==================== REFRESH TOKEN ====================
// Purpose: Get new access token using refresh token
// Note: This is called automatically by axios interceptor
export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post("/users/refresh-token");

    // Save new token
    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data;
  } catch (error) {
    console.error("❌ Refresh Token Error:", error);
    throw error;
  }
};

// ==================== CHECK IF LOGGED IN ====================
// Purpose: Check if user is authenticated (client-side check)
export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  return !!(token && user); // Returns true if both exist
};

// ==================== GET USER FROM STORAGE ====================
// Purpose: Get user data from localStorage
export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
