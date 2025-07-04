import type { Material } from "../types/Material";

// Utility functions for demo purposes - keeping only essential functions
export class DemoUtils {
  // Simulate API delay for realistic UX
  static async simulateApiDelay(ms: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Filter materials by type - used by useMaterials hook
  static filterMaterialsByType(
    materials: Material[],
    type: Material["type"]
  ): Material[] {
    return materials.filter((material) => material.type === type);
  }

  // Filter materials by availability - used by useMaterials hook
  static filterMaterialsByAvailability(
    materials: Material[],
    availability: Material["availability"]
  ): Material[] {
    return materials.filter(
      (material) => material.availability === availability
    );
  }

  // Get sustainable materials - used by useMaterials hook
  static getSustainableMaterials(materials: Material[]): Material[] {
    return materials.filter((material) => {
      const { sustainability } = material;
      return (
        sustainability.carbonFootprint === "very-low" ||
        sustainability.carbonFootprint === "negative" ||
        (sustainability.recycledContent &&
          sustainability.recycledContent >= 70) ||
        sustainability.biodegradable === true
      );
    });
  }

  // Calculate sustainability score for a material
  static calculateSustainabilityScore(
    sustainability: Material["sustainability"]
  ): number {
    let score = 0;

    if (
      sustainability.carbonFootprint === "very-low" ||
      sustainability.carbonFootprint === "negative"
    )
      score += 30;
    else if (sustainability.carbonFootprint === "low") score += 20;

    if (sustainability.recycledContent && sustainability.recycledContent >= 80)
      score += 25;
    else if (
      sustainability.recycledContent &&
      sustainability.recycledContent >= 50
    )
      score += 15;

    if (sustainability.biodegradable) score += 20;
    if (sustainability.durability === "high") score += 15;
    if (sustainability.energySaved && sustainability.energySaved >= 50)
      score += 10;

    return Math.min(score, 100);
  }

  // Generate random ID for demo purposes
  static generateId(): number {
    return Math.floor(Math.random() * 10000) + 1000;
  }

  // Simulate error for testing error handling
  static simulateError(errorRate: number = 0.1): boolean {
    return Math.random() < errorRate;
  }
}

export default DemoUtils;
