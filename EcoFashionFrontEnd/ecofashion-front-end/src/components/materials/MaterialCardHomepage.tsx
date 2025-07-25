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
  SwipeableDrawer,
  styled,
  Drawer,
} from "@mui/material";
import { FavoriteBorderOutlined, LocalShipping, Recycling, Star } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import type { MaterialDetailDto } from "../../types/Material";
import { DemoUtils } from "../../utils/DemoUtils";

interface MaterialCardHomepageProps {
  material: MaterialDetailDto;
  onSelect?: (material: MaterialDetailDto) => void;
}

const MaterialCardHomepage: React.FC<MaterialCardHomepageProps> = ({
  material,
  onSelect,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getTypeColor = (typeName?: string) => {
    if (!typeName) return "#9e9e9e";
    
    const type = typeName.toLowerCase();
    if (type.includes('organic')) return "#4caf50";
    if (type.includes('recycled')) return "#2196f3";
    if (type.includes('natural')) return "#8bc34a";
    if (type.includes('synthetic')) return "#ff9800";
    return "#9e9e9e";
  };

  const getAvailabilityColor = (quantity: number) => {
    if (quantity === 0) return "error" as const;
    if (quantity <= 10) return "warning" as const;
    return "success" as const;
  };

  const getAvailabilityText = (quantity: number) => {
    if (quantity === 0) return "Hết hàng";
    if (quantity <= 10) return "Số lượng có hạn";
    return "Còn hàng";
  };

  const getSustainabilityScore = (recycledPercentage: number) => {
    // Base score from recycled percentage
    let score = recycledPercentage;
    
    // Bonus points for high recycled content
    if (recycledPercentage >= 80) score += 20;
    else if (recycledPercentage >= 50) score += 10;
    
    return Math.min(score, 100);
  };

  const sustainabilityScore = getSustainabilityScore(material.recycledPercentage);
  const mainImage = material.imageUrls.length > 0 ? material.imageUrls[0] : "/assets/default-material.jpg";

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(material);
    } else {
      setDrawerOpen(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: 450,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
          },
          position: "relative",
        }}
        onClick={handleCardClick}
      >
        {/* Favorite Button */}
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <FavoriteBorderOutlined
            sx={{
              color: isFavorite ? "#f44336" : grey[600],
            }}
          />
        </IconButton>

        {/* Material Image */}
        <CardMedia
          component="img"
          height="200"
          image={mainImage}
          alt={material.name || "Material"}
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Title and Type */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: "bold",
                flex: 1,
                fontSize: "1rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {material.name || "Unnamed Material"}
            </Typography>
            <Chip
              size="small"
              label={material.materialTypeName || "Unknown"}
              sx={{
                bgcolor: getTypeColor(material.materialTypeName),
                color: "white",
                fontWeight: "bold",
                ml: 1,
                fontSize: "0.7rem",
              }}
            />
          </Box>

          {/* Supplier */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 0.5,
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {material.supplier.supplierName || "Unknown Supplier"}
          </Typography>

          {/* Description */}
          {material.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.75rem",
                lineHeight: 1.3,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                mb: 1,
              }}
            >
              {material.description}
            </Typography>
          )}

          {/* Supplier Rating */}
          {material.supplier.rating && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Star sx={{ color: "#ffc107", mr: 0.5, fontSize: 16 }} />
              <Rating
                value={material.supplier.rating}
                readOnly
                size="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
                ({material.supplier.reviewCount || 0})
              </Typography>
            </Box>
          )}

          {/* Sustainability Score */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Recycling sx={{ color: "#4caf50", mr: 1, fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.75rem" }}
            >
              Sustainability: {sustainabilityScore.toFixed(0)}%
            </Typography>
          </Box>

          {/* Price and Availability */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#4caf50",
                fontSize: "0.85rem",
              }}
            >
              {DemoUtils.formatPrice(material.pricePerUnit)}
            </Typography>
            <Chip
              size="small"
              label={getAvailabilityText(material.quantityAvailable)}
              color={getAvailabilityColor(material.quantityAvailable)}
              icon={<LocalShipping sx={{ fontSize: "0.8rem" }} />}
              sx={{ fontSize: "0.65rem" }}
            />
          </Box>

          {/* Sustainability highlights */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "auto" }}>
            <Chip
              size="small"
              label={`${material.recycledPercentage.toFixed(1)}% Recycled`}
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: "20px" }}
            />
            {material.sustainabilityCriteria.length > 0 && (
              <Chip
                size="small"
                label={`${material.sustainabilityCriteria.length} Criteria`}
                variant="outlined"
                sx={{ fontSize: "0.6rem", height: "20px" }}
              />
            )}
            {material.benchmarks.length > 0 && (
              <Chip
                size="small"
                label={`${material.benchmarks.length} Benchmarks`}
                variant="outlined"
                sx={{ fontSize: "0.6rem", height: "20px" }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Detail Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            p: 3,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {material.name || "Material Details"}
          </Typography>
          
          <CardMedia
            component="img"
            height="200"
            image={mainImage}
            alt={material.name || "Material"}
            sx={{ objectFit: "cover", borderRadius: 1, mb: 2 }}
          />

          <Typography variant="body1" sx={{ mb: 2 }}>
            {material.description || "No description available"}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Supplier Information
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {material.supplier.supplierName}
            </Typography>
            {material.supplier.bio && (
              <Typography variant="body2">
                <strong>Bio:</strong> {material.supplier.bio}
              </Typography>
            )}
            {material.supplier.rating && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating value={material.supplier.rating} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({material.supplier.reviewCount || 0} reviews)
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sustainability Details
            </Typography>
            <Typography variant="body2">
              <strong>Recycled Content:</strong> {material.recycledPercentage.toFixed(1)}%
            </Typography>
            <Typography variant="body2">
              <strong>Sustainability Score:</strong> {sustainabilityScore.toFixed(0)}%
            </Typography>
            {material.sustainabilityCriteria.length > 0 && (
              <Typography variant="body2">
                <strong>Criteria Met:</strong> {material.sustainabilityCriteria.length}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Pricing & Availability
            </Typography>
            <Typography variant="h5" color="#4caf50" fontWeight="bold">
              {DemoUtils.formatPrice(material.pricePerUnit)}
            </Typography>
            <Typography variant="body2">
              <strong>Available:</strong> {material.quantityAvailable} units
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#45a049" },
            }}
            onClick={() => {
              // TODO: Add to cart or contact supplier logic
              console.log("Contact supplier for:", material.name);
            }}
          >
            Liên Hệ Nhà Cung Cấp
          </Button>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MaterialCardHomepage; 