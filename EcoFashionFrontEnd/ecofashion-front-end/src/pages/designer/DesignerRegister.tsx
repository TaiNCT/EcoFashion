import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
//Icon
import InfoIcon from "@mui/icons-material/Info";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import id from "../../assets/pictures/id.png";
import idPeople from "../../assets/pictures/id_people.png";

const steps = ["Thông tin Nhà Thiết Kế", "Thông tin định danh", "Hoàn tất"];

export default function DesignerRegister() {
  const [activeStep, setActiveStep] = React.useState(0);
  //Make It jump to top
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [form, setForm] = useState({
    idType: "CCCD",
    idNumber: "",
    fullName: "",
    accepted: false,
  });

  const handleChange = (field: any) => (event: any) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleCheckboxChange = (event: any) => {
    setForm({ ...form, accepted: event.target.checked });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box mt={4} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Tên Nhà Thiết Kế"
              placeholder="Nhập vào"
              helperText="0/30"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              placeholder="Nhập vào"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              placeholder="Nhập vào"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+84</InputAdornment>
                ),
              }}
            />

            <Grid container spacing={2} mt={1}>
              <Grid>
                <TextField fullWidth placeholder="Nhập vào" />
              </Grid>
              <Grid sx={{ margin: "auto 0" }}>
                <Button variant="outlined" fullWidth>
                  Gửi
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ width: "100%", borderRadius: 2 }}>
            <Box
              display="flex"
              alignItems="center"
              margin={"30px"}
              border={"1px solid black"}
              padding={"15px"}
              borderRadius={"10px"}
            >
              <InfoIcon sx={{ mr: 1, color: "#1976d2" }} />
              <Typography color="primary">
                Vui lòng cung cấp Thông tin Định danh của Nhà Thiết Kế.
              </Typography>
            </Box>

            <FormControl fullWidth>
              <FormLabel>Hình thức định danh:</FormLabel>
              <RadioGroup
                row
                value={form.idType}
                onChange={handleChange("idType")}
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  value="CCCD"
                  control={<Radio />}
                  label="Căn Cước Công Dân (CCCD)"
                />
                <FormControlLabel
                  value="CMND"
                  control={<Radio />}
                  label="Chứng Minh Nhân Dân (CMND)"
                />
              </RadioGroup>

              <TextField
                fullWidth
                label={`Số ${
                  form.idType === "CCCD"
                    ? "Căn Cước Công Dân"
                    : "Chứng Minh Nhân Dân"
                }:`}
                placeholder="Nhập vào"
                inputProps={{ maxLength: 12 }}
                value={form.idNumber}
                onChange={handleChange("idNumber")}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Họ & Tên"
                placeholder="Họ và tên theo CCCD/CMND"
                inputProps={{ maxLength: 100 }}
                value={form.fullName}
                onChange={handleChange("fullName")}
                sx={{ mb: 4 }}
              />

              <Grid container spacing={2} mb={2}>
                <Grid>
                  <Typography variant="body2" mb={1}>
                    Hình chụp của thẻ CCCD/CMND:
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        border: "1px dashed gray",
                        borderRadius: 2,
                        p: 4,
                        textAlign: "center",
                        color: "gray",
                      }}
                    >
                      <IconButton>
                        <AddPhotoAlternateIcon fontSize="large" />
                      </IconButton>
                      <Typography variant="body2" mt={1}>
                        Vui lòng cung cấp ảnh chụp cận CCCD/CMND
                      </Typography>
                      <Typography variant="caption">
                        Các thông tin trong CCCD/CMND phải được hiển thị rõ ràng
                      </Typography>
                    </Box>
                    <img
                      src={id}
                      style={{
                        marginTop: "auto",
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid>
                  <Typography variant="body2" mb={1}>
                    Ảnh đang cầm thẻ CCCD/CMND của bạn:
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        border: "1px dashed gray",
                        borderRadius: 2,
                        p: 4,
                        textAlign: "center",
                        color: "gray",
                      }}
                    >
                      <IconButton>
                        <AddPhotoAlternateIcon fontSize="large" />
                      </IconButton>
                      <Typography variant="body2">
                        Vui lòng cung cấp ảnh chụp cận CCCD/CMND
                      </Typography>
                      <Typography variant="caption">
                        Các thông tin trong CCCD/CMND phải được hiển thị rõ ràng
                      </Typography>
                    </Box>
                    <img
                      src={idPeople}
                      style={{
                        marginTop: "auto",
                        height: "100px",
                        width: "130px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.accepted}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography variant="body2">
                    Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và
                    trung thực. Tôi đã đọc và đồng ý với Chính sách Bảo Mật của
                    EcoFashion
                  </Typography>
                }
              />
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              px: 2,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Đăng ký thành công
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={4}>
              Hãy chờ EcoFashion duyệt cho bạn nhé!
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "white",
                px: 4,
                py: 1,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                margin: "auto",
              }}
            >
              Trang chủ
            </Button>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <Box sx={{ border: "1px solid black", width: "80%", margin: "30px auto" }}>
      <Box
        sx={{
          width: "60%",
          margin: "30px auto",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            margin: "30px auto",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Đăng ký Nhà Thiết Kế
        </Typography>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                sx={{ borderBottom: "1px solid black", marginBottom: "4px" }}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  margin: "auto",
                  width: "100%",
                  borderBottom: "1px solid black",
                  paddingBottom: "30px",
                }}
              >
                {renderStepContent(activeStep)}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Quay Lại
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Tiếp Theo
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </Box>
  );
}
