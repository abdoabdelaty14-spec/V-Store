import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const savedUser =
            localStorage.getItem("currentUser");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    const [users, setUsers] = useState(() => {

        const savedUsers =
            localStorage.getItem("users");

        return savedUsers
            ? JSON.parse(savedUsers)
            : [];
    });


    // Save users
    useEffect(() => {

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }, [users]);


    // Save current user
    useEffect(() => {

        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

        } else {

            localStorage.removeItem(
                "currentUser"
            );

        }

    }, [user]);


    // =========================
    // Register
    // =========================

    const register = (
    username,
    email,
    password,
    recoveryPin
    ) => {

        const existingUser = users.find(
            (item) =>
                item.email.toLowerCase() ===
                email.toLowerCase()
        );

        if (existingUser) {
            return {
                success: false,
                message: "Email already exists"
            };
        }

        if (!/^\d{4}$/.test(recoveryPin)) {
            return {
                success: false,
                message: "Recovery PIN must be 4 digits"
            };
        }

        const newUser = {
            id: Date.now(),
            username,
            email,
            password,
            recoveryPin
        };

        setUsers((prevUsers) => [
            ...prevUsers,
            newUser
        ]);

        setUser(newUser);

        window.dispatchEvent(
            new Event("userChanged")
        );

        return {
            success: true,
            message: "Account created successfully"
        };
    };

    // =========================
    // Login
    // =========================

    const login = (
        email,
        password
    ) => {

        const foundUser = users.find(
            (item) =>
                item.email.toLowerCase() ===
                    email.toLowerCase() &&
                item.password === password
        );


        if (!foundUser) {

            return {

                success: false,

                message:
                    "Invalid email or password"

            };

        }


        setUser(foundUser);


        // Notify other contexts
        window.dispatchEvent(
            new Event("userChanged")
        );


        return {

            success: true,

            message:
                "Login successful"

        };

    };


    // =========================
    // Logout
    // =========================

    const logout = () => {

        setUser(null);


        // Notify other contexts
        window.dispatchEvent(
            new Event("userChanged")
        );

    };


    return (

        <AuthContext.Provider
            value={{

                user,

                users,

                register,

                login,

                logout,

                isLoggedIn: !!user

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(AuthContext);

}
