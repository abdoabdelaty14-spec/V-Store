import { Link } from "react-router-dom";

import {
    FaArrowRight,
    FaCompass
} from "react-icons/fa";

import "./Hero.css";

function Hero() {

    return (
        <section className="hero">

            <div className="hero-content">

                <span className="hero-badge">
                    ✨ Discover Something Amazing
                </span>

                <h1>
                    Discover The Best
                    <span> Products</span>
                </h1>

                <p>
                    Shop thousands of products from
                    your favorite categories with
                    amazing prices, trusted quality,
                    and fast delivery.
                </p>

                <div className="hero-buttons">

                    <Link
                        to="/products"
                        className="shop-now-button"
                    >

                        Shop Now

                        <FaArrowRight />

                    </Link>


                    <a
                        href="#categories"
                        className="explore-button"
                    >

                        <FaCompass />

                        Explore

                    </a>

                </div>

            </div>

        </section>
    );
}

export default Hero;