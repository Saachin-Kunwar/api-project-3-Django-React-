import { useState } from "react";
import { API_BASE_URL } from "../services/api";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        console.log("Login failed:", data);
        return;
      }

      console.log("Login successful:", data);

      // Store JWT tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Update authentication state
      setIsLoggedIn(true);

      // Clear login form
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout
  const handleLogout = () => {
    // Remove JWT tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Update authentication state
    setIsLoggedIn(false);

    console.log("Logout successful");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>You are logged in</h2>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>

          <form onSubmit={handleLogin}>
            <div>
              <label>Username</label>
              <br />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <br />

            <div>
              <label>Password</label>
              <br />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <br />

            <button type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;