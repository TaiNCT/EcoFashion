import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  colors,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DesignService } from "../../services/api";
import { toast } from "react-toastify";
import {
  DesignType,
  MaterialType,
  StoredMaterial,
} from "../../services/api/designService";
//Icon
import { DraftIcon, EcoIcon } from "../../assets/icons/icon";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
//Generate UUid
import { v4 as uuidv4 } from "uuid";

const materials = [
  {
    label: "Vải Cotton Organic",
    value: "cotton",
    type: "Chính",
    origin: "Ấn Độ",
    certifications: ["GOTS", "OCS"],
    efficiency: 85,
  },
  {
    label: "Lót Bamboo",
    value: "bamboo",
    type: "Lót",
    origin: "Việt Nam",
    certifications: ["FSC", "OEKO-TEX"],
    efficiency: 88,
  },
];

export default function AddDesignDraft() {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(0);
  const [mainMaterial, setMainMaterial] = useState("cotton");
  const [liningMaterial, setLiningMaterial] = useState("bamboo");
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Design Data
  const [material, setMaterial] = useState<StoredMaterial[]>([]);

  //Design Type Data
  const [designType, setDesignType] = useState<DesignType[]>([]);

  //Material Type Data
  const [materialType, setMaterialType] = useState<MaterialType[]>([]);

  //Get Design Type
  const [designTypeData, setDesignTypeData] = useState("");

  const handleChangeDesign = (event: SelectChangeEvent) => {
    setDesignTypeData(event.target.value as string);
  };

  //Get Material Data
  useEffect(() => {
    loadStoredMaterial();
  }, []);

  const loadStoredMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      const materialData = await DesignService.getMaterial();
      setMaterial(materialData);

      const designTypeData = await DesignService.getDesignType();
      setDesignType(designTypeData);

      const materialTypeData = await DesignService.getMaterialType();
      setMaterialType(materialTypeData);
      console.log(materialTypeData);
    } catch (error: any) {
      const errorMessage =
        error.message || "Không thể tải danh sách nhà thiết kế";
      setError(errorMessage);
      toast.error(errorMessage, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  type CardData = {
    id: string;
    label: string;
    width: number;
    height: number;
    materialType: {
      typeId: number;
      typeName: string;
    };
    // (Add more fields later if needed)
  };

  const [cards, setCards] = useState<CardData[]>([]);

  const handleAddCard = () => {
    const newId = uuidv4();
    setCards((prev) => [
      ...prev,
      {
        id: newId,
        label: "main",
        width: 0,
        height: 0,
        materialType: {
          typeId: null,
          typeName: "",
        },
      },
    ]);
  };

  const handleRemoveCard = (idToRemove: string) => {
    setCards((prev) => prev.filter((card) => card.id !== idToRemove));
  };

  //Change Label
  const handleChangeLabel = (id: string, newLabel: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, label: newLabel } : card))
    );
  };

  //Change Width
  const handleChangeWidth = (id: string, newWidth: number) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, width: newWidth } : card))
    );
  };

  //Change Height
  const handleChangeHeight = (id: string, newHeigth: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, height: newHeigth } : card
      )
    );
  };

  //Change Material Type
  const handleMaterialTypeChange = (
    cardId: string,
    typeId: number,
    typeName: string
  ) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, materialType: { typeId, typeName } }
          : card
      )
    );
  };

  return (
    <Box>
      {/* Appbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          paddingLeft: 2,
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/designer/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary">Máy Tính EcoFashion</Typography>
        </Breadcrumbs>
      </AppBar>
      {/* Top Part */}
      <Box sx={{ width: "100%", display: "flex", padding: 2 }}>
        {/* Title */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <EcoIcon />
              <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
                Máy Tính EcoFashion
              </Typography>
            </Box>
            <Typography>
              Tính toán nguyên vật liệu bền vững và đánh giá tác động môi trường
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              padding: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<SaveAltIcon />}
              sx={{
                color: "black",
                borderColor: "black",
                textTransform: "none",
              }}
            >
              Mẫu
            </Button>
            <Button
              variant="outlined"
              startIcon={<SaveOutlinedIcon />}
              sx={{
                color: "black",
                borderColor: "black",
                textTransform: "none",
              }}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              startIcon={<ShareOutlinedIcon sx={{ color: "white" }} />}
              sx={{
                backgroundColor: "rgba(22, 163, 74, 1)",
                color: "white",
                borderColor: "rgba(22, 163, 74, 1)",
                textTransform: "none",
              }}
            >
              Chia Sẻ
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Mid Part */}
      <Box sx={{ width: "100%", padding: 2 }}>
        {/* Đánh Giá Bền Vững */}
        <Box
          sx={{
            bgcolor: "#f0fff5",
            p: 1,
            borderRadius: 2,
            border: "1px solid #d2f5e8",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Tittle */}
          <Box sx={{ display: "flex", mb: 2, width: "100%" }}>
            <WorkspacePremiumOutlinedIcon sx={{ color: "green", mr: 1 }} />
            <Typography fontWeight="bold" fontSize="1.2rem">
              Đánh Giá Bền Vững
            </Typography>
          </Box>
          {/* Chỉ Số Bền Vững */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            {/* Tổng thể */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Typography
                fontSize="2rem"
                color="rgba(22, 163, 74, 1)"
                fontWeight="bold"
              >
                0/100
              </Typography>
              <Typography color="rgba(22, 163, 74, 1)">
                Điểm tổng thể
              </Typography>
              {/* <Typography color="error" fontSize="0.875rem">
                Cần cải thiện
              </Typography> */}
            </Grid>

            {/* Carbon */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Typography color="primary" fontWeight="bold" fontSize="1.5rem">
                0 kg
              </Typography>
              <Typography color="text.secondary">Giảm lượng CO2</Typography>
            </Grid>

            {/* Water */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Typography
                sx={{ color: "teal" }}
                fontWeight="bold"
                fontSize="1.5rem"
              >
                0 L
              </Typography>
              <Typography color="text.secondary">Tiết kiệm nước</Typography>
            </Grid>

            {/* Certification */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Typography
                sx={{ color: "purple" }}
                fontWeight="bold"
                fontSize="1.5rem"
              >
                0 Kg
              </Typography>
              <Typography color="text.secondary">
                Giảm Số Lượng Rác Thải
              </Typography>
            </Grid>
          </Box>
        </Box>
        {/* Thông Tin Sản Phẩm */}
        <Card
          sx={{
            m: "10px 0",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <CheckroomIcon sx={{ color: "rgba(22, 163, 74, 1)" }} />
              <Typography variant="h6" fontWeight="bold">
                Thông Tin Sản Phẩm
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {/* Design Type */}
              <Grid>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="design-type-label">
                      Loại Thời Trang
                    </InputLabel>
                    <Select
                      labelId="design-type-label"
                      id="designType-select"
                      value={designTypeData}
                      label="Loại Thời Trang"
                      onChange={handleChangeDesign}
                    >
                      {designType.map((dt) => (
                        <MenuItem value={dt.designTypeId}>
                          {dt.designName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {/* Design Size */}
              <Grid>
                <Box sx={{ width: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="desing-size-label">Kích Thước</InputLabel>
                    <Select
                      labelId="desing-size-label"
                      id="designSize-select"
                      value={size}
                      label="Loại Thời Trang"
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <MenuItem value="M">M (×1)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {/* Quantity */}
              <Grid>
                <TextField
                  fullWidth
                  type="number"
                  label="Số Lượng"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </Grid>
              {/* Vải Chính */}
              {/* <Grid>
                <FormControl fullWidth>
                  <InputLabel>Vải Chính</InputLabel>
                  <Select
                    value={mainMaterial}
                    onChange={(e) => setMainMaterial(e.target.value)}
                  >
                    {materials.map((mat) =>
                      mat.type === "Chính" ? (
                        <MenuItem key={mat.value} value={mat.value}>
                          {mat.label}{" "}
                          <Chip
                            label={mat.efficiency}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* Vải Phụ */}
              {/* <Grid>
                <FormControl fullWidth>
                  <InputLabel>Vải Lót</InputLabel>
                  <Select
                    value={liningMaterial}
                    onChange={(e) => setLiningMaterial(e.target.value)}
                  >
                    {materials.map((mat) =>
                      mat.type === "Lót" ? (
                        <MenuItem key={mat.value} value={mat.value}>
                          {mat.label}{" "}
                          <Chip
                            label={mat.efficiency}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
        {/* Thêm Mảnh Rập */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "stretch" }}>
          {/* Mảnh Rập */}
          <Grid flex={1}>
            <Card
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                width: "100%",
                borderRadius: "5px",
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DraftIcon color={"rgba(22, 163, 74, 1)"} />
                      <Typography variant="h6" fontWeight="bold" gap={2}>
                        Mảnh Rập
                      </Typography>
                    </Box>
                    <Typography>
                      Nhập kích thước các mảnh rập (Size M làm chuẩn)
                    </Typography>
                  </Box>
                  <Box sx={{}}>
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "5px",
                      }}
                      onClick={handleAddCard}
                    >
                      + Thêm
                    </Button>
                  </Box>
                </Box>
                {/* Mảnh Rập Được Thêm */}
                <Box
                  sx={{
                    height: cards.length > 0 ? 500 : "auto",
                    overflowY: "auto",
                  }}
                >
                  {cards.map((card, index) => (
                    <Grid
                      key={card.id}
                      sx={{
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        margin: "10px 0",
                      }}
                    >
                      <Card sx={{ width: "100%", padding: 2, margin: "auto" }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* Tên Mảnh Rập */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                              }}
                            >
                              <TextField
                                id="draftName"
                                label="Tên Mảnh Rập"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                InputLabelProps={{
                                  sx: {
                                    fontWeight: "bold",
                                    color: "black",
                                  },
                                }}
                              />
                              <IconButton
                                color="error"
                                onClick={() => handleRemoveCard(card.id)}
                                sx={{
                                  color: "error.main",
                                  "&:hover": {
                                    color: "#ff1744", // màu đỏ sáng hơn, hoặc dùng theme color khác
                                  },
                                }}
                              >
                                <DeleteOutlineTwoToneIcon />
                              </IconButton>
                            </Box>
                            {/* Kích Thước */}
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                marginBottom: "20px",
                              }}
                            >
                              <TextField
                                id="width"
                                label="Rộng (cm)"
                                type="number"
                                defaultValue="0"
                                InputLabelProps={{
                                  sx: {
                                    fontWeight: "bold",
                                    color: "black",
                                  },
                                }}
                                onChange={(e) =>
                                  handleChangeWidth(
                                    card.id,
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <TextField
                                id="height"
                                label="Cao (cm)"
                                type="number"
                                defaultValue="0"
                                InputLabelProps={{
                                  sx: {
                                    fontWeight: "bold",
                                    color: "black",
                                  },
                                }}
                                onChange={(e) =>
                                  handleChangeHeight(
                                    card.id,
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <TextField
                                id="quanity"
                                label="Số lượng"
                                defaultValue="0"
                                InputLabelProps={{
                                  sx: {
                                    fontWeight: "bold",
                                    color: "black",
                                  },
                                }}
                              />
                            </Box>
                            {/* Loại Vật Liệu */}
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                              }}
                            >
                              {/* Label */}
                              <Box sx={{ width: 200 }}>
                                <FormControl fullWidth>
                                  <Select
                                    id="lining-select"
                                    value={card.label}
                                    onChange={(e) =>
                                      handleChangeLabel(card.id, e.target.value)
                                    }
                                  >
                                    <MenuItem value={"main"}>
                                      Vải Chính
                                    </MenuItem>
                                    <MenuItem value={"lining"}>
                                      Vải Lót
                                    </MenuItem>
                                    <MenuItem value={"garment"}>
                                      Phụ Liệu
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              {/* Loại Vật Liệu */}
                              <Box sx={{ width: 200 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="material-type-label">
                                    Loại Vải
                                  </InputLabel>
                                  <Select
                                    labelId="material-type-label"
                                    id="materialType-select"
                                    value={card.materialType.typeId}
                                    label="Loại Vật Liệu"
                                    onChange={(e) => {
                                      const selected = materialType.find(
                                        (m) => m.typeId === e.target.value
                                      );
                                      if (selected) {
                                        handleMaterialTypeChange(
                                          card.id,
                                          selected.typeId,
                                          selected.typeName
                                        );
                                      }
                                    }}
                                  >
                                    {materialType.map((dt) => (
                                      <MenuItem
                                        key={dt.typeId}
                                        value={dt.typeId}
                                      >
                                        {dt.typeName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                              <Chip
                                icon={
                                  <SquareFootIcon sx={{ colors: "black" }} />
                                }
                                label={`${card.width} x ${card.height} cm (Size ${size})`}
                                size="medium"
                                sx={{
                                  backgroundColor: "white",
                                  border: "1px solid rgba(0, 0, 0, 0.3)",
                                  color: "black",
                                  fontSize: "15px",
                                  fontWeight: "bold",
                                  margin: "auto",
                                }}
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Kết Quả Tính Toán */}
          <Grid flex={1}>
            <Card
              sx={{
                height: "100%", // Match height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalculateOutlinedIcon />
                  <Typography variant="h6" fontWeight="bold">
                    Kết Quả Tính Toán
                  </Typography>
                </Box>
                <Tabs
                  value={tabIndex}
                  onChange={(_, newVal) => setTabIndex(newVal)}
                  sx={{ mb: 2 }}
                >
                  <Tab label="Vật Liệu" />
                  <Tab label="Chi Phí" />
                  <Tab label="Bền Vững" />
                  <Tab label="Tổng Kết" />
                </Tabs>
                {tabIndex === 0 && (
                  <>
                    {[mainMaterial, liningMaterial].map((key) => {
                      const mat = materials.find((m) => m.value === key);
                      return (
                        <Box
                          key={key}
                          sx={{
                            mb: 2,
                            p: 1,
                            border: "1px solid #ccc",
                            borderRadius: 2,
                          }}
                        >
                          <Typography fontWeight="bold">
                            {mat?.label}
                          </Typography>
                          <Chip label={mat?.type} size="small" sx={{ ml: 1 }} />
                          <Chip
                            label={mat?.efficiency}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                          <Typography variant="body2" mt={1}>
                            Diện tích: 1,200 cm²
                          </Typography>
                          <Typography variant="body2">
                            Xuất xứ: {mat?.origin}
                          </Typography>
                          <Box mt={1}>
                            {mat?.certifications.map((cert) => (
                              <Chip
                                key={cert}
                                label={cert}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                            ))}
                          </Box>
                          <Typography variant="body2" mt={1} color="primary">
                            Cần thiết: {key === "cotton" ? "0.1" : "0.2"} mét
                          </Typography>
                          <Typography variant="caption" color="error">
                            Phế liệu ước tính: {key === "cotton" ? "154" : "96"}{" "}
                            cm²
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                )}
                {tabIndex === 1 && <div>Tab 2</div>}
                {tabIndex === 2 && <div>Tab 3</div>}
                {tabIndex === 3 && <div>Tab 4</div>}
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Box>
      {/* Bottom Part */}
      <Box sx={{ width: "100%", margin: "auto", padding: 2 }}>
        <Box
          sx={{
            background: "linear-gradient(to right, #f0fff4, #e6f7ff)",
            borderRadius: 2,
            border: "1px solid #d2f5e8",
            width: "100%",
            margin: "auto",
            padding: 3,
          }}
        >
          {/* Chỉ Số Bền Vững */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              paddingLeft: 15,
              paddingRight: 15,
              alignItems: "stretch",
            }}
          >
            {/* Size & Số Lượng */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckroomIcon sx={{ color: "blue", fontSize: "2rem" }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="1rem" color="black" fontWeight="bold">
                    Size {size}
                  </Typography>
                  <Typography color="black">{quantity} Sản Phẩm</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Số Mảnh Rập */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DraftIcon color="purple" />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="1rem" color="black" fontWeight="bold">
                    {cards.length} Mảnh
                  </Typography>
                  <Typography color="black">Mảnh Rập</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Chi Phí */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AttachMoneyOutlinedIcon
                  sx={{ color: "green", fontSize: "2rem" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="1rem" color="black" fontWeight="bold">
                    12,000đ
                  </Typography>
                  <Typography color="black">Tổng Chi Phí</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Tính bền vững */}
            <Grid textAlign="center" sx={{ xs: 12, md: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EcoIcon />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="1rem" color="green" fontWeight={"bold"}>
                    0/100
                  </Typography>
                  <Typography color="black">Điểm Bền Vững</Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
