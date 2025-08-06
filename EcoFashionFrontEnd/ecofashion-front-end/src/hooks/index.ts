// React Query Hooks Index
// Centralized exports for all React Query hooks

// ===== Auth & Profile Management Hooks =====
export {
  // Supplier hooks
  useSupplierProfile,
  useUpdateSupplierProfile,
  useSupplierPublicProfile,
  usePublicSuppliers,
  useFeaturedSuppliers,
  
  // Designer hooks
  useDesignerProfile,
  useUpdateDesignerProfile,
  useDesignerPublicProfile,
  usePublicDesigners,
  useFeaturedDesigners,
  
  // Designer-Supplier connection hooks
  useFollowSupplier,
  useUnfollowSupplier,
  useFollowedSuppliers,
} from "./useAuthQueryHooks"; 