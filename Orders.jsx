import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";

import { useAuth } from "../../context/AuthContext";

import "./Orders.css";

function Orders() {

    const { user, isLoggedIn } = useAuth();


    // Get orders for current user
    const orders = user
        ? JSON.parse(
            localStorage.getItem(
                `orders_${user.email}`
            )
        ) || []
        : [];


    // User is not logged in
    if (!isLoggedIn) {

        return (
            <>
                <Navbar />

                <main className="orders-page">

                    <div className="no-orders">

                        <FaBoxOpen />

                        <h2>
                            Please Login
                        </h2>

                        <p>
                            You need to login to view
                            your orders.
                        </p>

                        <Link to="/login">
                            Login
                        </Link>

                    </div>

                </main>
            </>
        );

    }


    return (
        <>
            <Navbar />

            <main className="orders-page">

                <div className="orders-header">

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        View your previous orders
                    </p>

                </div>


                {orders.length === 0 ? (

                    <div className="no-orders">

                        <FaBoxOpen />

                        <h2>
                            No Orders Yet
                        </h2>

                        <p>
                            You haven't placed any orders.
                        </p>

                        <Link to="/products">
                            Start Shopping
                        </Link>

                    </div>

                ) : (

                    <div className="orders-list">

                        {[...orders]
                            .reverse()
                            .map((order) => (

                                <div
                                    className="order-card"
                                    key={order.id}
                                >

                                    <div className="order-top">

                                        <div>

                                            <span>
                                                Order ID
                                            </span>

                                            <strong>
                                                #{order.id}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Date
                                            </span>

                                            <strong>
                                                {order.date}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Status
                                            </span>

                                            <strong className="status">
                                                {order.status}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="order-products">

                                        {order.products.map(
                                            (product) => (

                                                <div
                                                    className="order-product"
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
                                                            Quantity:{" "}
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


                                    <div className="order-bottom">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            $
                                            {order.total.toFixed(2)}
                                        </strong>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </main>
        </>
    );
}

export default Orders;