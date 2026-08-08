import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import NotFound from "./pages/NotFound/NotFound";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
function App() {

    return (
       <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {
              <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/products"
                element={<Products />}
            />

            <Route
                path="/product/:id"
                element={<ProductDetails />}
            />

            <Route
                path="/cart"
                element={<Cart />}
            />

            <Route
                path="/checkout"
                element={<Checkout />}
            />

            <Route
                path="/orders"
                element={<Orders />}
            />

            <Route
                path="/wishlist"
                element={<Wishlist />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

        </Routes>
        }
        </>
        

    );
}

export default App;