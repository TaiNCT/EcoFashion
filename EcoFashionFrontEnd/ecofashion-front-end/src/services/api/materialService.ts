import apiClient, { handleApiResponse } from './baseApi';
import {
  materialDetailDtoSchema,
  materialDetailResponseSchema,
  materialModelSchema,
  materialCreationFormRequestSchema,
  materialTypeModelSchema,
  materialSustainabilityReportSchema,
  type MaterialDetailDto,
  type MaterialDetailResponse,
  type MaterialModel,
  type MaterialCreationFormRequest,
  type MaterialTypeModel,
  type MaterialSustainabilityReport,
  materialCreationResponseSchema,
  type MaterialCreationResponse,
} from '../../schemas/materialSchema';

// Mapping schema cho backend field names
export const backendFieldMapping = {
  // Frontend field -> Backend field
  name: "Name",
  description: "Description",
  typeId: "TypeId",
  quantityAvailable: "QuantityAvailable",
  pricePerUnit: "PricePerUnit",
  documentationUrl: "DocumentationUrl",
  materialSustainabilityCriteria1: "MaterialSustainabilityCriteria1",
  materialSustainabilityCriteria2: "MaterialSustainabilityCriteria2",
  materialSustainabilityCriteria3: "MaterialSustainabilityCriteria3",
} as const;

class MaterialService {
  private readonly API_BASE = "Material";

  // Get all materials with sustainability scores (for homepage)
  async getAllMaterialsWithSustainability(): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    

    
    return result.map((item) => {
      try {
        return materialDetailDtoSchema.parse(item);
      } catch (error) {
        console.error("Schema validation error:", error);
        console.error("Item that failed validation:", item);
        throw error;
      }
    });
  }

  // Get all materials (alias for getAllMaterialsWithSustainability)
  async getAllMaterials(): Promise<MaterialDetailDto[]> {
    return this.getAllMaterialsWithSustainability();
  }

  // Get material detail by ID
  async getMaterialDetail(id: number): Promise<MaterialDetailResponse> {
    const response = await apiClient.get<any>(`${this.API_BASE}/${id}`);
    const result = handleApiResponse<MaterialDetailResponse>(response);
    return materialDetailResponseSchema.parse(result);
  }

  // Get material by ID (alias for getMaterialDetail)
  async getMaterialById(id: number): Promise<MaterialDetailResponse> {
    const response = await apiClient.get<any>(`${this.API_BASE}/${id}`);
    const result = handleApiResponse<MaterialDetailResponse>(response);
    return materialDetailResponseSchema.parse(result);
  }

  // Create new material with sustainability (returns creation response)
  async createMaterialWithSustainability(request: MaterialCreationFormRequest): Promise<MaterialCreationResponse> {
    const validatedRequest = materialCreationFormRequestSchema.parse(request);
    const response = await apiClient.post<any>(`${this.API_BASE}/CreateWithSustainability`, validatedRequest);
    const result = handleApiResponse<MaterialCreationResponse>(response);
    return materialCreationResponseSchema.parse(result);
  }

  // Upload images for a material (multipart form)
  async uploadMaterialImages(materialId: number, files: File[]): Promise<{ imageId: number; imageUrl: string }[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await apiClient.post<any>(`${this.API_BASE}/${materialId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return handleApiResponse(response);
  }

  // Admin: approve material
  async approveMaterial(materialId: number): Promise<boolean> {
    const response = await apiClient.post<any>(`${this.API_BASE}/${materialId}/approve`, {});
    const result = handleApiResponse<boolean>(response);
    return !!result;
  }

  // Admin: reject material with optional admin note
  async rejectMaterial(materialId: number, adminNote?: string): Promise<boolean> {
    const body = adminNote ?? null;
    const response = await apiClient.post<any>(`${this.API_BASE}/${materialId}/reject`, body);
    const result = handleApiResponse<boolean>(response);
    return !!result;
  }

  // Delete material
  async deleteMaterial(id: number): Promise<void> {
    const response = await apiClient.delete<any>(`${this.API_BASE}/${id}`);
    handleApiResponse<string>(response);
  }

  // Get material sustainability score
  async getMaterialSustainability(materialId: number): Promise<MaterialSustainabilityReport> {
    const response = await apiClient.get<any>(`${this.API_BASE}/Sustainability/${materialId}`);
    const result = handleApiResponse<MaterialSustainabilityReport>(response);
    return materialSustainabilityReportSchema.parse(result);
  }

  // Get all material types (for dropdown)
  async getAllMaterialTypes(): Promise<MaterialTypeModel[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}/GetAllMaterialTypes`);
    const result = handleApiResponse<MaterialTypeModel[]>(response);
    return result.map((item) => materialTypeModelSchema.parse(item));
  }

  // Get transport evaluation from backend
  async getTransportEvaluation(distance: number, method: string) {
    try {
      const response = await apiClient.get(`/material/GetTransportEvaluation/${distance}/${method}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get transport evaluation:', error);
      throw error;
    }
  }

  // Get production evaluation from backend
  async getProductionEvaluation(country: string) {
    try {
      const response = await apiClient.get(`/material/GetProductionEvaluation/${country}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get production evaluation:', error);
      throw error;
    }
  }

  // Get recommended transport details (distance, method, description) by country
  async getTransportDetails(country: string): Promise<{ distance: number; method: string; description: string }> {
    const response = await apiClient.get<any>(`/material/CalculateTransport/${encodeURIComponent(country)}`);
    return handleApiResponse(response);
  }

  // Get common production countries (for dropdown)
  async getProductionCountries(): Promise<string[]> {
    const response = await apiClient.get<any>(`/material/GetProductionCountries`);
    const result = handleApiResponse<{ countries: string[] }>(response);
    return result.countries ?? [];
  }

  // Get sustainability evaluation from backend
  async getSustainabilityEvaluation(score: number) {
    try {
      const response = await apiClient.get(`/material/GetSustainabilityEvaluation/${score}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get sustainability evaluation:', error);
      throw error;
    }
  }

  // Get supplier's materials with approval status filter
  async getSupplierMaterials(supplierId: string, approvalStatus?: string) {
    const params = new URLSearchParams();
    if (approvalStatus && approvalStatus !== 'all') {
      params.append('approvalStatus', approvalStatus);
    }
    params.append('supplierId', supplierId);
    
    const response = await apiClient.get<any>(`${this.API_BASE}/GetSupplierMaterials?${params}`);
    return handleApiResponse(response);
  }
}

export const materialService = new MaterialService();
export default materialService; 