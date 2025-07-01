import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepages from "./pages/Homepages";
import About from "./pages/About";
import FooterInfo from "./pages/FooterInfo";
import Signup from "./pages/Signup";
import VerifyOTP from "./components/VerifyOTP";
import DesignerProfile from "./pages/designer/DesignerProfile";
import SupplierProfile from "./pages/supplier/SupplierProfile";
import CustomerProfile from "./pages/customer/CustomerProfile";
import Dashboard from "./pages/admin/Dashboard";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./services/user/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ApplyDesigner from "./pages/apply/ApplyDesigner";
import ApplySupplier from "./pages/apply/ApplySupplier";
import MyApplications from "./pages/apply/MyApplications";

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Application Routes */}
          <Route
            path="/apply/designer"
            element={
              <ProtectedRoute allowedRoles={["customer", "user", "supplier"]}>
                <ApplyDesigner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply/supplier"
            element={
              <ProtectedRoute allowedRoles={["customer", "user", "designer"]}>
                <ApplySupplier />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute
                allowedRoles={["customer", "user", "designer", "supplier"]}
              >
                <MyApplications />
              </ProtectedRoute>
            }
          />

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
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ApplicationManagement />
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
