import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../services/productService";
import ProductCard from "../FeaturedProducts/ProductCard";
import "./RelatedProducts.css";

function RelatedProducts({ category, currentProductId }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function loadProducts() {

            const data = await getProductsByCategory(category);

            const filtered = data.filter(
                (item) => item.id !== currentProductId
            );

            setProducts(filtered);

        }

        if (category) {
            loadProducts();
        }

    }, [category, currentProductId]);

    return (

        <section className="related-products">

            <h2>Related Products</h2>

            <div className="related-grid">

                {products.slice(0,4).map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );

}

export default RelatedProducts;