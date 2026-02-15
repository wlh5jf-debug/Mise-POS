import { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories";
import { fetchMenuItemsByCategory } from "../api/menuItems";

export function useMenu() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setActiveCategory(data[0].id); 
        }
      } catch (err) {
        setError(err.message || "Failed to load categories");
      }
    }

    loadCategories();
  }, []); 

  
  useEffect(() => {
    if (!activeCategory) return;

    async function loadItems() {
      try {
        setLoading(true);
        const data = await fetchMenuItemsByCategory(activeCategory);
        setItems(data);
      } catch (err) {
        setError(err.message || "Failed to load menu items");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [activeCategory]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    items,
    loading,
    error,
  };
}
