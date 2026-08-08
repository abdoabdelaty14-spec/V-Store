import { Link } from "react-router-dom";

import {
    FaShoppingCart,
    FaHeart,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/images/hero.png";

import "./Navbar.css";

function Navbar() {

    const { totalItems } = useCart();

    const { wishlist } = useWishlist();

    const {
        user,
        logout,
        isLoggedIn
    } = useAuth();

    const handleLogout = () => {
        logout();

        toast.success("Logged out successfully");
    };

    return (
        <nav className="navbar">

            {/* Logo */}

            <Link to="/" className="logo">

                <img
                    src={logo}
                    alt="V-Store"
                    className="logo-image"
                />

                <span className="logo-text">
                    V-Store
                </span>

            </Link>


            {/* Navigation */}

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link
                    to="/wishlist"
                    className="nav-icon"
                >

                    <FaHeart />

                    {wishlist.length > 0 && (
                        <span className="nav-count">
                            {wishlist.length}
                        </span>
                    )}

                </Link>


                <Link
                    to="/cart"
                    className="nav-icon"
                >

                    <FaShoppingCart />

                    {totalItems > 0 && (
                        <span className="nav-count">
                            {totalItems}
                        </span>
                    )}

                </Link>


                {isLoggedIn ? (

                    <div className="user-menu">

                        <Link
                            to="/orders"
                            className="user-name"
                        >

                            <FaUser />

                            <span>
                                {user.username}
                            </span>

                        </Link>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >

                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                ) : (

                    <div className="auth-links">

                        <Link
                            to="/login"
                            className="login-button"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="signup-button"
                        >
                            Sign Up
                        </Link>

                    </div>

                )}

            </div>

        </nav>
    );
}

export default Navbar;