import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState([]);


    const getCurrentUser = () => {

        const user =
            localStorage.getItem("currentUser");

        return user
            ? JSON.parse(user)
            : null;
    };


    // Load wishlist
    useEffect(() => {

        const user = getCurrentUser();

        if (!user) {

            setWishlist([]);

            return;
        }

        const userWishlist =
            localStorage.getItem(
                `wishlist_${user.email}`
            );

        setWishlist(
            userWishlist
                ? JSON.parse(userWishlist)
                : []
        );

    }, []);


    // Save wishlist
    useEffect(() => {

        const user = getCurrentUser();

        if (!user) {
            return;
        }

        localStorage.setItem(
            `wishlist_${user.email}`,
            JSON.stringify(wishlist)
        );

    }, [wishlist]);


    // Add
    const addToWishlist = (product) => {

        const exist = wishlist.find(
            item => item.id === product.id
        );

        if (!exist) {

            setWishlist([
                ...wishlist,
                product
            ]);

        }

    };


    // Remove
    const removeFromWishlist = (id) => {

        setWishlist(
            wishlist.filter(
                item => item.id !== id
            )
        );

    };


    // Check
    const isInWishlist = (id) => {

        return wishlist.some(
            item => item.id === id
        );

    };


    return (

        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist
            }}
        >

            {children}

        </WishlistContext.Provider>

    );
}