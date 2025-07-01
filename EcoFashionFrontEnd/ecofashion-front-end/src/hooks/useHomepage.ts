import { useState, useCallback } from "react";
import { useAuth } from "../services/user/AuthContext";
import {
  getWelcomeMessageByRole,
  type WelcomeMessage,
} from "../data/homepageData";

export const useHomepage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get welcome message based on user role
  const getWelcomeMessage = useCallback((): WelcomeMessage | null => {
    if (!user) return null;

    const role = user.role?.toLowerCase() || "";
    const userName = user.fullName || user.email?.split("@")[0] || "User";

    return getWelcomeMessageByRole(role, userName);
  }, [user]);

  // Handle product carousel navigation
  const handleSlideChange = useCallback(
    (direction: "prev" | "next", maxSlides: number) => {
      setCurrentSlide((prev) => {
        if (direction === "prev") {
          return Math.max(0, prev - 1);
        } else {
          return Math.min(maxSlides - 1, prev + 1);
        }
      });
    },
    []
  );

  // Handle add to cart
  const handleAddToCart = useCallback((productId: number) => {
    // TODO: Implement add to cart logic
    console.log("Adding product to cart:", productId);
  }, []);

  return {
    user,
    currentSlide,
    getWelcomeMessage,
    handleSlideChange,
    handleAddToCart,
  };
};
