import { createContext, useContext, useState, useEffect } from "react";

import {
    createOrder,
    getOrderItems,
    addItemToOrder,
    getActiveOrder,
    updateOrderItemQuantity,
    removeOrderItem,
    closeOrder,
} from "../api/orders";

import { useAuth } from "./AuthContext";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            setOrder(null);
            setItems([]);
        }
    }, [user]);


async function startOrder(tableId) {
    if (!user) throw new Error("Must be logged in");

    setLoading(true);
    try {
        // 1️⃣ Ask backend: is there already an open order?
        let order = await getActiveOrder(tableId);

        // 2️⃣ If not, create one
        if (!order) {
            const result = await createOrder(tableId, user.token);
            if (result && result.conflict) {
                alert("This table already has an open order. Please select another table or close the current order first.");
                setLoading(false);
                return;
            }
            order = result;
        }

        // 3️⃣ If STILL no order, something is wrong
        if (!order) {
            alert(
                "Could not create or find an open order for this table. " +
                "Please check backend data."
            );
            return;
        }

        // 4️⃣ Set order + items
        setOrder(order);
        const orderItems = await getOrderItems(order.id);
        setItems(orderItems);
    } catch (err) {
        console.error(err);
        alert("Unexpected error starting order");
    } finally {
        setLoading(false);
    }
}


    async function addItem(menuItem) {
        if (!order) throw new Error("No active order");
        const item = await addItemToOrder(
            order.id,
            menuItem.id,
            1,
            menuItem.price
        );
        setItems((prev) => [...prev, item]);
    }

    async function updateQuantity(orderItemId, quantity) {
        const updated = await updateOrderItemQuantity(orderItemId, quantity);
        setItems((prev) =>
            prev.map((item) =>
                item.id === orderItemId ? updated : item
            )
        );
    }

    async function removeItem(orderItemId) {
        await removeOrderItem(orderItemId);
        setItems((prev) =>
            prev.filter((item) => item.id !== orderItemId)
        );
    }   

    function leaveOrder() {
        setOrder(null);
        setItems([]);
    }

    async function closeCurrentOrder() {
        if (!order) throw new Error("No active order");
        await closeOrder(order.id);
        setOrder(null);
        setItems([]);
    }

    const value = {
        order,
        items,
        loading,
        startOrder,
        addItem,
        updateQuantity,
        removeItem,
        leaveOrder,
        closeCurrentOrder,
    };


    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}   



export function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider");
    }   
    return context;
}