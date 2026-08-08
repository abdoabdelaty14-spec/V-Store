import Navbar from "../../components/Navbar/Navbar";

import ProductCard from "../../components/FeaturedProducts/ProductCard";

import { useWishlist } from "../../context/WishlistContext";

function Wishlist(){

    const {wishlist}=useWishlist();

    return(

        <>

        <Navbar/>

        <div className="products-page">

            <h1>

                Wishlist

            </h1>

            <div className="products-grid">

                {

                    wishlist.map(product=>(

                        <ProductCard

                        key={product.id}

                        product={product}

                        />

                    ))

                }

            </div>

        </div>

        </>

    )

}

export default Wishlist;