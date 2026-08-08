import { useNavigate } from "react-router-dom";

import "./Categories.css";

import accessories from "../../assets/images/accessories.jpg";
import electronics from "../../assets/images/electronics.jpg";
import fashion from "../../assets/images/fashion.jpg";
import furniture from "../../assets/images/furniture.jpg";
import shoes from "../../assets/images/shoes.jpg";
import watches from "../../assets/images/watches.jpg";

const categories = [
    {
        name: "Fashion",
        image: fashion,
        category: "fashion"
    },
    {
        name: "Accessories",
        image: accessories,
        category: "accessories"
    },
    {
        name: "Electronics",
        image: electronics,
        category: "electronics"
    },
    {
        name: "Furniture",
        image: furniture,
        category: "furniture"
    },
    {
        name: "Shoes",
        image: shoes,
        category: "shoes"
    },
    {
        name: "Watches",
        image: watches,
        category: "watches"
    }
];

function Category() {

    const navigate = useNavigate();

    const handleCategory = (category) => {
        navigate(`/products?category=${category}`);
    };

    return (
        <section
            className="categories-section"
            id="categories"
        >

            <div className="categories-header">

                <span>
                    SHOP BY CATEGORY
                </span>

                <h2>
                    Explore Our Categories
                </h2>

                <p>
                    Discover products from our most popular
                    categories.
                </p>

            </div>


            <div className="categories-grid">

                {categories.map((item) => (

                    <button
                        key={item.category}
                        className="category-card"
                        onClick={() =>
                            handleCategory(item.category)
                        }
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            className="category-image"
                        />

                        <div className="category-overlay">

                            <h3>
                                {item.name}
                            </h3>

                            <span>
                                Explore →
                            </span>

                        </div>

                    </button>

                ))}

            </div>

        </section>
    );
}

export default Category;