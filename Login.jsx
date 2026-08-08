import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const result = login(
            formData.email,
            formData.password
        );

        setTimeout(() => {
            setLoading(false);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("Welcome back!");

            navigate("/");
        }, 500);
    };

    return (
        <main className="auth-page">

            <div className="auth-container">

                <div className="auth-content">

                    <h1>
                        Welcome Back
                    </h1>

                    <p className="auth-subtitle">
                        Login to continue shopping
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="auth-input">

                            <FaEnvelope />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="auth-input">

                            <FaLock />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="forgot-password">
                            <Link to="/forgot-password">
                                <span>Forgot your password?</span>
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                    </form>

                    <p className="auth-footer">

                        Don't have an account?

                        <Link to="/register">
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    );
}

export default Login;