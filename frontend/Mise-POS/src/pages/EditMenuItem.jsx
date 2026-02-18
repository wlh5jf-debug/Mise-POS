import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMenuItemById, updateMenuItem } from "../api/menuItems";
import { getCategories } from "../api/categories";

export default function EditMenuItem() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", price: "", categoryId: "" });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate("/"); return; }
        if (user.role_id !== 1) { navigate("/pos"); return; }
    }, [user, navigate]);

    useEffect(() => {
        if (!user || user.role_id !== 1) return;
        async function load() {
            try {
                const item = await getMenuItemById(id);
                const cats = await getCategories();
                setForm({
                    name: item.name,
                    price: (item.price / 100).toFixed(2),
                    categoryId: item.category_id,
                });
                setCategories(cats);
            } catch {
                setError("Failed to load item");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id, user]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateMenuItem(id, {
                name: form.name,
                price: Math.round(form.price * 100),
                categoryId: form.categoryId,
            }, user.token);
            navigate("/admin");
        } catch {
            setError("Failed to save changes");
        }
    }

    if (!user || user.role_id !== 1) return null;
    if (loading) return <p>Loading...</p>;

    return (
        <div className="admin-page">
            <header>
                <h1>Edit Menu Item</h1>
            </header>

            <div className="admin-sections">
                <section>
                    <button className="admin-back-btn" onClick={() => navigate("/admin")}>
                        ← Back to Menu
                    </button>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSubmit} className="edit-form">
                        <label>
                            Name
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </label>

                        <label>
                            Price ($)
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                required
                            />
                        </label>

                        <label>
                            Category
                            <select
                                value={form.categoryId}
                                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </label>

                        <button type="submit">Save Changes</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
