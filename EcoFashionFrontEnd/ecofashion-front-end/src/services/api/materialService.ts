import apiClient, { handleApiResponse } from './baseApi';
import {
  materialDetailDtoSchema,
  materialDetailResponseSchema,
  materialModelSchema,
  materialRequestSchema,
  materialFilterSchema,
  materialSearchSchema,
  type MaterialDetailDto,
  type MaterialDetailResponse,
  type MaterialModel,
  type MaterialRequest,
  type MaterialFilterRequest,
  type MaterialSearchRequest,
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
  private readonly API_BASE = "Materials";

  // Get all materials with full details
  async getAllMaterials(): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Get material by ID
  async getMaterialById(id: number): Promise<MaterialModel> {
    const response = await apiClient.get<any>(`${this.API_BASE}/${id}`);
    const result = handleApiResponse<MaterialModel>(response);
    return materialModelSchema.parse(result);
  }

  // Get material detail by ID
  async getMaterialDetail(id: number): Promise<MaterialDetailResponse> {
    const response = await apiClient.get<any>(`${this.API_BASE}/Detail/${id}`);
    const result = handleApiResponse<MaterialDetailResponse>(response);
    return materialDetailResponseSchema.parse(result);
  }

  // Create new material
  async createMaterial(request: MaterialRequest): Promise<MaterialModel> {
    // Validate request data
    const validatedRequest = materialRequestSchema.parse(request);
    
    const response = await apiClient.post<any>(`${this.API_BASE}`, validatedRequest);
    const result = handleApiResponse<MaterialModel>(response);
    return materialModelSchema.parse(result);
  }

  // Update material
  async updateMaterial(id: number, request: MaterialRequest): Promise<MaterialModel> {
    // Validate request data
    const validatedRequest = materialRequestSchema.parse(request);
    
    const response = await apiClient.put<any>(`${this.API_BASE}/${id}`, validatedRequest);
    const result = handleApiResponse<MaterialModel>(response);
    return materialModelSchema.parse(result);
  }

  // Delete material
  async deleteMaterial(id: number): Promise<void> {
    const response = await apiClient.delete<any>(`${this.API_BASE}/${id}`);
    handleApiResponse<string>(response);
  }

  // Filter materials
  async filterMaterials(params: MaterialFilterRequest): Promise<MaterialDetailDto[]> {
    // Validate filter params
    const validatedParams = materialFilterSchema.parse(params);
    
    const queryParams = new URLSearchParams();
    
    if (validatedParams.typeId) queryParams.append("typeId", validatedParams.typeId.toString());
    if (validatedParams.supplierId) queryParams.append("supplierId", validatedParams.supplierId);
    if (validatedParams.minPrice) queryParams.append("minPrice", validatedParams.minPrice.toString());
    if (validatedParams.maxPrice) queryParams.append("maxPrice", validatedParams.maxPrice.toString());
    if (validatedParams.minRecycledPercentage) queryParams.append("minRecycledPercentage", validatedParams.minRecycledPercentage.toString());
    if (validatedParams.maxRecycledPercentage) queryParams.append("maxRecycledPercentage", validatedParams.maxRecycledPercentage.toString());
    if (validatedParams.inStock !== undefined) queryParams.append("inStock", validatedParams.inStock.toString());

    const response = await apiClient.get<any>(`${this.API_BASE}/Filter?${queryParams.toString()}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Search materials
  async searchMaterials(params: MaterialSearchRequest): Promise<MaterialDetailDto[]> {
    // Validate search params
    const validatedParams = materialSearchSchema.parse(params);
    
    const queryParams = new URLSearchParams();
    
    if (validatedParams.keyword) queryParams.append("keyword", validatedParams.keyword);
    if (validatedParams.typeId) queryParams.append("typeId", validatedParams.typeId.toString());
    if (validatedParams.supplierId) queryParams.append("supplierId", validatedParams.supplierId);

    const response = await apiClient.get<any>(`${this.API_BASE}/Search?${queryParams.toString()}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Get materials by supplier
  async getMaterialsBySupplier(supplierId: string): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}/Supplier/${supplierId}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Get materials by type
  async getMaterialsByType(typeId: number): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}/Type/${typeId}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Get sustainable materials (high recycled percentage)
  async getSustainableMaterials(minRecycledPercentage: number = 50): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}/Sustainable?minRecycledPercentage=${minRecycledPercentage}`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }

  // Get in-stock materials
  async getInStockMaterials(): Promise<MaterialDetailDto[]> {
    const response = await apiClient.get<any>(`${this.API_BASE}/InStock`);
    const result = handleApiResponse<MaterialDetailDto[]>(response);
    return result.map((item) => materialDetailDtoSchema.parse(item));
  }
}

export const materialService = new MaterialService();
export default materialService; 