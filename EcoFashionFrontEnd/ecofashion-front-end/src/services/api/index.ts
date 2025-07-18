// API Services Index
// Export all services from a single entry point

// Core API utilities
export { apiClient, ApiError } from "./baseApi";
export type { BaseApiResponse } from "./baseApi";

// Authentication service
export { AuthService } from "./authService";
export type {
  LoginRequest,
  SignupRequest,
  VerifyOTPRequest,
  ResendOTPRequest,
  User,
  AuthResponse,
  SignupResponse,
  OTPResponse,
} from "./authService";

// Designer service
export { DesignerService } from "./designerService";
export type {
  DesignerProfile,
  CreateDesignerRequest,
  UpdateDesignerRequest,
  DesignerResponse,
  DesignerListResponse,
} from "./designerService";

// Import for re-export
import { AuthService } from "./authService";
import { DesignerService } from "./designerService";
import { DesignService } from "./designService";
import { apiClient } from "./baseApi";

// Re-export for backward compatibility with existing code
export const authApi = {
  login: AuthService.login.bind(AuthService),
  register: AuthService.signup.bind(AuthService),
  verifyOTP: AuthService.verifyOTP.bind(AuthService),
  resendOTP: AuthService.resendOTP.bind(AuthService),
  logout: AuthService.logout.bind(AuthService),
  getCurrentUser: AuthService.getCurrentUser.bind(AuthService),
  isAuthenticated: AuthService.isAuthenticated.bind(AuthService),
  getToken: AuthService.getToken.bind(AuthService),
};

// Designer API object
export const designerApi = {
  getProfile: DesignerService.getDesignerProfile.bind(DesignerService),
  getById: DesignerService.getDesignerById.bind(DesignerService),
  create: DesignerService.createDesignerProfile.bind(DesignerService),
  update: DesignerService.updateDesignerProfile.bind(DesignerService),
  delete: DesignerService.deleteDesignerProfile.bind(DesignerService),
  getAll: DesignerService.getAllDesigners.bind(DesignerService),
  uploadImage: DesignerService.uploadDesignerImage.bind(DesignerService),
  updateStatus: DesignerService.updateDesignerStatus.bind(DesignerService),
  getStats: DesignerService.getDesignerStats.bind(DesignerService),
};

// Default export (keep existing compatibility)
export default apiClient;
