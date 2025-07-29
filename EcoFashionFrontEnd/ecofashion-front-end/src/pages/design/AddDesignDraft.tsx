import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DesignService } from "../../services/api";
import { toast } from "react-toastify";
import { StoredMaterial } from "../../services/api/designService";

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
  const [quantity, setQuantity] = useState(8);
  const [mainMaterial, setMainMaterial] = useState("cotton");
  const [liningMaterial, setLiningMaterial] = useState("bamboo");
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //Design Data
  const [material, setMaterial] = useState<StoredMaterial[]>([]);
  //Get Material Data
  useEffect(() => {
    loadStoredMaterial();
  }, []);

  const loadStoredMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DesignService.getMaterial();
      setMaterial(data);
    } catch (error: any) {
      const errorMessage =
        error.message || "Không thể tải danh sách nhà thiết kế";
      setError(errorMessage);
      toast.error(errorMessage, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
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
          <Typography color="text.primary">Tạo Rập Thời Trang</Typography>
        </Breadcrumbs>
      </AppBar>
      {/* Thông Tin Sản Phẩm */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            🧵 Thông Tin Sản Phẩm
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <FormControl fullWidth>
                <InputLabel>Kích Thước</InputLabel>
                <Select value={size} onChange={(e) => setSize(e.target.value)}>
                  <MenuItem value="M">M (×1)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                type="number"
                label="Số Lượng"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Grid>
            <Grid>
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
            </Grid>
            <Grid>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {/* Mảnh Rập */}
        <Grid>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📐 Mảnh Rập
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <TextField fullWidth label="Rộng (cm)" defaultValue={32} />
                </Grid>
                <Grid>
                  <TextField fullWidth label="Cao (cm)" defaultValue={40} />
                </Grid>
                <Grid>
                  <TextField fullWidth label="Số lượng" defaultValue={1} />
                </Grid>
                <Grid>
                  <FormControl fullWidth>
                    <InputLabel>Loại vật liệu</InputLabel>
                    <Select defaultValue="main">
                      <MenuItem value="main">Vải chính</MenuItem>
                      <MenuItem value="lining">Vải lót</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained">+ Thêm</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kết Quả Tính Toán */}
        <Grid>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📋 Kết Quả Tính Toán
              </Typography>
              <Tabs
                value={tab}
                onChange={(_, newVal) => setTab(newVal)}
                sx={{ mb: 2 }}
              >
                <Tab label="Vật Liệu" />
                <Tab label="Chi Phí" />
                <Tab label="Bền Vững" />
                <Tab label="Tổng Kết" />
              </Tabs>

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
                      <Chip label={mat?.type} size="small" sx={{ ml: 1 }} />
                      <Chip
                        label={mat?.efficiency}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
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
                      Phế liệu ước tính: {key === "cotton" ? "154" : "96"} cm²
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
