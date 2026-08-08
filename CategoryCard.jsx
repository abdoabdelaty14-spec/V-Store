import "./CategoryCard.css";
import { motion } from "framer-motion";

function CategoryCard({category}) {

    return (

        <motion.div
        className="category-card"
        whileHover={{scale:1.05}}
        >

            <img
            src={category.image}
            alt={category.name}
            />

            <div className="overlay">

                <h3>{category.name}</h3>

                <p>{category.products} Products</p>

            </div>

        </motion.div>

    );

}

export default CategoryCard;