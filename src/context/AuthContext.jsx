import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    // No need to manually set headers here, interceptor handles it
                    const response = await axiosInstance.get('/auth/me');
                    setUser(response.data);
                } else {
                    // Try to refresh from cookie if no access token exists
                    try {
                        // Refresh token is passed automatically via HttpOnly cookie (withCredentials: true)
                        const response = await axiosInstance.post('/auth/refresh_token', {});
                        const { token } = response.data;
                        localStorage.setItem('accessToken', token);

                        const userRes = await axiosInstance.get('/auth/me');
                        setUser(userRes.data);
                    } catch (e) {
                        // Cookie missing or invalid
                        setUser(null);
                        localStorage.removeItem('accessToken');
                    } finally {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);

                // If it was a 401, the interceptor might have already tried refreshing.
                // If we are here, it likely failed or wasn't a refreshable scenario.
                // We should ensure state is clear.
                localStorage.removeItem('accessToken');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('accessToken', token);

            // Fetch user details immediately after login
            const userRes = await axiosInstance.get('/auth/me');
            setUser(userRes.data);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await axiosInstance.post('/auth/register', userData);
            return true;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post(
                "/auth/logout",
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("geminiResponse");
            setUser(null);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
