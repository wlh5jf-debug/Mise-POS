import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import POS from "./pages/POS";
import Admin from "./pages/Admin";
import EditMenuItem from "./pages/EditMenuItem";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />

        <Route
          path="/pos"
          element={
            <ProtectedRoute>
              <Header />
              <Sidebar />
              <POS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Header />
              <Sidebar />
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <Header />
              <Sidebar />
              <EditMenuItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
