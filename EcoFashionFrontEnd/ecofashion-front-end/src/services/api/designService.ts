// Designer service - specialized for designer operations
import { apiClient, handleApiResponse, handleApiError } from "./baseApi";
import type { BaseApiResponse } from "./baseApi";

export interface DesignTypes {
    type_id: string;
    name: string;
}

/**
 * Designer Service
 * Handles all designer-related API calls
 */

export class DesignService {
    private static readonly API_BASE = "Designer";
}