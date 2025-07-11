import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
  IconButton,
  Button,
  Link,
} from "@mui/material";

import type { Product } from "../../types/Product";
import { AddToCart, EcoIcon } from "../../assets/icons/icon";
import type { Fashion } from "../../types/Fashion";
import { FavoriteBorderOutlined, LocalShipping } from "@mui/icons-material";

interface FashionCardProps {
  product: Fashion;
  onSelect?: (product: Fashion) => void;
  onAddToCart?: (product: Fashion) => void;
  onToggleFavorite?: (product: Fashion) => void;
}

const FashionCard: React.FC<FashionCardProps> = ({
  product,
  // onSelect,
  // onAddToCart,
  // onToggleFavorite,
}) => {
  const getCategoryColor = (category: Fashion["category"]) => {
    const colors = {
      clothing: "#2196f3",
      accessories: "#ff9800",
      footwear: "#4caf50",
      bags: "#9c27b0",
      home: "#607d8b",
    };
    return colors[category] || "#9e9e9e";
  };

  const getAvailabilityColor = (availability: Fashion["availability"]) => {
    const colors = {
      "in-stock": "success" as const,
      limited: "warning" as const,
      "pre-order": "info" as const,
      "out-of-stock": "error" as const,
    };
    return colors[availability];
  };

  const getAvailabilityText = (availability: Fashion["availability"]) => {
    const texts = {
      "in-stock": "Còn hàng",
      limited: "Số lượng có hạn",
      "pre-order": "Đặt trước",
      "out-of-stock": "Hết hàng",
    };
    return texts[availability];
  };

  // const getSustainabilityScore = (
  //   sustainability: Product["sustainability"]
  // ) => {
  //   let score = 0;

  //   // Carbon footprint score
  //   const carbonScores = {
  //     "very-low": 5,
  //     low: 4,
  //     medium: 3,
  //     high: 2,
  //     negative: 1,
  //   };
  //   score += carbonScores[sustainability.carbonFootprint] * 2;

  //   // Water usage score
  //   const waterScores = { "very-low": 4, low: 3, medium: 2, high: 1 };
  //   score += waterScores[sustainability.waterUsage] * 1.5;

  //   // Other factors
  //   if (sustainability.ethicalManufacturing) score += 3;
  //   if (sustainability.recyclable) score += 2;
  //   score += sustainability.durabilityRating * 0.5;

  //   return Math.min(Math.round(score / 4), 5); // Scale to 1-5
  // };

  const formatPrice = (price: Fashion["price"]) => {
    const formatted = new Intl.NumberFormat("vi-VN").format(price.current);
    return `${formatted}₫`;
  };

  const formatOriginalPrice = (price: Fashion["price"]) => {
    if (!price.original) return null;
    const formatted = new Intl.NumberFormat("vi-VN").format(price.original);
    return `${formatted}₫`;
  };

  // const handleCardClick = () => {
  //   if (onSelect) {
  //     onSelect(product);
  //   }
  // };

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onAddToCart && product.availability !== "out-of-stock") {
  //     onAddToCart(product);
  //   }
  // };

  // const handleToggleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onToggleFavorite) {
  //     onToggleFavorite(product);
  //   }
  // };

  //   const sustainabilityScore = getSustainabilityScore(product.sustainability);

  return (
    <Card
      sx={{
        width: "30%",
        height: "100%",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          transition: "all 0.3s ease",
          boxShadow: 3,
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {product.isNew && (
          <Chip
            label="Mới"
            size="small"
            sx={{ mb: 1, bgcolor: "#e91e63", color: "white" }}
          />
        )}
        {product.isBestSeller && (
          <Chip
            label="Bán Chạy Nhất"
            size="small"
            sx={{
              mb: 1,
              backgroundColor: "rgba(245, 144, 56, 1)",
              color: "white",
            }}
          />
        )}
        <Chip
          icon={<EcoIcon />}
          label={`${product.sustainability}% Tái Chế`}
          size="small"
          sx={{
            backgroundColor: "rgba(200, 248, 217, 1)",
            color: "rgba(22, 103, 86, 1)",
            fontSize: "15px",
          }}
        />
      </Box>

      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <FavoriteBorderOutlined />
      </IconButton>

      <Link href={`/detail/${product.id}`} style={{ justifyContent: "center" }}>
        <CardMedia
          component="img"
          height="240"
          image={product.image}
          alt={product.name}
        />
      </Link>

      <CardContent
        sx={{
          textAlign: "left",
        }}
      >
        {/* Category and Brand */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip
            label={product.category.toUpperCase()}
            size="small"
            sx={{
              bgcolor: getCategoryColor(product.category),
              color: "white",
              fontWeight: "bold",
              fontSize: "0.7rem",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {product.brand}
          </Typography>
        </Box>
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: "25px",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center">
          <Rating
            value={Math.round(product.rating.average)}
            readOnly
            size="small"
          />
          <Typography variant="body2" ml={1}>
            ({product.rating.count})
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 1,
            minHeight: 56,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!product.price.original && (
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", color: "#2e7d32", margin: "auto 0" }}
            >
              {formatPrice(product.price)}
            </Typography>
          )}
          {product.price.original && (
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "#2e7d32" }}
              >
                {formatPrice(product.price)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontSize: "0.875rem",
                }}
              >
                {formatOriginalPrice(product.price)}
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.materials.map((mat, index) => (
            <Chip
              key={index}
              label={`${mat.name} (${mat.percentageUse}%)`}
              size="small"
              sx={{
                backgroundColor: "rgba(220, 252, 231, 1)",
                color: "rgba(29, 106, 58, 1)",
              }}
            />
          ))}
        </Box>
        <Box sx={{ margin: "10px 0" }}>
          <Chip
            label={getAvailabilityText(product.availability)}
            size="small"
            color={getAvailabilityColor(product.availability)}
            icon={<LocalShipping sx={{ fontSize: 16 }} />}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "rgba(22, 163, 74, 1)",
          }}
        >
          <AddToCart />
          Thêm vào Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FashionCard;
