import apiClient, { handleApiResponse } from "./baseApi";

export interface ApplyDesignerRequest {
  portfolioUrl: string;
  bannerUrl?: string;
  specializationUrl?: string;
  identificationNumber: string;
  identificationPicture: string;
  note?: string;
}

export interface ApplySupplierRequest {
  portfolioUrl?: string;
  bannerUrl?: string;
  specializationUrl?: string;
  identificationNumber: string;
  identificationPicture: string;
  note?: string;
}

export interface ApplicationModel {
  applicationId: number;
  userId: number;
  targetRoleId: number;
  portfolioUrl?: string;
  bannerUrl?: string;
  specializationUrl?: string;
  identificationNumber?: string;
  identificationPicture?: string;
  note?: string;
  createdAt: string;
  processedAt?: string;
  processedBy?: number;
  rejectionReason?: string;
  status: "pending" | "approved" | "rejected";
  user?: {
    userId: number;
    fullName?: string;
    email?: string;
  };
  role?: {
    roleId: number;
    roleName: string;
  };
}

export interface ApiResult<T> {
  success: boolean; // Backend sử dụng camelCase
  result: T; // Backend sử dụng camelCase
  errorMessage?: string; // Backend sử dụng camelCase
}

class ApplicationService {
  private readonly API_BASE = "/Applications";

  // User đăng ký làm Designer
  async applyAsDesigner(
    request: ApplyDesignerRequest
  ): Promise<ApplicationModel> {
    const response = await apiClient.post<any>(
      `${this.API_BASE}/ApplyDesigner`,
      request
    );
    return handleApiResponse<ApplicationModel>(response);
  }

  // User đăng ký làm Supplier
  async applyAsSupplier(
    request: ApplySupplierRequest
  ): Promise<ApplicationModel> {
    const response = await apiClient.post<any>(
      `${this.API_BASE}/ApplySupplier`,
      request
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
