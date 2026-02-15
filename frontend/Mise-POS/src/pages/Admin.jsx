import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Admin() {
    const { user } = useAuth();
    const navigate = useNavigate();
 
    useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user.role_id !== 1) {
      navigate("/pos");
    }
  }, [user, navigate]);

  if (!user || user.role_id !== 1) return null;

  return (
    <div className="admin-page">
        <header>
            <h1>Manager Panel</h1>
            <p>Welcome, {user.name}</p>
        </header>

        <div className="admin-sections">
            <section>
                <h2>Categories</h2>
            </section>
        </div>
    </div>
  )


}