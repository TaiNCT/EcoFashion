import type { Material } from "../types/Material";

export const materials: Material[] = [
  {
    id: 1,
    name: "Organic Cotton",
    type: "organic",
    supplier: "EcoSupplier Co.",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb061?w=400&h=300&fit=crop",
    sustainability: {
      waterSaved: 70,
      pesticidesUsed: 0,
      carbonFootprint: "low",
    },
    price: "250.000đ/kg",
    availability: "in-stock",
    description: "100% organic cotton được trồng không sử dụng thuốc trừ sâu",
  },
  {
    id: 2,
    name: "Recycled Polyester",
    type: "recycled",
    supplier: "GreenFabrics Ltd.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
    sustainability: {
      recycledContent: 100,
      energySaved: 60,
      carbonFootprint: "very-low",
    },
    price: "180.000đ/kg",
    availability: "in-stock",
    description: "Polyester tái chế từ chai nhựa PET",
  },
  {
    id: 3,
    name: "Hemp Fiber",
    type: "natural",
    supplier: "Natural Fibers Inc.",
    image:
      "https://images.unsplash.com/photo-1576662712957-9c79ae1280f8?w=400&h=300&fit=crop",
    sustainability: {
      biodegradable: true,
      durability: "high",
      carbonFootprint: "negative",
    },
    price: "320.000đ/kg",
    availability: "limited",
    description: "Sợi gai dầu tự nhiên với độ bền cao",
  },
  {
    id: 4,
    name: "Recycled Denim",
    type: "recycled",
    supplier: "Denim Revival Co.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
    sustainability: {
      recycledContent: 95,
      waterSaved: 85,
      carbonFootprint: "low",
    },
    price: "200.000đ/kg",
    availability: "in-stock",
    description: "Denim tái chế từ quần jeans cũ",
  },
  {
    id: 5,
    name: "Organic Bamboo",
    type: "organic",
    supplier: "Bamboo Textiles",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    sustainability: {
      biodegradable: true,
      carbonFootprint: "negative",
      durability: "medium",
    },
    price: "280.000đ/kg",
    availability: "in-stock",
    description: "Sợi tre hữu cơ mềm mại và kháng khuẩn",
  },
  {
    id: 6,
    name: "Recycled Wool",
    type: "recycled",
    supplier: "Wool Recycle Pro",
    image:
      "https://images.unsplash.com/photo-1544966503-7ba27fc1905d?w=400&h=300&fit=crop",
    sustainability: {
      recycledContent: 90,
      waterSaved: 80,
      carbonFootprint: "low",
    },
    price: "350.000đ/kg",
    availability: "limited",
    description: "Len tái chế từ sản phẩm len cũ",
  },
];

// Filter functions cho demo
export const getOrganicMaterials = (): Material[] => {
  return materials.filter((material) => material.type === "organic");
};

export const getRecycledMaterials = (): Material[] => {
  return materials.filter((material) => material.type === "recycled");
};

export const getAvailableMaterials = (): Material[] => {
  return materials.filter((material) => material.availability === "in-stock");
};

export const getSustainableMaterials = (): Material[] => {
  return materials.filter(
    (material) =>
      material.sustainability.carbonFootprint === "very-low" ||
      material.sustainability.carbonFootprint === "negative" ||
      (material.sustainability.recycledContent &&
        material.sustainability.recycledContent >= 90)
  );
};
