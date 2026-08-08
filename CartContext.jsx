import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    // Get current user
    const getCurrentUser = () => {

        const user = localStorage.getItem("currentUser");

        return user
            ? JSON.parse(user)
            : null;
    };


    // Load cart for current user
    useEffect(() => {

        const user = getCurrentUser();

        if (!user) {
            setCart([]);
            return;
        }

        const userCart = localStorage.getItem(
            `cart_${user.email}`
        );

        setCart(
            userCart
                ? JSON.parse(userCart)
                : []
        );

    }, []);


    // Save cart
    useEffect(() => {

        const user = getCurrentUser();

        if (!user) {
            return;
        }

        localStorage.setItem(
            `cart_${user.email}`,
            JSON.stringify(cart)
        );

    }, [cart]);


    // Add Product
    const addToCart = (product) => {

        const exist = cart.find(
            item => item.id === product.id
        );

        if (exist) {

            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + 1
                        }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);

        }
    };


    // Remove Product
    const removeFromCart = (id) => {

        setCart(
            cart.filter(
                item => item.id !== id
            )
        );

    };


    // Increase Quantity
    const increaseQuantity = (id) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item
            )
        );

    };


    // Decrease Quantity
    const decreaseQuantity = (id) => {

        setCart(
            cart
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item
                )
                .filter(
                    item => item.quantity > 0
                )
        );

    };


    // Clear Cart
    const clearCart = () => {
        setCart([]);
    };


    // Total Price
    const totalPrice = cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );


    // Total Items
    const totalItems = cart.reduce(
        (total, item) =>
            total +
            item.quantity,
        0
    );


    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalPrice,
                totalItems
            }}
        >

            {children}

        </CartContext.Provider>

    );
}