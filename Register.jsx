import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [recoveryPin, setRecoveryPin] = useState("");


    const handleSubmit = (e) => {

        e.preventDefault();


        // Check passwords
        if (password !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;
        }


        // Check password length
        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;
        }


        // Check Recovery PIN
        if (!/^\d{4}$/.test(recoveryPin)) {

            toast.error(
                "Recovery PIN must be exactly 4 digits"
            );

            return;
        }


        // Create account
        const result = register(
            username,
            email,
            password,
            recoveryPin
        );


        if (!result.success) {

            toast.error(
                result.message
            );

            return;
        }


        toast.success(
            "Account created successfully!"
        );


        navigate("/");

    };


    return (

        <main className="register-page">

            <div className="register-card">


                {/* Icon */}

                <div className="register-icon">

                    <FaUserPlus />

                </div>


                <h1>
                    Create Account
                </h1>


                <p className="register-subtitle">
                    Join V-Store and start shopping
                </p>


                <form
                    onSubmit={handleSubmit}
                >


                    {/* Username */}

                    <div className="register-field">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Email */}

                    <div className="register-field">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="register-field">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Confirm Password */}

                    <div className="register-field">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Recovery PIN */}

                    <div className="register-field">

                        <label>
                            Recovery PIN
                        </label>

                        <div className="pin-input">

                            <FaLock />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength="4"
                                placeholder="4-digit PIN"
                                value={recoveryPin}
                                onChange={(e) =>
                                    setRecoveryPin(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                required
                            />

                        </div>


                        <small className="recovery-hint">

                            Remember this 4-digit PIN.
                            You will need it if you
                            forget your password.

                        </small>

                    </div>


                    {/* Register Button */}

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Create Account
                    </button>

                </form>


                {/* Login */}

                <p className="login-link">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>


            </div>

        </main>

    );
}

export default Register;