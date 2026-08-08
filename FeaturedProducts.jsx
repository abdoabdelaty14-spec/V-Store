import "./FeaturedProducts.css";

import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";

import ProductCard from "../FeaturedProducts/ProductCard";

function FeaturedProducts() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts(8, 0);

                setProducts(data.products);

            } catch (error) {

                console.error(
                    "Failed to fetch products:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    if (loading) {

        return (
            <section className="featured-products">

                <h2>
                    Featured Products
                </h2>

                <p className="loading">
                    Loading Products...
                </p>

            </section>
        );

    }

    return (

        <section className="featured-products">

            <h2>
                Featured Products
            </h2>

            <div className="products-grid">

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );
}

export default FeaturedProducts;