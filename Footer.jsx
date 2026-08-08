import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaTiktok
} from "react-icons/fa";

import "./Footer.css";

function Footer() {

    const whatsappNumber = "+201234567890";

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-column">

                    <h2 className="footer-logo">
                        V-Store
                    </h2>

                    <p>
                        Your favorite place to discover
                        amazing products at great prices.
                    </p>

                    <div className="footer-social">

                        <a
                            href="https://www.facebook.com/Vstores.1/"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://www.instagram.com/v.seven.eg/?hl=ar"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        {/* WhatsApp */}

                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            rel="noreferrer"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                        <a
                            href="https://www.tiktok.com/@vstore_de"
                            rel="noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok />
                        </a>

                    </div>

                </div>


                {/* Quick Links */}

                <div className="footer-column">

                    <h3>
                        Quick Links
                    </h3>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/products">
                        Products
                    </Link>

                    <Link to="/wishlist">
                        Wishlist
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>

                </div>


                {/* Account */}

                <div className="footer-column">

                    <h3>
                        Account
                    </h3>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Sign Up
                    </Link>

                    <Link to="/orders">
                        My Orders
                    </Link>

                </div>


                {/* Contact */}

                <div className="footer-column">

                    <h3>
                        Contact
                    </h3>

                    <p>
                        Email: v.store.tech1@gmail.com
                    </p>

                    <p>
                        WhatsApp: +20 12 3456 7890
                    </p>

                    <p>
                        Egypt
                    </p>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} V-Store.
                    All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;