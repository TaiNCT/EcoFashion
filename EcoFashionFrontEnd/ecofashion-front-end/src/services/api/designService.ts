// Designer service - specialized for designer operations
import { apiClient, handleApiResponse, handleApiError } from "./baseApi";
import type { BaseApiResponse } from "./baseApi";

// export interface DesignTypes {
//     type_id: string;
//     name: string;
// }

// Types for designer operations
// export interface Design {
//   designId: number;
//   designerId: string;
//   name?: string  ;
//   description?: string;
//   recycledPercentage: number ;
//   careInstructions?: string ;
//   price: number;
//   productScore: number;
//   status?: string;
//   createdAt: string;
//   designTypeId?: number;
// }

export interface SustainabilityCriterion {
  criterion: string;
  value: number;
}

export interface Material {
  materialId: number;
  persentageUsed: number;
  meterUsed: number;
  materialName: string;
  materialTypeName: string;
  sustainabilityCriteria: SustainabilityCriterion[];
}

export interface Designer {
  designerId: string;
  designerName: string;
  avatarUrl: string;
  bio: string;
  specializationUrl: string;
  portfolioUrl: string;
  bannerUrl: string;
  rating: number | null;
  reviewCount: number | null;
  certificates: string; // or string[] if you parse JSON
}

// export interface DesignType {
//   designTypeId: number;
//   designTypeName: string;
// }
export interface Feature{
  reduceWaste?: boolean,
  lowImpactDyes?: boolean,
  durable?: boolean,
  ethicallyManufactured?: boolean
}
export interface Design {
  designId: number;
  designerId: string;
  name: string;
  description: string;
  recycledPercentage: number;
  careInstructions: string;
  price: number;
  productScore: number;
  status: string;
  createdAt: string;
  // designTypeId?: number;
  designTypeName: string;
  // designType: DesignType;
  imageUrls: string[];
  feature?: Feature | null; // Define type if you know the structure
  variants: any[]; // Define type if needed
  materials: Material[];
  avgRating: number | null;
  reviewCount: number;
  designer: Designer;
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
          `${this.API_BASE}/GetAll`
        );   
        return  handleApiResponse(response);
      } catch (error) {
        return handleApiError(error);
      }
    }
      /**
     * Get designer profile by designer ID
     */
    static async getDesignDetailById(id: number): Promise<Design> {
      try {
      //   const response = await apiClient.get<BaseApiResponse<DesignerResponse>>(
      //     `/${this.API_BASE}/Detail/${designId}`
      //   );
        const response = await apiClient.get<BaseApiResponse<Design>>(
          `${this.API_BASE}/Detail/${id}`
        );   
        return  handleApiResponse(response);
      } catch (error) {
        return handleApiError(error);
      }
    }
}
export default DesignService;