import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import POS from "./pages/POS";
import Admin from "./pages/Admin";

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import ProtectedRoute from "./layout/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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

     
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}