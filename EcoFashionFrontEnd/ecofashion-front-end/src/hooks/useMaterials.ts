import { useState, useCallback, useMemo } from "react";
import type { Material } from "../types/Material";
import { materials as mockMaterials } from "../data/materialsData";
import { DemoUtils } from "../utils/DemoUtils";

interface UseMaterialsState {
  materials: Material[];
  filteredMaterials: Material[];
  selectedMaterial: Material | null;
  loading: boolean;
  error: string | null;
}

interface UseMaterialsFilters {
  type?: Material["type"];
  availability?: Material["availability"];
  sustainableOnly?: boolean;
  searchTerm?: string;
}

export const useMaterials = (initialFilters: UseMaterialsFilters = {}) => {
  const [state, setState] = useState<UseMaterialsState>({
    materials: mockMaterials,
    filteredMaterials: mockMaterials,
    selectedMaterial: null,
    loading: false,
    error: null,
  });

  const [filters, setFilters] = useState<UseMaterialsFilters>(initialFilters);

  // Apply filters to materials
  const filteredMaterials = useMemo(() => {
    let result = state.materials;

    // Filter by type
    if (filters.type) {
      result = DemoUtils.filterMaterialsByType(result, filters.type);
    }

    // Filter by availability
    if (filters.availability) {
      result = DemoUtils.filterMaterialsByAvailability(
        result,
        filters.availability
      );
    }

    // Filter sustainable materials only
    if (filters.sustainableOnly) {
      result = DemoUtils.getSustainableMaterials(result);
    }

    // Search by name or supplier
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (material) =>
          material.name.toLowerCase().includes(term) ||
          material.supplier.toLowerCase().includes(term) ||
          (material.description &&
            material.description.toLowerCase().includes(term))
      );
    }

    return result;
  }, [state.materials, filters]);

  // Update filtered materials when filters change
  useState(() => {
    setState((prev) => ({
      ...prev,
      filteredMaterials: filteredMaterials,
    }));
  });

  // Select a material
  const selectMaterial = useCallback((material: Material | null) => {
    setState((prev) => ({
      ...prev,
      selectedMaterial: material,
    }));
  }, []);

  // Update filters
  const updateFilters = useCallback(
    (newFilters: Partial<UseMaterialsFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));
    },
    []
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Simulate loading for demo
  const refreshMaterials = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Simulate API call
      await DemoUtils.simulateApiDelay(500);

      // Simulate occasional error for demo
      if (DemoUtils.simulateError(0.05)) {
        throw new Error("Failed to load materials");
      }

      setState((prev) => ({
        ...prev,
        materials: mockMaterials,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, []);

  // Get materials by type (shortcut methods)
  const getOrganicMaterials = useCallback(() => {
    return DemoUtils.filterMaterialsByType(state.materials, "organic");
  }, [state.materials]);

  const getRecycledMaterials = useCallback(() => {
    return DemoUtils.filterMaterialsByType(state.materials, "recycled");
  }, [state.materials]);

  const getSustainableMaterials = useCallback(() => {
    return DemoUtils.getSustainableMaterials(state.materials);
  }, [state.materials]);

  const getAvailableMaterials = useCallback(() => {
    return DemoUtils.filterMaterialsByAvailability(state.materials, "in-stock");
  }, [state.materials]);

  return {
    // Data
    materials: state.materials,
    filteredMaterials,
    selectedMaterial: state.selectedMaterial,

    // State
    loading: state.loading,
    error: state.error,
    filters,

    // Actions
    selectMaterial,
    updateFilters,
    resetFilters,
    refreshMaterials,

    // Shortcut methods
    getOrganicMaterials,
    getRecycledMaterials,
    getSustainableMaterials,
    getAvailableMaterials,

    // Computed values
    hasFilters: Object.keys(filters).length > 0,
    totalCount: state.materials.length,
    filteredCount: filteredMaterials.length,
  };
};

export default useMaterials;
