import { Link } from "react-router-dom";

import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";

import { useCart } from "../../context/CartContext";

import toast from "react-hot-toast";

import "./Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);

    toast("Product removed from cart");
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <div className="empty-cart">

          <h1>Your Cart Is Empty</h1>

          <p>
            You haven't added any products yet.
          </p>

          <Link to="/products">
            Continue Shopping
          </Link>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="cart-page">

        <h1>Shopping Cart</h1>

        <div className="cart-container">

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.thumbnail || item.image}
                  alt={item.title}
                />

                <div className="cart-info">

                  <h3>{item.title}</h3>

                  <p>
                    ${item.price}
                  </p>

                </div>

                <div className="quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    <FaMinus />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    <FaPlus />
                  </button>

                </div>

                <strong className="item-total">
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </strong>

                <button
                  className="remove"
                  onClick={() =>
                    handleRemove(item.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>Subtotal</span>

              <strong>
                ${totalPrice.toFixed(2)}
              </strong>

            </div>

            <div className="summary-row">

              <span>Shipping</span>

              <strong>
                Free
              </strong>

            </div>

            <hr />

            <div className="summary-total">

              <span>Total</span>

              <strong>
                ${totalPrice.toFixed(2)}
              </strong>

            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed To Checkout
            </Link>

          </aside>

        </div>

      </main>
    </>
  );
}

export default Cart;