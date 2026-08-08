import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaKey } from "react-icons/fa";
import toast from "react-hot-toast";

import "./ForgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [recoveryPin, setRecoveryPin] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // Find account
        const userIndex = users.findIndex(
            (user) =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );


        // Account not found
        if (userIndex === -1) {

            toast.error(
                "Unable to verify account."
            );

            return;
        }


        const currentUser = users[userIndex];


        // Check Recovery PIN
        if (
            currentUser.recoveryPin !==
            recoveryPin
        ) {

            toast.error(
                "Recovery PIN is incorrect."
            );

            return;
        }

        // Check password length
        if (newPassword.length < 6) {

            toast.error(
                "Password must be at least 6 characters."
            );

            return;
        }


        // Check passwords
        if (
            newPassword !==
            confirmPassword
        ) {

            toast.error(
                "Passwords do not match."
            );

            return;
        }


        // Update password
        users[userIndex] = {
            ...currentUser,
            password: newPassword
        };


        // Save users
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        toast.success(
            "Password changed successfully!"
        );


        // Clear form
        setEmail("");
        setRecoveryPin("");
        setNewPassword("");
        setConfirmPassword("");

    };


    return (

        <main className="forgot-page">

            <div className="forgot-card">

                {/* Icon */}

                <div className="forgot-icon">
                    <FaLock />
                </div>


                <h1>
                    Forgot Password?
                </h1>


                <p>
                    Enter your email and Recovery PIN
                    to securely reset your password.
                </p>


                <form
                    onSubmit={handleSubmit}
                >

                    {/* Email */}

                    <div className="forgot-field">

                        <label>
                            Email Address
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


                    {/* Recovery PIN */}

                    <div className="forgot-field">

                        <label>
                            Recovery PIN
                        </label>

                        <div className="recovery-input">

                            <FaKey />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength="4"
                                placeholder="Enter 4-digit PIN"
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

                        <small>
                            Enter the 4-digit PIN you
                            created when registering.
                        </small>

                    </div>


                    {/* New Password */}

                    <div className="forgot-field">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Confirm Password */}

                    <div className="forgot-field">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* Reset */}

                    <button
                        type="submit"
                        className="reset-btn"
                    >
                        Reset Password
                    </button>

                </form>


                {/* Back */}

                <Link
                    to="/login"
                    className="back-login"
                >
                    ← Back to Login
                </Link>

            </div>

        </main>

    );
}

export default ForgotPassword;