import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import "./Checkout.css";

function Checkout() {

    const {
        cart,
        totalPrice,
        clearCart
    } = useCart();

    const {
        user,
        isLoggedIn
    } = useAuth();

    const navigate = useNavigate();


    const [orderPlaced, setOrderPlaced] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: ""
    });


    // =========================
    // Handle Input
    // =========================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // =========================
    // Place Order
    // =========================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (!isLoggedIn || !user) {

            alert(
                "Please login before placing an order."
            );

            navigate("/login");

            return;
        }


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            navigate("/products");

            return;
        }


        // Get current user's orders
        const storageKey =
            `orders_${user.email}`;


        const existingOrders =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                )
            ) || [];


        // Create new order
        const newOrder = {

            id: Date.now(),

            date:
                new Date().toLocaleDateString(),

            status: "Processing",

            products: cart.map(
                (product) => ({
                    ...product
                })
            ),

            total: totalPrice,

            customer: {

                name: formData.name,

                email: formData.email,

                phone: formData.phone,

                address: formData.address,

                city: formData.city

            }

        };


        // Add order
        const updatedOrders = [

            ...existingOrders,

            newOrder

        ];


        // Save orders for THIS USER
        localStorage.setItem(
            storageKey,
            JSON.stringify(
                updatedOrders
            )
        );


        // Empty cart
        clearCart();


        // Show success
        setOrderPlaced(true);

    };


    // =========================
    // Not Logged In
    // =========================

    if (!isLoggedIn) {

        return (
            <>
                <Navbar />

                <main className="checkout-page">

                    <div className="checkout-message">

                        <h2>
                            Please Login
                        </h2>

                        <p>
                            You need to login before
                            completing your order.
                        </p>

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </main>
            </>
        );

    }


    // =========================
    // Order Success
    // =========================

    if (orderPlaced) {

        return (
            <>
                <Navbar />

                <main className="checkout-page">

                    <div className="checkout-success">

                        <FaCheckCircle />

                        <h1>
                            Order Placed Successfully!
                        </h1>

                        <p>
                            Thank you for shopping
                            with V-Store.
                        </p>

                        <div className="checkout-actions">

                            <Link to="/orders">
                                View My Orders
                            </Link>

                            <Link to="/products">
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                </main>
            </>
        );

    }


    // =========================
    // Empty Cart
    // =========================

    if (cart.length === 0) {

        return (
            <>
                <Navbar />

                <main className="checkout-page">

                    <div className="checkout-message">

                        <h2>
                            Your Cart Is Empty
                        </h2>

                        <p>
                            Add some products before
                            checking out.
                        </p>

                        <Link to="/products">
                            Start Shopping
                        </Link>

                    </div>

                </main>
            </>
        );

    }


    // =========================
    // Checkout
    // =========================

    return (
        <>
            <Navbar />

            <main className="checkout-page">

                <div className="checkout-container">

                    <div className="checkout-form">

                        <h1>
                            Checkout
                        </h1>

                        <p>
                            Complete your information
                            to place your order.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your phone"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your address"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your city"
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="place-order-btn"
                            >
                                Place Order
                            </button>

                        </form>

                    </div>


                    {/* Order Summary */}

                    <div className="checkout-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="checkout-products">

                            {cart.map(
                                (product) => (

                                    <div
                                        className="checkout-product"
                                        key={product.id}
                                    >

                                        <img
                                            src={
                                                product.thumbnail
                                            }
                                            alt={
                                                product.title
                                            }
                                        />


                                        <div>

                                            <h3>
                                                {product.title}
                                            </h3>

                                            <p>
                                                Quantity:
                                                {" "}
                                                {product.quantity}
                                            </p>

                                            <strong>
                                                $
                                                {(
                                                    product.price *
                                                    product.quantity
                                                ).toFixed(2)}
                                            </strong>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                $
                                {totalPrice.toFixed(2)}
                            </strong>

                        </div>

                    </div>

                </div>

            </main>
        </>
    );
}

export default Checkout;