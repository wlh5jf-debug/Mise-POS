import { createContext, useContext, useState} from "react";

import {
    createOrder,
    getOrderItems,
    addItemToOrder,
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

    async function startOrder(tableId) {
        if (!user) throw new Error("Must be logged in to start order");
        setLoading(true);
        try {
            const newOrder = await createOrder(tableId, user.id);
            setOrder(newOrder);
            const orderItems = await getOrderItems(newOrder.id);
            setItems(orderItems);
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