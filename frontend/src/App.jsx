import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";


// ========================================
// Authentication Logout Listener
// ========================================

function AuthLogoutListener() {
    const { logout } = useAuth();

    useEffect(() => {

        const handleAuthLogout = () => {

            console.log(
                "Authentication expired. Logging out..."
            );

            logout();
        };

        window.addEventListener(
            "auth:logout",
            handleAuthLogout
        );

        return () => {

            window.removeEventListener(
                "auth:logout",
                handleAuthLogout
            );
        };

    }, [logout]);

    return null;
}


// ========================================
// Dashboard
// ========================================

function Dashboard() {

    const {
        user,
        loading,
        isAuthenticated,
        logout,
    } = useAuth();


    // ========================================
    // Authentication Loading
    // ========================================

    if (loading) {

        return (
            <div
                style={{
                    padding: "40px",
                    textAlign: "center",
                }}
            >

                <h2>
                    Loading ProductHub...
                </h2>

                <p>
                    Please wait while we verify
                    your session.
                </p>

            </div>
        );
    }


    // ========================================
    // Not Authenticated
    // ========================================

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // ========================================
    // Dashboard UI
    // ========================================

    return (
        <div
            style={{
                padding: "40px",
            }}
        >

            <h1>
                ProductHub Dashboard
            </h1>

            <h2>
                Welcome, {user.username}
            </h2>

            <p>
                Email: {user.email}
            </p>

            <br />

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}


// ========================================
// App
// ========================================

function App() {

    return (
        <>
            <AuthLogoutListener />

            <Routes>

                {/* Home */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

            </Routes>
        </>
    );
}

export default App;