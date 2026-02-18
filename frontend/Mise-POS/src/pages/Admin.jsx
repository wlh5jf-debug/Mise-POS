import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCategories, createCategory } from "../api/categories";
import {
    getMenuItems,
    createMenuItem,
    deleteMenuItem,
    setMenuItemAvailability,
} from "../api/menuItems";
import { getTables, createTable, deleteTable } from "../api/tables";
import { getActiveUsers, createUser, deactivateUser } from "../api/users";
import { getRoles } from "../api/roles";

export default function Admin() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", price: "", categoryId: "" });
    const [showNewForm, setShowNewForm] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ table_number: "", capacity: "" });
    const [showTableForm, setShowTableForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", roleId: "", pin: "", confirmPin: "" });
    const [showUserForm, setShowUserForm] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) { navigate("/"); return; }
        if (user.role_id !== 1) { navigate("/pos"); return; }
    }, [user, navigate]);

    useEffect(() => {
        if (!user || user.role_id !== 1) return;
        async function load() {
            try {
                const categories = await getCategories();
                setCategories(categories);
                const items = await getMenuItems();
                setItems(items);
                const tables = await getTables();
                setTables(tables);
                const users = await getActiveUsers();
                setUsers(users);
                const roles = await getRoles();
                setRoles(roles);
            } catch {
                setError("Failed to load data");
            }
        }
        load();
    }, [user]);

    if (!user || user.role_id !== 1) return null;

    async function toggleAvailability(item) {
        try {
            const updated = await setMenuItemAvailability(item.id, !item.available, user.token);
            setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, available: updated.available } : i)));
        } catch {
            setError("Failed to update availability");
        }
    }

    async function handleDelete(id) {
        if (!confirm("Delete this menu item?")) return;
        try {
            await deleteMenuItem(id, user.token);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch {
            setError("Failed to delete item");
        }
    }

    async function handleCreate(e) {
        e.preventDefault();
        try {
            const created = await createMenuItem({
                name: newItem.name,
                price: Math.round(parseFloat(newItem.price) * 100),
                categoryId: newItem.categoryId,
            }, user.token);
            setItems((prev) => [...prev, created]);
            setNewItem({ name: "", price: "", categoryId: "" });
            setShowNewForm(false);
        } catch {
            setError("Failed to create item");
        }
    }

    async function handleCreateCategory(e) {
        e.preventDefault();
        try {
            const created = await createCategory(newCategoryName, user.token);
            setCategories((prev) => [...prev, created]);
            setNewCategoryName("");
            setShowCategoryForm(false);
        } catch {
            setError("Failed to create category");
        }
    }

    async function handleCreateTable(e) {
        e.preventDefault();
        try {
            const created = await createTable(
                parseInt(newTable.table_number),
                parseInt(newTable.capacity),
                user.token
            );
            setTables((prev) => [...prev, created]);
            setNewTable({ table_number: "", capacity: "" });
            setShowTableForm(false);
        } catch {
            setError("Failed to create table");
        }
    }

    async function handleDeleteTable(id) {
        if (!confirm("Delete this table?")) return;
        try {
            await deleteTable(id, user.token);
            setTables((prev) => prev.filter((t) => t.id !== id));
        } catch {
            setError("Failed to delete table");
        }
    }

    async function handleCreateUser(e) {
        e.preventDefault();
        if (newUser.pin !== newUser.confirmPin) {
            setError("PINs do not match");
            return;
        }
        try {
            const created = await createUser({
                name: newUser.name,
                roleId: parseInt(newUser.roleId),
                pin: newUser.pin,
            }, user.token);
            setUsers((prev) => [...prev, created]);
            setNewUser({ name: "", roleId: "", pin: "", confirmPin: "" });
            setShowUserForm(false);
            setError(null);
        } catch {
            setError("Failed to create user");
        }
    }

    async function handleDeactivateUser(id) {
        if (!confirm("Deactivate this user? They will no longer be able to log in.")) return;
        try {
            await deactivateUser(id, user.token);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch {
            setError("Failed to deactivate user");
        }
    }

    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

    return (
        <div className="admin-page">
            <header>
                <h1>Manager Panel</h1>
                <p>Welcome, {user.name}</p>
            </header>

            <div className="admin-sections">
                <section>
                    <div className="admin-section-header">
                        <h2>Menu Items</h2>
                        <button onClick={() => setShowNewForm((v) => !v)}>
                            {showNewForm ? "Cancel" : "+ Add Item"}
                        </button>
                    </div>

                    {error && <p className="error">{error}</p>}

                    {showNewForm && (
                        <form onSubmit={handleCreate} className="admin-inline-form">
                            <input
                                placeholder="Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Price ($)"
                                type="number"
                                step="0.01"
                                min="0"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                required
                            />
                            <select
                                value={newItem.categoryId}
                                onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                                required
                            >
                                <option value="">Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <button type="submit">Save</button>
                        </form>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th className="col-right">Price</th>
                                <th className="col-center">Available</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{categoryMap[item.category_id] ?? "—"}</td>
                                    <td className="col-right">${(item.price / 100).toFixed(2)}</td>
                                    <td className="col-center">
                                        <button onClick={() => toggleAvailability(item)}>
                                            {item.available ? "✓ On" : "✗ Off"}
                                        </button>
                                    </td>
                                    <td className="col-actions">
                                        <button onClick={() => navigate(`/admin/edit/${item.id}`)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <div className="admin-section-header">
                        <h2>Categories</h2>
                        <button onClick={() => setShowCategoryForm((v) => !v)}>
                            {showCategoryForm ? "Cancel" : "+ Add Category"}
                        </button>
                    </div>

                    {showCategoryForm && (
                        <form onSubmit={handleCreateCategory} className="admin-inline-form">
                            <input
                                placeholder="Category name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                            <button type="submit">Save</button>
                        </form>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <div className="admin-section-header">
                        <h2>Tables</h2>
                        <button onClick={() => setShowTableForm((v) => !v)}>
                            {showTableForm ? "Cancel" : "+ Add Table"}
                        </button>
                    </div>

                    {showTableForm && (
                        <form onSubmit={handleCreateTable} className="admin-inline-form">
                            <input
                                placeholder="Table number"
                                type="number"
                                min="1"
                                value={newTable.table_number}
                                onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Capacity"
                                type="number"
                                min="1"
                                value={newTable.capacity}
                                onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                                required
                            />
                            <button type="submit">Save</button>
                        </form>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Table #</th>
                                <th>Capacity</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((t) => (
                                <tr key={t.id}>
                                    <td>Table {t.table_number}</td>
                                    <td>{t.capacity} seats</td>
                                    <td className="col-actions">
                                        <button onClick={() => handleDeleteTable(t.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section>
                    <div className="admin-section-header">
                        <h2>Staff</h2>
                        <button onClick={() => { setShowUserForm((v) => !v); setError(null); }}>
                            {showUserForm ? "Cancel" : "+ Add User"}
                        </button>
                    </div>

                    {showUserForm && (
                        <form onSubmit={handleCreateUser} className="admin-inline-form admin-user-form">
                            <input
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                required
                            />
                            <select
                                value={newUser.roleId}
                                onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
                                required
                            >
                                <option value="">Role</option>
                                {roles.map((r) => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>
                            <input
                                placeholder="PIN"
                                type="password"
                                inputMode="numeric"
                                maxLength={8}
                                value={newUser.pin}
                                onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Confirm PIN"
                                type="password"
                                inputMode="numeric"
                                maxLength={8}
                                value={newUser.confirmPin}
                                onChange={(e) => setNewUser({ ...newUser, confirmPin: e.target.value })}
                                required
                            />
                            <button type="submit">Save</button>
                        </form>
                    )}

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{roles.find((r) => r.id === u.role_id)?.name ?? "—"}</td>
                                    <td className="col-actions">
                                        <button
                                            onClick={() => handleDeactivateUser(u.id)}
                                            disabled={u.id === user.id}
                                        >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}
