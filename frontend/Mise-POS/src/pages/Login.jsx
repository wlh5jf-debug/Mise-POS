import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Pinpad from "../components/auth/Pinpad";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(name, pin);
      navigate("/pos");
    } catch (err) {
      setError(err.message || "Invalid name or PIN");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <h1>Mise POS</h1>

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Pinpad value={pin} onChange={setPin} />

        {error && <p className="error">{error}</p>}

        <Button type="submit" disabled={loading || pin.length === 0}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}