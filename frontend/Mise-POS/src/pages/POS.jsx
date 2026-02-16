import { useState } from "react";
import {useNavigate} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";

import TableGrid from "../components/pos/TableGrid";
import CategoryBar from "../components/pos/CategoryBar";
import MenuGrid from "../components/pos/MenuGrid";
import OrderPanel from "../components/pos/OrderPanel";

export default function POS(){
    const { user, logout } = useAuth();
    const {order, startOrder} = useOrder();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    if (!user) {
        navigate("/") 
        return null;
    }

    return (
        <div className="pos-page">
            <header className="pos-header">
                <h2>POS Terminal</h2>
                <div>
                    <span>{user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>
            <div className="pos-layout">
                {!order && (
                    <TableGrid onSelectTable={(tableId) => startOrder(tableId)} />
                )}
                {order && (
                    <div className="menu-section">
                        <CategoryBar    
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                        <MenuGrid categoryId={selectedCategory} />      
                    </div>
                )}
                {order && (
                    <OrderPanel onCheckout={() => setShowPayment(true)} />
                )}
            </div>
            {showPayment && (
                <PaymentModal onClose={() => setShowPayment(false)} />
            )}
        </div>
    );       
}


