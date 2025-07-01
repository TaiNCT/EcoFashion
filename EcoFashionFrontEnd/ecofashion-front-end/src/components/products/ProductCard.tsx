import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Rating,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  image: string;
  badge?: string;
  sale?: boolean;
}

interface ProductCardProps {
  product: Product;
  isLoggedIn?: boolean;
  onAddToCart?: (productId: number) => void;
}

export default function ProductCard({
  product,
  isLoggedIn = false,
  onAddToCart,
}: ProductCardProps) {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "NEW":
        return "#4caf50";
      case "ECO":
        return "#2e7d32";
      case "SALE":
        return "#f44336";
      case "BEST":
        return "#ff9800";
      case "HOT":
        return "#9c27b0";
      default:
        return "#9c27b0";
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          transition: "all 0.3s ease",
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="280"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        {product.badge && (
          <Chip
            label={product.badge}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: getBadgeColor(product.badge),
              color: "white",
              fontWeight: "bold",
            }}
          />
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 1, fontSize: "1rem" }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
            ({product.rating})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {product.price}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                {product.originalPrice}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCart />}
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#388e3c" },
              borderRadius: 2,
            }}
            onClick={handleAddToCart}
          >
            {isLoggedIn ? "Thêm vào giỏ" : "Xem chi tiết"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export type { Product, ProductCardProps };
