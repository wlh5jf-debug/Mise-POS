import { useState } from "react";
import {useNavigate} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";

import TableGrid from "../components/pos/TableGrid";
import CategoryBar from "../components/pos/CategoryBar";
import MenuGrid from "../components/pos/MenuGrid";
import OrderPanel from "../components/pos/OrderPanel";
import PaymentModal from "../components/pos/PaymentModal";

export default function POS(){
    const { user } = useAuth();
    const {order, items, startOrder, addItem, leaveOrder, closeCurrentOrder} = useOrder();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    if (!user) {
        navigate("/login") 
        return null;
    }

    return (
        <div className="pos-page">
            <div className="pos-layout">
                {!order && (
                    <TableGrid onSelectTable={(tableId) => startOrder(tableId)} />
                )}
                {order && (
                    <div className="menu-section">
                        <div className="menu-section-header">
                            <button onClick={leaveOrder}>← Back to Tables</button>
                            <CategoryBar
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </div>
                        <MenuGrid categoryId={selectedCategory} onAdd={addItem} />
                    </div>
                )}
                {order && (
                    <OrderPanel
                        items={items}
                        onCheckout={() => setShowPayment(true)}
                        onClear={closeCurrentOrder}
                    />
                )}
            </div>
            {showPayment && (
                <PaymentModal onClose={() => setShowPayment(false)} />
            )}
        </div>
    );       
}


