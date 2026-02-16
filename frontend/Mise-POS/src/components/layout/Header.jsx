import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>Mise POS</h1>

      {user && (
        <div className="header-user">
          <span>{user.name}</span>
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </header>
  );
}