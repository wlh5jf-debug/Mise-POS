import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styling/variables.css";
import "./styling/pos.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </AuthProvider>
  </StrictMode>
);