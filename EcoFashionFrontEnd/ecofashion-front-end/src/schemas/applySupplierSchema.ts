import { z } from "zod";

export const applySupplierSchema = z.object({
  avatarFile: z.any().optional(),
  bannerFile: z.any().optional(),
  portfolioUrl: z.string().optional(),
  portfolioFiles: z.any().optional(),
  specializationUrl: z.string().optional(),
  bio: z.string().optional(),
  socialLinks: z.string().max(500).optional(),
  identificationNumber: z.string().optional(),
  identificationPictureFront: z.any().optional(),
  identificationPictureBack: z.any().optional(),
  note: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  taxNumber: z.string().optional(),
  certificates: z.string().optional(),
});

export type ApplySupplierFormValues = z.infer<typeof applySupplierSchema>; 