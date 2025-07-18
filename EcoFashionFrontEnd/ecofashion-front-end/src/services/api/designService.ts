// Designer service - specialized for designer operations
import { apiClient, handleApiResponse, handleApiError } from "./baseApi";
import type { BaseApiResponse } from "./baseApi";

export interface DesignTypes {
    type_id: string;
    name: string;
}

// Types for designer operations
export interface Design {
  designId: number;
  designerId: string;
  name?: string  ;
  description?: string;
  recycledPercentage: number ;
  careInstructions?: string ;
  price: number;
  productScore: number;
  status?: string;
  createdAt: string;
  designTypeId?: number;
}

export interface DesignResponse {
  design: Design;
}
/**
 * Design Service
 * Handles all designer-related API calls
 */

export class DesignService {
    private static readonly API_BASE = "Design";

  /**
     * Get designer profile by designer ID
     */
    static async getAllDesign(): Promise<Design[]> {
      try {
      //   const response = await apiClient.get<BaseApiResponse<DesignerResponse>>(
      //     `/${this.API_BASE}/Detail/${designId}`
      //   );
        const response = await apiClient.get<BaseApiResponse<Design[]>>(
          `/${this.API_BASE}/GetAll`
        );   
        return  handleApiResponse(response);
      } catch (error) {
        return handleApiError(error);
      }
    }
}
export default DesignService;