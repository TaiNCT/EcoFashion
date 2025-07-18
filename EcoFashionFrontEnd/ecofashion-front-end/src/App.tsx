import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import "react-toastify/dist/ReactToastify.css";

//Pages
import Homepages from "./pages/Homepages";

import About from "./pages/About";
import FooterInfo from "./pages/FooterInfo";
import DesignDetail from "./pages/design/DesignDetail";
import Login from "./pages/Login";
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
import BusinessInfor from "./pages/BusinessInfor";
import Contact from "./pages/Contact";
import DesginerDashboared from "./pages/designer/DesignerDashboard";
import ApplyDesigner from "./pages/apply/ApplyDesigner";
import ApplySupplier from "./pages/apply/ApplySupplier";
import MyApplications from "./pages/apply/MyApplications";
import ExploreDesigners from "./pages/explore/ExploreDesigners";
import DesignerLandingPage from "./pages/explore/DesignerLandingPage";
import ExploreSuppliers from "./pages/explore/ExploreSuppliers";
import SupplierLandingPage from "./pages/explore/SupplierLandingPage";
import TestAuth from "./pages/TestAuth";
import FashionList from "./pages/design/FashionList";
import DesingBrandProfile from "./pages/design/DesignBrandProfile";
import AddDesign from "./pages/design/AddDesign";
function App() {
  const location = useLocation();
  // Hide Nav and Footer on these routes
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <AuthContextProvider>
      <div className="app">
        {!hideLayout && <Navigation />}
        <Routes>
          <Route path="/" element={<Homepages />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<DesignDetail />} />
          <Route path="/businessinfor" element={<BusinessInfor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/fashion" element={<FashionList />} />

          {/* TEST ROUTE - Remove in production */}
          <Route path="/test-auth" element={<TestAuth />} />

          {/* NEW APPLICATION ROUTES - Updated multi-step forms */}
          <Route path="/brand/:id" element={<DesingBrandProfile />} />
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
          {/* Designer Profile */}
          <Route
            path="/designer/profile"
            element={
              <ProtectedRoute allowedRoles={["designer"]}>
                <DesignerProfile />
              </ProtectedRoute>
            }
          />
          {/* Add New Design */}
          <Route
            path="/designer/dashboard/add"
            element={
              <ProtectedRoute allowedRoles={["designer"]}>
                <AddDesign />
              </ProtectedRoute>
            }
          />
          {/* Designer Dashboard */}
          <Route
            path="/designer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["designer"]}>
                <DesginerDashboared />
              </ProtectedRoute>
            }
          />

          {/* EXPLORE ROUTES - Public access */}
          <Route path="/explore/designers" element={<ExploreDesigners />} />
          <Route
            path="/explore/designers/:id"
            element={<DesignerLandingPage />}
          />
          <Route path="/explore/suppliers" element={<ExploreSuppliers />} />
          <Route
            path="/explore/suppliers/:id"
            element={<SupplierLandingPage />}
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
        {!hideLayout && <FooterInfo />}
        <ToastContainer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
