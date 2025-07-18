import React, { useState } from "react";
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
  SwipeableDrawer,
  styled,
  Drawer,
} from "@mui/material";

import { AddToCart, EcoIcon } from "../../assets/icons/icon";
import type { Fashion } from "../../types/Fashion";
import { FavoriteBorderOutlined, LocalShipping } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import type { Design } from "../../services/api/designService";
//example
import ao_linen from "../../assets/pictures/example/ao-linen.webp";
interface FashionCardProps {
  product: Design;
  onSelect?: (product: Design) => void;
  onAddToCart?: (product: Design) => void;
  onToggleFavorite?: (product: Design) => void;
}

const FashionCard: React.FC<FashionCardProps> = ({
  product,
  // onSelect,
  // onAddToCart,
  // onToggleFavorite,
}) => {
  const getCategoryColor = (category: Design["designTypeId"]) => {
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
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          transition: "all 0.3s ease",
          boxShadow: 3,
        },
        "&:hover .card-hover-content": {
          opacity: 1,
          transform: "translateY(0)",
        },
        borderRadius: "10px",
      }}
    >
      {/* Product Tag */}
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
        {/* {product.isNew && (
          <Chip
            label="Mới"
            size="small"
            sx={{ mb: 1, bgcolor: "#e91e63", color: "white" }}
          />
        )} */}
        {/* {product.isBestSeller && (
          <Chip
            label="Bán Chạy Nhất"
            size="small"
            sx={{
              mb: 1,
              backgroundColor: "rgba(245, 144, 56, 1)",
              color: "white",
            }}
          />
        )} */}
        <Chip
          icon={<EcoIcon />}
          label={`${product.recycledPercentage}% Tái Chế`}
          size="small"
          sx={{
            backgroundColor: "rgba(200, 248, 217, 1)",
            color: "rgba(22, 103, 86, 1)",
            fontSize: "15px",
          }}
        />
      </Box>
      {/* Favorite */}
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

      {/* Product Image */}
      <Link
        href={`/detail/${product.designId}`}
        sx={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          height="360"
          // image={product.image}
          image={ao_linen}
          alt={product.name}
          sx={{ width: "100%", objectFit: "cover" }}
        />
      </Link>
      {/* Content */}
      <CardContent
        className="card-hover-content"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60%",
          background: "rgba(255, 255, 255, 1)",
          textAlign: "left",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: 0,
          transform: "translateY(20px)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "90%",
            margin: "auto",
          }}
        >
          <Link
            href={`/detail/${product.designId}`}
            sx={{ textDecoration: "none", flexGrow: 1 }}
          >
            <Box component="a">
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
                  // label={product.category.toUpperCase()}
                  label={product.designId}
                  size="small"
                  sx={{
                    bgcolor: getCategoryColor(product.designId),
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {product.designerId}
                </Typography>
              </Box>
              {/* Design Name */}
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: "25px",
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "black",
                }}
              >
                {product.name}
              </Typography>
              {/* Rating */}
              <Box display="flex" alignItems="center">
                <Rating
                  value={Math.round(product.productScore)}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" ml={1}>
                  ({product.productScore})
                </Typography>
              </Box>
              {/* Design Price */}
              <Box
                sx={{
                  mb: 1,
                  minHeight: 56,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* {!product.price.original && (
                  <Typography
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#2e7d32",
                      margin: "auto 0",
                      fontSize: "28px",
                    }}
                  >
                    {formatPrice(product.price)}
                  </Typography>
                )} */}
                {/* {product.price.original && ( */}
                <Box>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#2e7d32" }}
                  >
                    {/* {formatPrice(product.price)} */}
                    {product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontSize: "0.875rem",
                    }}
                  >
                    {/* {formatOriginalPrice(product.Price)}
                     */}
                    {product.price}
                  </Typography>
                </Box>
                {/* )} */}
              </Box>
              {/* Material */}
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
                {/* {product.materials.map((mat, index) => (
                  <Chip
                    key={index}
                    label={`${mat.name} (${mat.percentageUse}%)`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(220, 252, 231, 1)",
                      color: "rgba(29, 106, 58, 1)",
                    }}
                  />
                ))} */}
              </Box>
              {/* Available */}
              {/* <Box sx={{ margin: "10px 0" }}>
                <Chip
                  label={getAvailabilityText(product.availability)}
                  size="small"
                  color={getAvailabilityColor(product.availability)}
                  icon={<LocalShipping sx={{ fontSize: 16 }} />}
                />
              </Box> */}
            </Box>
          </Link>

          {/* Add To Cart */}
          {/* <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "rgba(22, 163, 74, 1)",
            }}
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              e.preventDefault(); // prevent Link
            }}
          >
            <AddToCart />
            Thêm vào Cart
          </Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FashionCard;
