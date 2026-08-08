import "./ProductCard.css";

import { Link } from "react-router-dom";

import {
  FaStar,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const favorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);

    toast.success("Product added to cart");
  };

  const handleWishlist = () => {
    if (favorite) {
      removeFromWishlist(product.id);

      toast("Removed from wishlist");
    } else {
      addToWishlist(product);

      toast.success("Added to wishlist");
    }
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />

          {product.discountPercentage && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <h3>{product.title}</h3>

        <div className="rating">
          <FaStar />

          <span>
            {product.rating}
          </span>
        </div>

        <p className="price">
          ${product.price}
        </p>
      </Link>

      <div className="buttons">

        <button
          className="cart-button"
          onClick={handleAddToCart}
        >
          <FaShoppingCart />

          Add To Cart
        </button>

        <button
          className={`heart ${
            favorite ? "active" : ""
          }`}
          onClick={handleWishlist}
        >
          <FaHeart />
        </button>

      </div>
    </motion.div>
  );
}

export default ProductCard;