import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Rating,
  Select,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
//Icon
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import RecyclingIcon from "@mui/icons-material/Recycling";
import ScienceIcon from "@mui/icons-material/Science";
import BuildIcon from "@mui/icons-material/Build";
import FactoryIcon from "@mui/icons-material/Factory";
//Example
import ao_linen from "../../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../../assets/pictures/example/dam-con-trung.webp";
const Collection = [
  { collection_Id: 1, collection_name: "Áo Linen", image: ao_linen },
  { collection_Id: 2, collection_name: "Chân Váy Mây", image: chan_vay_dap },
  { collection_Id: 3, collection_name: "Đầm Côn Trùng", image: dam_con_trung },
];

export default function AddDesign() {
  //Tabs
  //Change Tabs
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const [selectedCollection, setSelectedCollection] = useState("");

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <Box sx={{ width: "95%", margin: "auto" }}>
      {/* Top Part */}
      <Box sx={{ width: "100%", display: "flex" }}>
        {/* Title */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
              Thêm Sản Phẩm
            </Typography>
            <Typography>Thêm Sản Phẩm Mới Vào Cửa Hàng Của Mình</Typography>
          </Box>
          <Button variant="outlined" disableRipple>
            <Select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              displayEmpty
              sx={{
                border: "none",
                "& fieldset": { border: "none" },
                fontWeight: "bold",
              }}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value="" disabled>
                Chọn Mẫu Có Sẵn
              </MenuItem>

              {Collection.map((item) => (
                <MenuItem key={item.collection_Id} value={item.collection_Id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.collection_name}
                      sx={{
                        width: 28,
                        height: 28,
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <Typography fontSize={14}>
                      {item.collection_name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Button>
        </Box>
      </Box>
      {/* Tabs */}
      {/* Tab Part */}
      <Box
        sx={{
          width: "50%",
          background: "rgba(241, 245, 249, 1)",
          display: "flex",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          sx={{
            width: "100%",
            margin: "auto",
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "rgba(22, 163, 74)",
              borderRadius: "2px",
            },
          }}
        >
          <Tab
            label="Chi Tiết"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />

          <Tab
            label="Vật Liệu"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
          <Tab
            label="Ảnh"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
          <Tab
            label="Xem Trước"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
        </Tabs>
      </Box>
      {/* Tab Chi Tiết */}
      {tabIndex === 0 && (
        <Box
          p={3}
          borderRadius={2}
          border="1px solid #eee"
          sx={{ display: "flex", flexDirection: "column", margin: "10px 0" }}
        >
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Chi Tiết Sản Phẩm
          </Typography>

          <Grid
            container
            spacing={3}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {/* Tên sản phẩm */}
            <Grid sx={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                placeholder="Nhập vào"
              />
            </Grid>

            {/* Ngành hàng */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Grid sx={{ width: "100%" }}>
                <TextField select fullWidth label="Ngành hàng" defaultValue="1">
                  <MenuItem key="1" value="1" disabled>
                    Chọn
                  </MenuItem>
                  <MenuItem key="Thời Trang" value="Thời Trang">
                    Thời Trang
                  </MenuItem>
                  <MenuItem key="Phụ Kiện" value="Phụ Kiện">
                    Phụ Kiện
                  </MenuItem>
                  <MenuItem key="Khác key" value="Khác">
                    Khác
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid sx={{ width: "100%" }}>
                <TextField fullWidth label="Giá" placeholder="Nhập vào" />
              </Grid>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 2,
                }}
              >
                {/* Mô tả sản phẩm & Đặc điểm */}
                <Grid flex={1}>
                  <TextField
                    label="Mô tả sản phẩm"
                    multiline
                    rows={5}
                    placeholder="Nhập vào"
                    sx={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Hướng dẫn bảo quản"
                    multiline
                    rows={5}
                    placeholder="Nhập vào"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Box>
              ;
              <Grid flex={1}>
                <Typography fontWeight="bold" mb={1}>
                  Đặc Điểm
                </Typography>
                <FormGroup
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <RecyclingIcon fontSize="small" />
                        Giảm Thiểu Rác Thải
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <ScienceIcon fontSize="small" />
                        Thuốc nhuộm và quy trình ít tác động đến môi trường
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <BuildIcon fontSize="small" />
                        Kết cấu bền chắc sử dụng lâu dài
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <FactoryIcon fontSize="small" />
                        Quy trình sản xuất có trách nhiệm
                      </Box>
                    }
                  />
                </FormGroup>
              </Grid>
            </Box>
            {/* Giá & Hướng dẫn bảo quản */}

            {/* Chọn Chất Liệu */}
            <Grid>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={(e) => handleChangeTab(e, tabIndex + 1)}
                >
                  Chọn Chất Liệu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {/* Tab Vật Liệu  */}
      {tabIndex === 1 && <div> Tabs 2</div>}
      {/* Tab Ảnh*/}
      {tabIndex === 2 && <div> Tabs 3</div>}
      {/* Tab Xem Trước*/}
      {tabIndex === 3 && <div> Tabs 4</div>}
    </Box>
  );
}
