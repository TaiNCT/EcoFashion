import apiClient, { handleApiResponse } from "./baseApi";

export interface ApplyDesignerRequest {
  // Profile images for landing page
  avatarFile?: File; // Ảnh đại diện
  bannerFile?: File; // Ảnh banner/cover

  portfolioUrl?: string;
  portfolioFiles?: File[]; // Multiple portfolio files
  bannerUrl?: string; // URL trực tiếp (nếu không upload file)
  specializationUrl?: string;
  certificates?: string; // CSV or JSON string
  taxNumber?: string;
  address?: string;
  identificationPictureOwner?: string;

  // Social media links as JSON string
  socialLinks?: string; // {"instagram": "url", "behance": "url", "facebook": "url"}

  identificationNumber: string;
  identificationPictureFile?: File; // File upload thay vì URL
  note?: string;
}

export interface ApplySupplierRequest {
  // Profile images for landing page
  avatarFile?: File; // Ảnh đại diện
  bannerFile?: File; // Ảnh banner/cover

  portfolioUrl?: string;
  portfolioFiles?: File[]; // Multiple portfolio files
  bannerUrl?: string; // URL trực tiếp (nếu không upload file)
  specializationUrl?: string;
  certificates?: string; // CSV or JSON string
  taxNumber?: string;
  address?: string;
  identificationPictureOwner?: string;

  // Social media links as JSON string
  socialLinks?: string; // {"instagram": "url", "behance": "url", "facebook": "url"}

  identificationNumber: string;
  identificationPictureFile?: File; // File upload thay vì URL
  note?: string;
}

export interface ApplicationModel {
  applicationId: number;
  userId: number;
  targetRoleId: number;

  // Portfolio & Profile Images
  avatarUrl?: string;
  portfolioUrl?: string;
  portfolioFiles?: string; // JSON array of file urls
  bannerUrl?: string;
  specializationUrl?: string;
  certificates?: string;
  taxNumber?: string;
  address?: string;
  identificationPictureOwner?: string;

  // Social Media
  socialLinks?: string; // JSON object of social media links

  // Identification / Xác minh
  identificationNumber?: string;
  identificationPicture?: string;
  isIdentificationVerified?: boolean;

  //Tracking
  createdAt: string;
  processedAt?: string;

  // Kết quả xử lý
  processedBy?: number;
  rejectionReason?: string;
  note?: string;

  status: "pending" | "approved" | "rejected";

  // Navigation properties
  user?: {
    userId: number;
    fullName?: string;
    email?: string;
  };
  role?: {
    roleId: number;
    roleName: string;
  };
  processedByUser?: {
    userId: number;
    fullName?: string;
    email?: string;
  };
}

export interface ApiResult<T> {
  success: boolean; // Backend sử dụng camelCase
  result: T; // Backend sử dụng camelCase
  errorMessage?: string; // Backend sử dụng camelCase
}

class ApplicationService {
  private readonly API_BASE = "Applications";

  /**
   * Helper method to create FormData for file upload
   */
  private createFormData(
    request: ApplyDesignerRequest | ApplySupplierRequest
  ): FormData {
    const formData = new FormData();

    // Profile images
    if (request.avatarFile) {
      formData.append("AvatarFile", request.avatarFile);
    }
    if (request.bannerFile) {
      formData.append("BannerFile", request.bannerFile);
    }

    // Portfolio files (multiple)
    if (request.portfolioFiles && request.portfolioFiles.length > 0) {
      request.portfolioFiles.forEach((file) => {
        formData.append("PortfolioFiles", file);
      });
    }

    // Identification file
    if (request.identificationPictureFile) {
      formData.append(
        "IdentificationPictureFile",
        request.identificationPictureFile
      );
    }

    // Text fields
    if (request.portfolioUrl)
      formData.append("PortfolioUrl", request.portfolioUrl);
    if (request.bannerUrl) formData.append("BannerUrl", request.bannerUrl);
    if (request.specializationUrl)
      formData.append("SpecializationUrl", request.specializationUrl);
    if (request.socialLinks)
      formData.append("SocialLinks", request.socialLinks);
    if (request.identificationNumber)
      formData.append("IdentificationNumber", request.identificationNumber);
    if (request.note) formData.append("Note", request.note);

    return formData;
  }

  // User đăng ký làm Designer
  async applyAsDesigner(
    request: ApplyDesignerRequest
  ): Promise<ApplicationModel> {
    const formData = this.createFormData(request);

    const response = await apiClient.post<any>(
      `${this.API_BASE}/ApplyDesigner`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1200000, // 20 minutes for file upload
      }
    );
    return handleApiResponse<ApplicationModel>(response);
  }

  // User đăng ký làm Supplier
  async applyAsSupplier(
    request: ApplySupplierRequest
  ): Promise<ApplicationModel> {
    const formData = this.createFormData(request);

    const response = await apiClient.post<any>(
      `${this.API_BASE}/ApplySupplier`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1200000, // 20 minutes for file upload
      }
    );
    return handleApiResponse<ApplicationModel>(response);
  }

  // User xem đơn đăng ký của mình
  async getMyApplications(): Promise<ApplicationModel[]> {
    const response = await apiClient.get<any>(
      `${this.API_BASE}/MyApplications`
    );
    return handleApiResponse<ApplicationModel[]>(response);
  }

  // Xem chi tiết đơn đăng ký
  async getApplicationById(id: number): Promise<ApplicationModel> {
    const response = await apiClient.get<any>(`${this.API_BASE}/${id}`);
    return handleApiResponse<ApplicationModel>(response);
  }

  // Admin - Xem tất cả đơn đăng ký
  async getAllApplications(): Promise<ApplicationModel[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}`);
    return handleApiResponse<ApplicationModel[]>(response);
  }

  // Admin - Lọc đơn đăng ký
  async filterApplications(params: {
    status?: string;
    targetRoleId?: number;
    createdFrom?: string;
    createdTo?: string;
  }): Promise<ApplicationModel[]> {
    const queryParams = new URLSearchParams();

    if (params.status) queryParams.append("status", params.status);
    if (params.targetRoleId)
      queryParams.append("targetRoleId", params.targetRoleId.toString());
    if (params.createdFrom)
      queryParams.append("createdFrom", params.createdFrom);
    if (params.createdTo) queryParams.append("createdTo", params.createdTo);

    const response = await apiClient.get<any>(
      `${this.API_BASE}/Filter?${queryParams.toString()}`
    );

    const result = handleApiResponse<{ applications: ApplicationModel[] }>(
      response
    );
    return result.applications;
  }

  // Admin - Tìm kiếm đơn đăng ký
  async searchApplications(keyword?: string): Promise<ApplicationModel[]> {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);

    const response = await apiClient.get<any>(
      `${this.API_BASE}/Search?${queryParams.toString()}`
    );

    const result = handleApiResponse<{ applications: ApplicationModel[] }>(
      response
    );
    return result.applications;
  }

  // Admin - Phê duyệt Designer
  async approveDesignerApplication(applicationId: number): Promise<void> {
    const response = await apiClient.put<any>(
      `${this.API_BASE}/${applicationId}/ApproveDesigner`
    );

    handleApiResponse<string>(response);
  }

  // Admin - Phê duyệt Supplier
  async approveSupplierApplication(applicationId: number): Promise<void> {
    const response = await apiClient.put<any>(
      `${this.API_BASE}/${applicationId}/ApproveSupplier`
    );

    handleApiResponse<string>(response);
  }

  // Admin - Từ chối đơn đăng ký
  async rejectApplication(
    applicationId: number,
    rejectionReason: string
  ): Promise<void> {
    const response = await apiClient.put<any>(
      `${this.API_BASE}/${applicationId}/Reject`,
      { rejectionReason }
    );

    handleApiResponse<string>(response);
  }
}

export const applicationService = new ApplicationService();
