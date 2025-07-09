import React from "react";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import FashionCard from "./FashionCard";
import type { Fashion } from "../../types/Fashion";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
interface ProductsSectionProps {
  products: Fashion[];
  title?: string;
  onProductSelect?: (product: Fashion) => void;
  onAddToCart?: (product: Fashion) => void;
  onToggleFavorite?: (product: Fashion) => void;
  onViewMore?: () => void;
  showViewMore?: boolean;
}

const FashionsSection: React.FC<ProductsSectionProps> = ({
  products,
  title = "SẢN PHẨM",
  onProductSelect,
  onAddToCart,
  onToggleFavorite,
  onViewMore,
  // showViewMore = true,
}) => {
  if (products.length === 0) {
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

  return (
    <Box
      sx={{
        borderBottom: "1px solid black",
        marginBottom: "30px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: "90%",
        margin: "auto",
        paddingTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="bold">
          {title}
        </Typography>
        <Box>
          <IconButton>
            <ArrowBack sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            <ArrowForward sx={{ fontSize: "40px" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "auto",
          width: "100%",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {products.map((product) => (
          <FashionCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </Box>

      <Box sx={{ textAlign: "center", paddingTop: 2, paddingBottom: 2 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={onViewMore}
          sx={{
            color: "rgba(22, 163, 74, 1)",
            borderColor: "rgba(22, 163, 74, 1)",
            fontWeight: "bold",
          }}
        >
          XEM THÊM SẢN PHẨM
        </Button>
      </Box>
    </Box>
    // <Container maxWidth="lg" sx={{ mb: 6 }}>
    //   <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
    //     {title}
    //   </Typography>

    //   <Box
    //     sx={{
    //       display: "grid",
    //       gridTemplateColumns: {
    //         xs: "1fr",
    //         sm: "1fr 1fr",
    //         md: "1fr 1fr 1fr",
    //         lg: "1fr 1fr 1fr 1fr",
    //       },
    //       gap: 3,
    //       mb: 3,
    //     }}
    //   >
    //     {products.map((product) => (
    //       <FashionCard
    //         key={product.id}
    //         product={product}
    //         onSelect={onProductSelect}
    //         onAddToCart={onAddToCart}
    //         onToggleFavorite={onToggleFavorite}
    //       />
    //     ))}
    //   </Box>

    //   {showViewMore && (
    //     <Box sx={{ textAlign: "center" }}>
    //       <Button
    //         variant="outlined"
    //         size="large"
    //         onClick={onViewMore}
    //         sx={{ color: "#4caf50", borderColor: "#4caf50" }}
    //       >
    //         XEM THÊM SẢN PHẨM
    //       </Button>
    //     </Box>
    //   )}
    // </Container>
  );
};

export default FashionsSection;
