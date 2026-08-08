import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import { getSingleProduct } from "../../services/productService";

import "./ProductDetails.css";

import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getSingleProduct(id);
        setProduct(data);
        setMainImage(data.thumbnail);
      } catch (error) {
        console.log(error);
      }
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="details">

        {/* Left Side */}

        <div className="left">

          <div className="main-image">
            <img src={mainImage} alt={product.title} />
          </div>

          <div className="gallery">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.title}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

        </div>

        {/* Right Side */}

        <div className="right">

          <h1>{product.title}</h1>

          <div className="rating">
            <FaStar />
            <span>{product.rating}</span>
          </div>

          <h2>${product.price}</h2>

          <h4 className="discount">
            Save {product.discountPercentage}% Today
          </h4>

          <p className="stock">
            {product.stock > 0 ? "✅ In Stock" : "❌ Out Of Stock"}
          </p>

          <p className="description">
            {product.description}
          </p>

          <div className="info">

            <p>
              <strong>Brand :</strong> {product.brand}
            </p>

            <p>
              <strong>Category :</strong> {product.category}
            </p>

            <p>
              <strong>Stock :</strong> {product.stock}
            </p>

          </div>

          <div className="shipping">

            <p>🚚 Free Shipping</p>

            <p>↩️ Free Returns within 30 Days</p>

            <p>🔒 Secure Payment</p>

          </div>

          <div className="buttons">

            <button
              className="cart-btn"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>

            <button className="buy-btn">
              Buy Now
            </button>

          </div>

        </div>

      </section>
      <RelatedProducts
            category={product.category}
            currentProductId={product.id}
        />
    </>
  );
}

export default ProductDetails;