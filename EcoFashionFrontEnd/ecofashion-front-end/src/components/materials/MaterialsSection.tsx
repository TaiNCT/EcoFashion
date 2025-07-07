import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import MaterialCard from "./MaterialCard";
import type { Material } from "../../types/Material";

interface MaterialsSectionProps {
  materials: Material[];
  title?: string;
  onMaterialSelect?: (material: Material) => void;
  onViewMore?: () => void;
  showViewMore?: boolean;
}

const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  materials,
  title = "NGUYÊN LIỆU",
  onMaterialSelect,
  onViewMore,
  showViewMore = true,
}) => {
  if (materials.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            height: 200,
            bgcolor: "#e8f5e8",
            borderRadius: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Đang cập nhật nguyên liệu...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
          mb: 3,
        }}
      >
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            onSelect={onMaterialSelect}
          />
        ))}
      </Box>

      {showViewMore && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onViewMore}
            sx={{ color: "#4caf50", borderColor: "#4caf50" }}
          >
            XEM THÊM NGUYÊN LIỆU
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MaterialsSection;
