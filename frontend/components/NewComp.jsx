import { useAuth } from "../context/AuthContext";
import { login } from "../api/services/authServices";

function LoginPage() {
  const { handleLogin, user, isLoggedIn } = useAuth(); // ✅ Access auth data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      handleLogin(response); // ✅ Update context after login

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Check if already logged in
  if (isLoggedIn) {
    return <p>Already logged in as {user.username}!</p>;
  }

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
