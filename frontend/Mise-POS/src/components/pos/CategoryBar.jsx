import { useMenu } from "../../hooks/useMenu";

export default function CategoryBar() {
  const { categories, activeCategory, setActiveCategory, loading, error } = useMenu();

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={cat.id === activeCategory ? "active" : ""}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}