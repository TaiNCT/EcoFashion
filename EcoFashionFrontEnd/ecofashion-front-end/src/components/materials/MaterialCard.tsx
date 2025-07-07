import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Recycling, LocalShipping } from "@mui/icons-material";
import type { Material } from "../../types/Material";

interface MaterialCardProps {
  material: Material;
  onSelect?: (material: Material) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onSelect }) => {
  const getTypeColor = (type: Material["type"]) => {
    const colors = {
      organic: "#4caf50",
      recycled: "#2196f3",
      natural: "#8bc34a",
      synthetic: "#ff9800",
    };
    return colors[type] || "#9e9e9e";
  };

  const getAvailabilityColor = (availability: Material["availability"]) => {
    const colors = {
      "in-stock": "success" as const,
      limited: "warning" as const,
      "out-of-stock": "error" as const,
    };
    return colors[availability];
  };

  const getSustainabilityScore = (
    sustainability: Material["sustainability"]
  ) => {
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
  };

  const sustainabilityScore = getSustainabilityScore(material.sustainability);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: onSelect ? "pointer" : "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": onSelect
          ? {
              transform: "translateY(-4px)",
              boxShadow: 3,
            }
          : {},
      }}
      onClick={() => onSelect?.(material)}
    >
      <CardMedia
        component="img"
        height="180"
        image={material.image}
        alt={material.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
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
            sx={{ fontWeight: "bold", flex: 1, fontSize: "1rem" }}
          >
            {material.name}
          </Typography>
          <Chip
            size="small"
            label={material.type}
            sx={{
              bgcolor: getTypeColor(material.type),
              color: "white",
              fontWeight: "bold",
              ml: 1,
              fontSize: "0.7rem",
            }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, fontSize: "0.8rem" }}
        >
          {material.supplier}
        </Typography>

        {material.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5, fontSize: "0.8rem", lineHeight: 1.3 }}
          >
            {material.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Recycling sx={{ color: "#4caf50", mr: 1, fontSize: 18 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", fontSize: "0.8rem" }}
          >
            Sustainability: {sustainabilityScore}%
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ fontWeight: "bold", color: "#4caf50", fontSize: "0.9rem" }}
          >
            {material.price}
          </Typography>
          <Chip
            size="small"
            label={material.availability}
            color={getAvailabilityColor(material.availability)}
            icon={<LocalShipping sx={{ fontSize: "0.8rem" }} />}
            sx={{ fontSize: "0.7rem" }}
          />
        </Box>

        {/* Sustainability highlights */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {material.sustainability.recycledContent && (
            <Chip
              size="small"
              label={`${material.sustainability.recycledContent}% Recycled`}
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: "20px" }}
            />
          )}
          {material.sustainability.waterSaved && (
            <Chip
              size="small"
              label={`${material.sustainability.waterSaved}% Water Saved`}
              variant="outlined"
              sx={{ fontSize: "0.6rem", height: "20px" }}
            />
          )}
          {material.sustainability.biodegradable && (
            <Chip
              size="small"
              label="Biodegradable"
              variant="outlined"
              color="success"
              sx={{ fontSize: "0.6rem", height: "20px" }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
