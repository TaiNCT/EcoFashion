export interface Material {
  id: number;
  name: string;
  type: "organic" | "recycled" | "natural" | "synthetic";
  supplier: string;
  image: string;
  sustainability: {
    waterSaved?: number;
    pesticidesUsed?: number;
    carbonFootprint: "very-low" | "low" | "medium" | "high" | "negative";
    recycledContent?: number;
    energySaved?: number;
    biodegradable?: boolean;
    durability?: "low" | "medium" | "high";
  };
  price: string;
  availability: "in-stock" | "limited" | "out-of-stock";
  description?: string;
}
