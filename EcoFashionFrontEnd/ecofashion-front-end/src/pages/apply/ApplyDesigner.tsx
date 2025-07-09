import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
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

import id from "../../assets/pictures/register/id.png";
import idPeople from "../../assets/pictures/register/id_people.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/user/AuthContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  applicationService,
  type ApplyDesignerRequest,
} from "../../services/api/applicationService";
import { toast } from "react-toastify";
const steps = ["Thông tin Nhà Thiết Kế", "Thông tin định danh", "Hoàn tất"];

// Validation schema
// const validationSchema = Yup.object({
//   portfolioUrl: Yup.string()
//     .url("Portfolio URL không hợp lệ")
//     .required("Portfolio URL là bắt buộc"),
//   bannerUrl: Yup.string().url("Banner URL không hợp lệ"),
//   specializationUrl: Yup.string().url("Specialization URL không hợp lệ"),
//   identificationNumber: Yup.string()
//     .required("Số CMND/CCCD là bắt buộc")
//     .matches(/^0[0-9]{9,12}$/, "Số CMND/CCCD phải có 9-12 chữ số"),
//   identificationPicture: Yup.string()
//     .url("URL ảnh CMND/CCCD không hợp lệ")
//     .required("Ảnh CMND/CCCD là bắt buộc"),
//   idHoldPicture: Yup.string()
//     .url("URL ảnh CMND/CCCD không hợp lệ")
//     .required("Ảnh CMND/CCCD là bắt buộc"),
//   note: Yup.string().max(500, "Ghi chú không được quá 500 ký tự"),
//   fullName: Yup.string()
//     .required("Họ và Tên là bắt buộc")
//     .max(30, "Ghi chú không được quá 30 ký tự"),
//   accepted: Yup.boolean().oneOf([true], "Bạn phải đồng ý với chính sách."),
// });
// interface ApplyDesignerFormValues {
//   portfolioUrl: string;
//   bannerUrl: string;
//   specializationUrl: string;
//   identificationNumber: string;
//   identificationPicture: string;
//   idHoldPicture: string;
//   note: string;
//   fullName: string;
//   accepted: boolean;
// }
// Validation schema
const validationSchema = Yup.object({
  portfolioUrl: Yup.string()
    .url("Portfolio URL không hợp lệ")
    .required("Portfolio URL là bắt buộc"),
  bannerUrl: Yup.string().url("Banner URL không hợp lệ"),
  specializationUrl: Yup.string().url("Specialization URL không hợp lệ"),
  identificationNumber: Yup.string()
    .required("Số CMND/CCCD là bắt buộc")
    .matches(/^[0-9]{9,12}$/, "Số CMND/CCCD phải có 9-12 chữ số"),
  identificationPicture: Yup.string()
    .url("URL ảnh CMND/CCCD không hợp lệ")
    .required("Ảnh CMND/CCCD là bắt buộc"),
  note: Yup.string().max(500, "Ghi chú không được quá 500 ký tự"),
});

interface ApplyDesignerFormValues {
  portfolioUrl: string;
  bannerUrl: string;
  specializationUrl: string;
  identificationNumber: string;
  identificationPicture: string;
  note: string;
}
export default function ApplyDesigner() {
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
          steps.findIndex((i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const navigate = useNavigate();
  const handleClick = (pages: string) => {
    switch (pages.toLocaleLowerCase()) {
      case "applications":
        navigate("/my-applications");
        break;
      case "homepage":
        navigate("/");
        break;
    }
  };
  const { user } = useAuth();

  const initialValues: ApplyDesignerFormValues = {
    portfolioUrl: "",
    bannerUrl: "",
    specializationUrl: "",
    identificationNumber: "",
    identificationPicture: "",
    // idHoldPicture: "",
    note: "",
    // fullName: "",
    // accepted: false,
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ApplyDesignerFormValues) => {
    try {
      // setLoading(true);

      // Prepare request data
      const requestData: ApplyDesignerRequest = {
        portfolioUrl: values.portfolioUrl,
        bannerUrl: values.bannerUrl || undefined,
        specializationUrl: values.specializationUrl || undefined,
        identificationNumber: values.identificationNumber,
        identificationPicture: values.identificationPicture,
        note: values.note || undefined,
      };

      // Call API to submit application
      await applicationService.applyAsDesigner(requestData);

      toast.success("Đơn đăng ký Designer đã được gửi thành công!", {
        position: "top-center",
      });

      // Navigate to my applications page to see status
      // navigate("/my-applications");
      handleNext();
    } catch (error: any) {
      console.error("Error applying as designer:", error);
      toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
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
              disabled
              value={user?.fullName || ""}
            />

            <TextField
              fullWidth
              label="Email"
              placeholder="Nhập vào"
              margin="normal"
              disabled
              value={user?.email || ""}
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              placeholder="Nhập vào"
              margin="normal"
              disabled
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">+84</InputAdornment>
              //   ),
              // }}
              value={user?.phone || ""}
            />

            {/* <Grid container spacing={2} mt={1}>
              <Grid>
                <TextField fullWidth placeholder="Nhập vào" />
              </Grid>
              <Grid sx={{ margin: "auto 0" }}>
                <Button variant="outlined" fullWidth>
                  Gửi
                </Button>
              </Grid>
            </Grid> */}
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
              {activeStep < steps.length - 2 && (
                <Button variant="contained" onClick={handleNext}>
                  Tiếp tục
                </Button>
              )}
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              width: "100%",
              paddingBottom: 5,
            }}
          >
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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <TextField
                    fullWidth
                    name="identificationNumber"
                    label="Số Căn Cước Công Dân"
                    placeholder="Nhập vào"
                    inputProps={{ maxLength: 12 }}
                    value={values.identificationNumber}
                    sx={{ mb: 2 }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.identificationNumber &&
                      Boolean(errors.identificationNumber)
                    }
                    helperText={
                      touched.identificationNumber &&
                      errors.identificationNumber
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    name="fullName"
                    label="Họ & Tên"
                    placeholder="Họ và tên theo CCCD"
                    inputProps={{ maxLength: 100 }}
                    // value={values.fullName}
                    sx={{ mb: 4 }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={touched.fullName && Boolean(errors.fullName)}
                    // helperText={touched.fullName && errors.fullName}
                    required
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
                            Các thông tin trong CCCD/CMND phải được hiển thị rõ
                            ràng
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
                            Các thông tin trong CCCD/CMND phải được hiển thị rõ
                            ràng
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
                  {/* Portfolio URL */}
                  <TextField
                    fullWidth
                    name="portfolioUrl"
                    label="Portfolio URL *"
                    placeholder="https://your-portfolio.com"
                    value={values.portfolioUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.portfolioUrl && Boolean(errors.portfolioUrl)}
                    helperText={touched.portfolioUrl && errors.portfolioUrl}
                    required
                  />

                  {/* Specialization URL */}
                  <TextField
                    fullWidth
                    name="specializationUrl"
                    label="Specialization URL"
                    placeholder="https://your-specialization.com"
                    value={values.specializationUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.specializationUrl &&
                      Boolean(errors.specializationUrl)
                    }
                    helperText={
                      touched.specializationUrl && errors.specializationUrl
                    }
                    required
                  />

                  {/* Identification Picture */}
                  <TextField
                    fullWidth
                    name="identificationPicture"
                    label="URL ảnh CMND/CCCD *"
                    placeholder="https://your-id-picture.com"
                    value={values.identificationPicture}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.identificationPicture &&
                      Boolean(errors.identificationPicture)
                    }
                    helperText={
                      touched.identificationPicture &&
                      errors.identificationPicture
                    }
                    required
                  />

                  {/* Note */}
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="note"
                    label="Ghi chú"
                    placeholder="Chia sẻ về kinh nghiệm, phong cách thiết kế..."
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.note && Boolean(errors.note)}
                    helperText={touched.note && errors.note}
                    required
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="accepted"
                        // checked={values.accepted}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và
                        trung thực. Tôi đã đọc và đồng ý với Chính sách Bảo Mật
                        của EcoFashion
                      </Typography>
                    }
                  />
                  <Divider sx={{ padding: "20px", borderColor: "black" }} />
                  <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
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
                      {activeStep < steps.length - 2 ? (
                        <Button variant="contained" onClick={handleNext}>
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <CircularProgress size={20} sx={{ mr: 1 }} />
                              Đang gửi đơn...
                            </>
                          ) : (
                            "Gửi đơn đăng ký"
                          )}
                        </Button>
                      )}
                    </Box>
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Lưu ý:</strong> Đơn đăng ký của bạn sẽ được
                        Admin xem xét và phê duyệt. Bạn sẽ nhận được thông báo
                        khi đơn được xử lý.
                      </Typography>
                    </Alert>
                  </Box>
                </Form>
              )}
            </Formik>
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
              onClick={() => handleClick("homepage")}
            >
              Trang Chủ
            </Button>
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
              onClick={() => handleClick("applications")}
            >
              Xem Đơn Đăng Ký
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
              <StepButton color="inherit" disabled>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you are finished
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
              }}
            >
              {renderStepContent(activeStep)}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
