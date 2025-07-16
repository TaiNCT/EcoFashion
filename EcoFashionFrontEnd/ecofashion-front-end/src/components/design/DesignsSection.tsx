import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import FashionCard from "../fashion/FashionCard";
import type { Fashion } from "../../types/Fashion";
interface ProductsSectionProps {
  products: Fashion[];
  id?: any;
  onProductSelect?: (product: Fashion) => void;
  onAddToCart?: (product: Fashion) => void;
  onToggleFavorite?: (product: Fashion) => void;
  onViewMore?: () => void;
  showViewMore?: boolean;
}

const DesignsSection: React.FC<ProductsSectionProps> = ({
  products,
  id,
  onProductSelect,
  onAddToCart,
  onToggleFavorite,
  onViewMore,
  // showViewMore = true,
}) => {
  if (products.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            height: 200,
            bgcolor: "#f0f8f0",
            borderRadius: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Đang cập nhật sản phẩm...
          </Typography>
        </Box>
      </Container>
    );
  }
  //Pagination
  const productsPerPage = 12; // 9 rows * 4 per row
  const [page, setPage] = useState(1);
  //Jump To Anchor
  const handlePageScrollChange = (id: string, value: number) => {
    setPage(value);

    const element = document.getElementById(id);
    const navbarHeight =
      document.querySelector(".MuiAppBar-root")?.clientHeight || 0;

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [page, products]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Grid container spacing={2}>
        {paginatedProducts.map((product) => (
          <Grid key={product.id} size={3}>
            <FashionCard
              product={product}
              onSelect={onProductSelect}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            if (id) handlePageScrollChange(id, value);
          }}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default DesignsSection;
