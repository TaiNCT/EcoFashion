// Re-export types from Zod schema for backward compatibility
export type {
  MaterialDetailDto,
  MaterialDetailResponse,
  MaterialModel,
  MaterialRequest,
  MaterialFilterRequest,
  MaterialSearchRequest,
  SustainabilityCriterionDto,
  MaterialTypeBenchmarkDto,
  SupplierPublicDto,
} from '../schemas/materialSchema';

// Legacy Material interface for backward compatibility (deprecated)
export interface Material {
  id: number;
  name: string;
  type: "organic" | "recycled" | "natural" | "synthetic";
  supplier: string;
  description?: string;
  image: string;
  price: string;
  availability: "in-stock" | "limited" | "out-of-stock";
  sustainability: {
    carbonFootprint: "very-low" | "low" | "medium" | "high" | "negative";
    recycledContent?: number;
    waterUsage: "very-low" | "low" | "medium" | "high";
    biodegradable: boolean;
    durability: "low" | "medium" | "high";
    energySaved?: number;
  };
}
