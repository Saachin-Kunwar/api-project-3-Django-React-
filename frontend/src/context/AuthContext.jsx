import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { apiFetch } from "../services/api";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // ========================================
    // Check Authentication
    // ========================================

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await apiFetch(
                    "/auth/me/"
                );

                if (response.ok) {

                    const data = await response.json();

                    setUser(data);

                } else {

                    setUser(null);

                }

            } catch (error) {

                console.error(
                    "Authentication check failed:",
                    error
                );

                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        checkAuth();

    }, []);


    // ========================================
    // Login
    // ========================================

    const login = async (email, password) => {

        const response = await apiFetch(
            "/auth/login/",
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );


        if (!response.ok) {

            const errorData =
                await response.json();

            const error = new Error(
                errorData.detail ||
                "Login failed."
            );

            error.response = {
                status: response.status,
                data: errorData,
            };

            throw error;
        }


        const data = await response.json();


        // Save JWT tokens
        if (data.access) {

            localStorage.setItem(
                "access",
                data.access
            );
        }

        if (data.refresh) {

            localStorage.setItem(
                "refresh",
                data.refresh
            );
        }


        setUser(data.user);

        return data;
    };


    // ========================================
    // Logout
    // ========================================

    const logout = async () => {

        try {

            await apiFetch(
                "/auth/logout/",
                {
                    method: "POST",
                }
            );

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        } finally {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setUser(null);
        }
    };


    // ========================================
    // Context Value
    // ========================================

    const value = {

        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,

    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


// ========================================
// useAuth Hook
// ========================================

export function useAuth() {

    return useContext(AuthContext);

}