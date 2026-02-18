import { useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import { useMenu } from "../../hooks/useMenu";

export default function MenuGrid({ categoryId, onAdd }) {
    const { items, loading, error, setActiveCategory } = useMenu();

    useEffect(() => {
        if (categoryId) setActiveCategory(categoryId);
    }, [categoryId]);

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="menu-grid">
            {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
            ))}
        </div>
    );
}
