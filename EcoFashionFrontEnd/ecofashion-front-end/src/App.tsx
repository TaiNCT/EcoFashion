import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Homepages from "./pages/Homepages";
import About from "./pages/About";
import FooterInfo from "./pages/FooterInfo";
import Register from "./pages/Register";
import DesignerProfile from "./pages/designer/DesignerProfile";
import SupplierProfile from "./pages/supplier/SupplierProfile";
import CustomerProfile from "./pages/customer/CustomerProfile";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./services/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Designer Routes */}
          <Route
            path="/designer/profile"
            element={
              <ProtectedRoute allowedRoles={["designer"]}>
                <DesignerProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Supplier Routes */}
          <Route
            path="/supplier/profile"
            element={
              <ProtectedRoute allowedRoles={["supplier"]}>
                <SupplierProfile />
              </ProtectedRoute>
            }
          />

          {/* Customer Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer", "user"]}>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <FooterInfo />
        <ToastContainer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
