// Utility functions for demo purposes - keeping only essential functions
export class DemoUtils {
  // Simulate API delay for realistic UX
  static async simulateApiDelay(ms: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generate random ID for demo purposes
  static generateId(): number {
    return Math.floor(Math.random() * 10000) + 1000;
  }

  // Simulate error for testing error handling
  static simulateError(errorRate: number = 0.1): boolean {
    return Math.random() < errorRate;
  }

  // Format price to Vietnamese currency
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // Format percentage
  static formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  // Get availability status text
  static getAvailabilityText(quantity: number): string {
    if (quantity === 0) return 'Hết hàng';
    if (quantity <= 10) return 'Số lượng có hạn';
    return 'Còn hàng';
  }

  // Get availability status color
  static getAvailabilityColor(quantity: number): string {
    if (quantity === 0) return '#f44336';
    if (quantity <= 10) return '#ff9800';
    return '#4caf50';
  }
}

export default DemoUtils;
