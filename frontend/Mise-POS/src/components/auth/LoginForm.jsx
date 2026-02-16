import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(firstName, pin);
            navigate("/pos");
        } catch (error) {
            setError(error.message || "Invalid name or PIN");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Mise POS</h1>

            <Input
            placeholder="Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            />
            <Input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            />

            {error && <p className="error">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </form>
    )

}