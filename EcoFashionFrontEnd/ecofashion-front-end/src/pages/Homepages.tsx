import {
  AppBar,
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  ListItem,
  List,
  Container,
  IconButton,
  Card,
  Chip,
  CardMedia,
  CardContent,
  Rating,
  Select,
  MenuItem,
  Link,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import banner from "../assets/pictures/banner.jpg";
import post from "../assets/pictures/product-post.png";
import fashion from "../assets/pictures/fashion.png";
import material from "../assets/pictures/material.png";
import information from "../assets/pictures/information.png";
//example
import ao_linen from "../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../assets/pictures/example/dam-con-trung.webp";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { UserAuth } from "../services/AuthContext";

//Icon
import { AddToCart, EcoIcon, FavoriteBorderIcon } from "../assets/icons/icon";

const products = [
  {
    id: 1,
    title: "Áo Linen",
    author: "Nguyễn Công Trí",
    image: ao_linen, // replace with actual image paths
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 90,
    material: ["Vải Cotton", "Vải Linen"],
  },
  {
    id: 2,
    title: "Chân Váy Đắp",
    author: "Nguyễn Công Trí",
    image: chan_vay_dap,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 95,
    material: ["Vải Cotton", "Vải Linen", "Vải Sợi"],
  },
  {
    id: 3,
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
  },
  {
    id: 4,
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
  },
];

const StyledInput = styled(InputBase)({
  borderRadius: 20,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  flex: 1,
});

export default function Homepage() {
  const NewDesignCard = ({ product }: { product: any }) => (
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
        <Chip label="New" color="primary" size="small" sx={{ mb: 1 }} />
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

      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Link href={`/detail/${product.id}`} style={{ justifyContent: "center" }}>
        <CardMedia
          component="img"
          height="240"
          image={product.image}
          alt={product.title}
        />
      </Link>

      <CardContent
        sx={{
          textAlign: "left",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: "30px",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </Typography>
        <Typography color="text.secondary">Bởi {product.author}</Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" ml={1}>
            ({product.rating})
          </Typography>
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
          {product.material.map((mat: any, index: any) => (
            <Chip
              key={index}
              label={mat}
              size="small"
              sx={{
                backgroundColor: "rgba(220, 252, 231, 1)",
                color: "rgba(29, 106, 58, 1)",
              }}
            />
          ))}
        </Box>

        <Typography fontWeight="bold" mt={1}>
          {product.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: "rgba(22, 163, 74, 1)",
          }}
        >
          <AddToCart />
          Thêm vào Cart
        </Button>
      </CardContent>
    </Card>
  );
  const BestDesignCard = ({ product }: { product: any }) => (
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
        <Chip
          label="Bán Chạy Nhất"
          size="small"
          sx={{
            mb: 1,
            backgroundColor: "rgba(245, 144, 56, 1)",
            color: "white",
          }}
        />
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

      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Link href={`/detail/${product.id}`} style={{ justifyContent: "center" }}>
        <CardMedia
          component="img"
          height="240"
          image={product.image}
          alt={product.title}
        />
      </Link>

      <CardContent
        sx={{
          textAlign: "left",
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: "30px",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </Typography>
        <Typography color="text.secondary">Bởi {product.author}</Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" ml={1}>
            ({product.rating})
          </Typography>
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
          {product.material.map((mat: any, index: any) => (
            <Chip
              key={index}
              label={mat}
              size="small"
              sx={{
                backgroundColor: "rgba(220, 252, 231, 1)",
                color: "rgba(29, 106, 58, 1)",
              }}
            />
          ))}
        </Box>

        <Typography fontWeight="bold" mt={1}>
          {product.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: "rgba(22, 163, 74, 1)",
          }}
        >
          <AddToCart />
          Thêm vào Cart
        </Button>
      </CardContent>
    </Card>
  );
  const { user } = UserAuth();
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Nav Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          margin: "auto",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      ></AppBar>
      {/* Banner */}
      <Box sx={{ position: "relative" }}>
        <img
          src={banner}
          alt="EcoFashion Banner"
          style={{ width: "100%", height: 580, objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "60%",
              backgroundColor: "rgba(145, 136, 136, 0.42)",
              margin: "auto",
            }}
          >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Kiến Tạo Phong Cách, Gắn Kết Cộng Đồng, Hướng Tới{" "}
              <span style={{ color: "#32e087" }}>Thời Trang Bền Vững</span>
            </Typography>
          </Box>
          <Typography sx={{ width: "60% ", margin: "auto", fontSize: "25px" }}>
            Cùng Tham Gia Thay Đổi Ngành Thời Trang Với Vật Liệu Tái Chế Và
            Thiết Kế Thân Thiện Với Môi Trường
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "white",
              p: 0.5,
              width: "60%",
              border: "1px solid black",
              margin: "30px auto",
            }}
          >
            <Box
              sx={{
                borderRight: "1px solid black",
                height: "100%",
              }}
            >
              <Select
                defaultValue="all"
                sx={{
                  border: "none",
                  fontSize: 14,
                  minWidth: 100,
                  "& fieldset": { border: "none" },
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="products">Thời trang</MenuItem>
                <MenuItem value="material">Vật liệu</MenuItem>
              </Select>
            </Box>

            <StyledInput
              placeholder="Tìm kiếm.."
              fullWidth
              sx={{ border: "none" }}
            />
          </Box>
          {user ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              width={"50%"}
              margin={"auto"}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  THỜI TRANG
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  VẬT LIỆU
                </Typography>
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  px: 4,
                  py: 1.5,
                }}
                href="/businessinfor?tab=designer"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Nhà Thiết Kế
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  px: 4,
                  py: 1.5,
                }}
                href="/businessinfor?tab=supplier"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Nhà Cung Cấp
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                }}
                href="/register"
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    margin: "0 auto",
                    alignItems: "center",
                    padding: "10px 20px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Đăng ký
                </Box>
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      {/* Thông Tin Bền Vững */}
      <Box
        sx={{
          backgroundColor: "#f3f3f3",
          padding: "40px 10px",
          backgroundImage: `
          linear-gradient(0deg,
            transparent 24%,
            #e1e1e1 25%,
            #e1e1e1 26%,
            transparent 27%,
            transparent 74%,
            #e1e1e1 75%,
            #e1e1e1 76%,
            transparent 77%,
            transparent
          ),
          linear-gradient(90deg,
            transparent 24%,
            #e1e1e1 25%,
            #e1e1e1 26%,
            transparent 27%,
            transparent 74%,
            #e1e1e1 75%,
            #e1e1e1 76%,
            transparent 77%,
            transparent
          )
        `,
          backgroundSize: "55px 55px",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ maxWidth: 1200, margin: "0 auto" }}
        >
          {[
            { quantity: "500", unit: "+", label: "Nhà Thiết Kế" },
            { quantity: "500", unit: "+", label: "Vật Liệu Tái Chế" },
            { quantity: "5000", unit: "+", label: "Sản Phẩm Bền Vững" },
            { quantity: "300", unit: "t", label: "NL Tái Sử Dụng" },
          ].map((item, index) => (
            <Grid key={index} textAlign="center">
              <Typography
                variant="h3"
                component="div"
                sx={{ color: "rgba(52, 168, 83, 1)", fontWeight: "bold" }}
              >
                {item.quantity}
                <Typography
                  component="span"
                  sx={{ fontSize: "2.5rem", marginLeft: "4px" }}
                >
                  {item.unit}
                </Typography>
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", fontSize: "30px", color: "black" }}
              >
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Truy Cập Nhanh  */}
      <Grid sx={{ maxWidth: 1200, margin: "30px auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "30px auto",
            gap: 5,
          }}
        >
          <Box>
            <Box
              component="img"
              src={post}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Cho mọi người thấy sự sáng tạo của bạn
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Đăng Sản Phẩm{" "}
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>

          <Box>
            <Box
              component="img"
              src={fashion}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Khám phá xu hướng thời trang hiện nay
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Khám Phá
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>

          <Box>
            <Box
              component="img"
              src={material}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Lựa chọn chất liệu tái chế chất lượng tuyệt vời
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Mua Bán
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
      {/* Bán Hàng */}
      <Box
        sx={{
          p: 4,
          background: "#f5f5f5",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        {/* Thời Trang Mới */}
        <Box sx={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2" fontWeight="bold">
              THỜI TRANG MỚI
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
            {products.map((item, index) => (
              <NewDesignCard product={item} />
            ))}
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>
        {/* Bán Chạy Nhất */}
        <Box sx={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2" fontWeight="bold">
              BÁN CHẠY NHẤT
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
            {products.map((item, index) => (
              <BestDesignCard product={item} />
            ))}
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>

        {/* Nguyên Vật Liệu */}
        <Box sx={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h2" fontWeight="bold">
              NGUYÊN LIỆU
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
            {products.map((item, index) => (
              <NewDesignCard product={item} />
            ))}
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>
      </Box>
      {/* Thông Tin Chi Tiết */}
      <Box sx={{ bgcolor: "#fff", py: 6, px: 4, display: "flex" }}>
        {/* Text Section */}
        <Grid>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Hướng tới Thời trang Bền vững
          </Typography>
          <Typography>
            Ngành thời trang là một trong những ngành gây ô nhiễm lớn nhất trên
            toàn cầu. Tại EcoFashion, chúng tôi đang thay đổi điều đó bằng cách
            thúc đẩy các nguyên tắc kinh tế tuần hoàn và thực hành bền vững.
          </Typography>

          <List sx={{ mt: 3 }}>
            {/* Item 1 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Giảm Thiểu Rác Thải</Typography>
                <Typography>
                  Nền tảng của chúng tôi đã góp phần chuyển hướng hơn 5 tấn rác
                  thải dệt may khỏi bãi chôn lấp.
                </Typography>
              </Box>
            </ListItem>

            {/* Item 2 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Bảo Tồn Nguồn Nước</Typography>
                <Typography>
                  Các sản phẩm trên nền tảng của chúng tôi sử dụng ít hơn 70%
                  lượng nước so với thời trang thông thường.
                </Typography>
              </Box>
            </ListItem>

            {/* Item 3 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Giảm Dấu Chân Carbon</Typography>
                <Typography>
                  Việc tối ưu hóa chuỗi cung ứng của chúng tôi giúp giảm lượng
                  khí thải carbon lên đến 60%.
                </Typography>
              </Box>
            </ListItem>
          </List>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#00a651",
              "&:hover": { bgcolor: "#008b45" },
            }}
          >
            Tìm hiểu thêm ➞
          </Button>
        </Grid>

        {/* Image Section */}
        <Grid display="flex" justifyContent="center">
          <Box
            component="img"
            src={information}
            alt="Sustainable Fashion"
            sx={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>
      </Box>
      {/* About Us */}
      <Box
        sx={{
          backgroundColor: "rgba(18, 96, 77, 1)",
          textAlign: "center",
          py: 5,
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
            Tham Gia Vào EcoFashion
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "20px",
              width: "80%",
              mx: "auto",
              mb: 3,
            }}
          >
            Dù bạn là nhà thiết kế, nhà cung cấp hay người có ý thức về Bảo Vệ
            Môi trường, cộng đồng của chúng tôi luôn có chỗ dành cho bạn.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgba(52, 168, 83, 1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                fontWeight: "bold",
              }}
            >
              Đăng Ký
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#ddd",
                },
              }}
            >
              Về Chúng Tôi
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
