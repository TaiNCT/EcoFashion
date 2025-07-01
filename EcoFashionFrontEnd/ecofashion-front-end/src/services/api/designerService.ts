// Designer service - specialized for designer operations
import { apiClient, handleApiResponse, handleApiError } from "./baseApi";
import type { BaseApiResponse } from "./baseApi";

// Types for designer operations
export interface DesignerProfile {
  designerId: string;
  userId: number;
  designerName: string;
  portfolioUrl?: string;
  bannerUrl?: string;
  specializationUrl?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  taxNumber?: string;
  identificationNumber?: string;
  identificationPicture?: string;
  identificationPictureOwner?: string;
  status?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDesignerRequest {
  designerName: string;
  portfolioUrl?: string;
  bannerUrl?: string;
  specializationUrl?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  taxNumber?: string;
  identificationNumber?: string;
  identificationPicture?: string;
  identificationPictureOwner?: string;
}

export interface UpdateDesignerRequest extends Partial<CreateDesignerRequest> {
  designerId: string;
}

export interface DesignerResponse {
  designer: DesignerProfile;
}

export interface DesignerListResponse {
  designers: DesignerProfile[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Designer Service
 * Handles all designer-related API calls
 */
export class DesignerService {
  /**
   * Get current user's designer profile
   */
  static async getDesignerProfile(): Promise<DesignerProfile> {
    try {
      const response = await apiClient.get<BaseApiResponse<DesignerResponse>>(
        "/Designer/profile"
      );
      const data = handleApiResponse(response);

      return data.designer;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get designer profile by designer ID
   */
  static async getDesignerById(designerId: string): Promise<DesignerProfile> {
    try {
      const response = await apiClient.get<BaseApiResponse<DesignerResponse>>(
        `/Designer/${designerId}`
      );
      const data = handleApiResponse(response);

      return data.designer;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Create new designer profile
   */
  static async createDesignerProfile(
    profileData: CreateDesignerRequest
  ): Promise<DesignerProfile> {
    try {
      const response = await apiClient.post<BaseApiResponse<DesignerResponse>>(
        "/Designer/create",
        profileData
      );
      const data = handleApiResponse(response);

      return data.designer;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update current user's designer profile
   */
  static async updateDesignerProfile(
    profileData: Partial<DesignerProfile>
  ): Promise<DesignerProfile> {
    try {
      const response = await apiClient.put<BaseApiResponse<DesignerResponse>>(
        "/Designer/profile",
        profileData
      );
      const data = handleApiResponse(response);

      return data.designer;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Delete designer profile
   */
  static async deleteDesignerProfile(designerId: string): Promise<void> {
    try {
      await apiClient.delete(`/Designer/delete/${designerId}`);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get all designers with pagination
   */
  static async getAllDesigners(
    page: number = 1,
    pageSize: number = 10,
    search?: string
  ): Promise<DesignerListResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      const response = await apiClient.get<
        BaseApiResponse<DesignerListResponse>
      >(`/Designer/list?${params.toString()}`);

      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Upload designer document image
   */
  static async uploadDesignerImage(
    designerId: string,
    imageFile: File,
    imageType: "identification" | "owner" | "banner"
  ): Promise<{ imageUrl: string }> {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("imageType", imageType);

      const response = await apiClient.post<
        BaseApiResponse<{ imageUrl: string }>
      >(`/Designer/upload-image/${designerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Update designer status (Admin only)
   */
  static async updateDesignerStatus(
    designerId: string,
    status: "Active" | "Inactive" | "Pending" | "Rejected"
  ): Promise<DesignerProfile> {
    try {
      const response = await apiClient.patch<BaseApiResponse<DesignerResponse>>(
        `/Designer/status/${designerId}`,
        { status }
      );
      const data = handleApiResponse(response);

      return data.designer;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Get designer statistics (for admin dashboard)
   */
  static async getDesignerStats(): Promise<{
    totalDesigners: number;
    activeDesigners: number;
    pendingDesigners: number;
    rejectedDesigners: number;
  }> {
    try {
      const response = await apiClient.get<
        BaseApiResponse<{
          totalDesigners: number;
          activeDesigners: number;
          pendingDesigners: number;
          rejectedDesigners: number;
        }>
      >("/Designer/statistics");

      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export default DesignerService;
