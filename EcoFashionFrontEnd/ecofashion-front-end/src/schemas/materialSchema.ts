import { z } from "zod";

// Schema cho Sustainability Criterion
export const sustainabilityCriterionSchema = z.object({
  criterionId: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  value: z.number(),
});

// Schema cho Material Type Benchmark
export const materialTypeBenchmarkSchema = z.object({
  criterionId: z.number(),
  criterionName: z.string().optional(),
  benchmarkValue: z.number(),
  actualValue: z.number(),
  improvementPercentage: z.number(),
});

// Schema cho Supplier Public Info
export const supplierPublicSchema = z.object({
  supplierId: z.string(),
  supplierName: z.string().optional(),
  avatarUrl: z.string().optional(),
  bio: z.string().optional(),
  specializationUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  rating: z.number().nullable().optional(),
  reviewCount: z.number().nullable().optional(),
  certificates: z.string().optional(),
});

// Schema cho Material Detail Response từ API
export const materialDetailResponseSchema = z.object({
  materialId: z.number(),
  materialTypeName: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  recycledPercentage: z.number(),
  quantityAvailable: z.number(),
  pricePerUnit: z.number(),
  documentationUrl: z.string().optional(),
  createdAt: z.string(),
  imageUrls: z.array(z.string()).optional(),
  sustainabilityCriteria: z.array(sustainabilityCriterionSchema),
  benchmarks: z.array(materialTypeBenchmarkSchema),
  supplier: supplierPublicSchema,
});

// Schema cho Material Detail DTO (sử dụng trong frontend)
export const materialDetailDtoSchema = z.object({
  materialId: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  recycledPercentage: z.number(),
  quantityAvailable: z.number(),
  pricePerUnit: z.number(),
  documentationUrl: z.string().optional(),
  materialTypeName: z.string().optional(),
  imageUrls: z.array(z.string()),
  sustainabilityCriteria: z.array(sustainabilityCriterionSchema),
  benchmarks: z.array(materialTypeBenchmarkSchema),
  createdAt: z.string(),
  supplier: supplierPublicSchema,
});

// Schema cho Material Model (basic info)
export const materialModelSchema = z.object({
  materialId: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  recycledPercentage: z.number(),
  quantityAvailable: z.number(),
  pricePerUnit: z.number(),
  documentationUrl: z.string().optional(),
  typeId: z.number(),
  supplierId: z.string(),
  createdAt: z.string(),
});

// Schema cho Material Request (create/update)
export const materialRequestSchema = z.object({
  name: z.string().min(1, "Tên nguyên liệu là bắt buộc"),
  description: z.string().optional(),
  typeId: z.number().min(1, "Loại nguyên liệu là bắt buộc"),
  quantityAvailable: z.number().min(0, "Số lượng phải >= 0"),
  pricePerUnit: z.number().min(0, "Giá phải >= 0"),
  documentationUrl: z.string().url().optional().or(z.literal("")),
  materialSustainabilityCriteria1: z.number().min(1, "Tiêu chí bền vững 1 là bắt buộc"),
  materialSustainabilityCriteria2: z.number().min(1, "Tiêu chí bền vững 2 là bắt buộc"),
  materialSustainabilityCriteria3: z.number().min(1, "Tiêu chí bền vững 3 là bắt buộc"),
});

// Schema cho Material Filter Request
export const materialFilterSchema = z.object({
  typeId: z.number().optional(),
  supplierId: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minRecycledPercentage: z.number().optional(),
  maxRecycledPercentage: z.number().optional(),
  inStock: z.boolean().optional(),
});

// Schema cho Material Search Request
export const materialSearchSchema = z.object({
  keyword: z.string().optional(),
  typeId: z.number().optional(),
  supplierId: z.string().optional(),
});

// Export types
export type SustainabilityCriterionDto = z.infer<typeof sustainabilityCriterionSchema>;
export type MaterialTypeBenchmarkDto = z.infer<typeof materialTypeBenchmarkSchema>;
export type SupplierPublicDto = z.infer<typeof supplierPublicSchema>;
export type MaterialDetailResponse = z.infer<typeof materialDetailResponseSchema>;
export type MaterialDetailDto = z.infer<typeof materialDetailDtoSchema>;
export type MaterialModel = z.infer<typeof materialModelSchema>;
export type MaterialRequest = z.infer<typeof materialRequestSchema>;
export type MaterialFilterRequest = z.infer<typeof materialFilterSchema>;
export type MaterialSearchRequest = z.infer<typeof materialSearchSchema>;

// Schema cho API Response wrapper
export const materialApiResponseSchema = z.object({
  success: z.boolean(),
  result: z.union([
    materialDetailDtoSchema,
    z.array(materialDetailDtoSchema),
    materialModelSchema,
    z.array(materialModelSchema),
    materialDetailResponseSchema,
  ]),
  errorMessage: z.string().optional(),
});

export type MaterialApiResponse = z.infer<typeof materialApiResponseSchema>; 