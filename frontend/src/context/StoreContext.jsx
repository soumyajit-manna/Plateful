import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://tomato-backend-skqy.onrender.com"
    const [food_list, setFoodList] = useState([]);
    const [foodListLoaded, setFoodListLoaded] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false)
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    totalAmount += itemInfo.price * cartItems[item];
                }
            } catch (error) {

            }

        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data)
        } finally {
            setFoodListLoaded(true)
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            const storedToken = localStorage.getItem("token")
            const initialRequests = [fetchFoodList()]

            if (storedToken) {
                setToken(storedToken)
                initialRequests.push(loadCartData({ token: storedToken }))
            }

            const results = await Promise.allSettled(initialRequests)
            results.forEach((result) => {
                if (result.status === 'rejected') {
                    console.error('Could not load initial app data:', result.reason)
                }
            })
            setIsInitialDataLoaded(true)
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        foodListLoaded,
        isInitialDataLoaded,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
