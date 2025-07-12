import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
<<<<<<< HEAD
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  Paper,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/user/AuthContext";
import { toast } from "react-toastify";
import PaletteIcon from "@mui/icons-material/Palette";
=======
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
>>>>>>> main
import {
  Instagram,
  Facebook,
  LinkedIn,
  Language,
  Phone,
  Email,
  LocationOn,
  Business,
  BusinessCenter,
} from "@mui/icons-material";
import {
  applicationService,
  type ApplyDesignerRequest,
} from "../../services/api/applicationService";
<<<<<<< HEAD
import FileUpload from "../../components/FileUpload";

// Steps - Updated to 5 steps
const steps = [
  "Thông tin cơ bản",
  "Thông tin nghề nghiệp",
  "Portfolio & Media",
  "Thông tin định danh",
  "Xác nhận & Hoàn tất",
];
=======
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
>>>>>>> main

interface FormData {
  // Step 1: Basic Info
  designerName: string;
  email: string;
  phoneNumber: string;
  address: string;

  // Step 2: Professional Info
  specializationUrl: string;
  taxNumber: string;
  bio: string;
  experience: string;
  certificates: string;

  // Step 3: Portfolio & Media
  portfolioUrl: string;
  bannerUrl: string;
  socialLinks: {
    instagram: string;
    behance: string;
    facebook: string;
    website: string;
  };
  avatarFile: File[];
  bannerFile: File[];
  portfolioFiles: File[];

  // Step 4: Identity Verification
  identificationType: "cccd" | "cmnd";
  identificationNumber: string;
  fullName: string;
  identificationPictureFile: File[];
  identificationPictureOwner: string;

  // Step 5: Agreement
  agreedToTerms: boolean;
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
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submission tracking
  const [activeStep, setActiveStep] = useState(0);
=======
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
>>>>>>> main

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    designerName: "",
    email: user?.email || "",
    phoneNumber: "",
    address: "",

    // Step 2
    specializationUrl: "",
    taxNumber: "",
    bio: "",
    experience: "",
    certificates: "",

    // Step 3
    portfolioUrl: "",
    bannerUrl: "",
    socialLinks: {
      instagram: "",
      behance: "",
      facebook: "",
      website: "",
    },
    avatarFile: [],
    bannerFile: [],
    portfolioFiles: [],

    // Step 4
    identificationType: "cccd",
    identificationNumber: "",
<<<<<<< HEAD
    fullName: user?.fullName || "",
    identificationPictureFile: [],
    identificationPictureOwner: "",

    // Step 5
    agreedToTerms: false,
    note: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // File size validation helper (5MB limit)
    const validateFileSize = (
      files: File[],
      fieldName: string,
      maxSizeMB = 5
    ) => {
      for (const file of files) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          newErrors[fieldName as keyof FormData] =
            `File ${file.name} quá lớn (tối đa ${maxSizeMB}MB)` as any;
          return false;
        }
      }
      return true;
    };

    switch (step) {
      case 0: // Basic Info
        if (!formData.designerName.trim())
          newErrors.designerName = "Tên nhà thiết kế là bắt buộc";
        if (!formData.email.trim()) newErrors.email = "Email là bắt buộc";
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
        break;

      case 1: // Professional Info
        if (!formData.bio.trim())
          newErrors.bio = "Mô tả về bản thân là bắt buộc";
        // Certificates is optional, but you can require if needed:
        // if (!formData.certificates.trim()) newErrors.certificates = 'Chứng chỉ/Giải thưởng là bắt buộc';
        break;

      case 2: // Portfolio & Media
        if (formData.avatarFile.length === 0) {
          newErrors.avatarFile = "Vui lòng chọn ảnh đại diện" as any;
        } else {
          validateFileSize(formData.avatarFile, "avatarFile");
        }

        if (formData.bannerFile.length > 0) {
          validateFileSize(formData.bannerFile, "bannerFile");
        }

        if (formData.portfolioFiles.length > 0) {
          validateFileSize(formData.portfolioFiles, "portfolioFiles", 10); // 10MB for portfolio
        }
        break;

      case 3: // Identity Verification
        if (!formData.identificationNumber.trim())
          newErrors.identificationNumber = "Số CCCD/CMND là bắt buộc";
        if (!formData.fullName.trim())
          newErrors.fullName = "Họ và tên là bắt buộc";
        if (!formData.identificationPictureOwner.trim())
          newErrors.identificationPictureOwner =
            "Chủ sở hữu ảnh định danh là bắt buộc";
        if (formData.identificationPictureFile.length === 0) {
          newErrors.identificationPictureFile =
            "Vui lòng chọn ảnh CCCD/CMND" as any;
        } else {
          validateFileSize(
            formData.identificationPictureFile,
            "identificationPictureFile"
          );
        }
        break;

      case 4: // Agreement
        if (!formData.agreedToTerms)
          newErrors.agreedToTerms = "Bạn phải đồng ý với điều khoản" as any;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    // Prevent double submission
    if (isSubmitting) {
      toast.warning("Đơn đăng ký đang được xử lý, vui lòng đợi...", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);
      setIsSubmitting(true);

      // DEBUG: Check token before making API call
      const token = localStorage.getItem("authToken");
      const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
      console.log("🔍 Debug Token Info:", {
        hasToken: !!token,
        token: token?.substring(0, 50) + "...",
        expiresAt: tokenExpiresAt,
        isExpired: tokenExpiresAt
          ? new Date() > new Date(tokenExpiresAt)
          : "No expiry date",
        user: user,
      });

      if (!token) {
        toast.error("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.", {
          position: "top-center",
        });
        return;
      }

      if (tokenExpiresAt && new Date() > new Date(tokenExpiresAt)) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          position: "top-center",
        });
        return;
      }

      // Show progress toast
      toast.info(
        "Đang upload files và xử lý đơn đăng ký... Vui lòng đợi trong giây lát.",
        {
          position: "top-center",
          autoClose: false,
        }
      );

      // Prepare social links JSON
      const socialLinksJson = JSON.stringify(formData.socialLinks);
=======
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
>>>>>>> main

      // Prepare request data
      const requestData: ApplyDesignerRequest = {
        avatarFile: formData.avatarFile[0],
        bannerFile: formData.bannerFile[0],
        portfolioUrl: formData.portfolioUrl || undefined,
        portfolioFiles: formData.portfolioFiles,
        bannerUrl: formData.bannerUrl || undefined,
        specializationUrl: formData.specializationUrl || undefined,
        socialLinks: socialLinksJson,
        identificationNumber: formData.identificationNumber,
        identificationPictureFile: formData.identificationPictureFile[0],
        note: formData.note || undefined,
      };

      console.log("🚀 Sending request data:", requestData);

      await applicationService.applyAsDesigner(requestData);

      // Dismiss progress toast and show success
      toast.dismiss();
      toast.success("Đơn đăng ký Designer đã được gửi thành công!", {
        position: "top-center",
      });

<<<<<<< HEAD
      navigate("/my-applications");
=======
      // Navigate to my applications page to see status
      // navigate("/my-applications");
      handleNext();
>>>>>>> main
    } catch (error: any) {
      console.error("Error applying as designer:", error);

      // Dismiss progress toast
      toast.dismiss();

      // Show specific error message
      if (error.code === "ECONNABORTED") {
        toast.error(
          "Upload mất quá nhiều thời gian. Vui lòng thử lại với files nhỏ hơn.",
          {
            position: "bottom-center",
          }
        );
      } else {
        toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký", {
          position: "bottom-center",
        });
      }
      setIsSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateSocialLinks = (
    platform: keyof FormData["socialLinks"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  // Check if user is logged in and is customer
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Bạn cần đăng nhập để đăng ký làm Designer.
        </Alert>
      </Container>
    );
  }
=======
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
>>>>>>> main

            <TextField
              fullWidth
              label="Email"
              placeholder="Nhập vào"
              margin="normal"
              disabled
              value={user?.email || ""}
            />

<<<<<<< HEAD
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin cơ bản của bạn
            </Typography>

            <TextField
              fullWidth
              label="Tên Nhà Thiết Kế *"
              placeholder="Nhập tên nghệ danh hoặc tên thật của bạn"
              value={formData.designerName}
              onChange={(e) => updateFormData("designerName", e.target.value)}
              error={Boolean(errors.designerName)}
              helperText={
                errors.designerName ||
                `${formData.designerName.length}/50 ký tự`
              }
              inputProps={{ maxLength: 50 }}
            />

            <TextField
              fullWidth
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Số điện thoại *"
              placeholder="Nhập số điện thoại của bạn"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Địa chỉ *"
              placeholder="Nhập địa chỉ của bạn"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
              error={Boolean(errors.address)}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 1: // Professional Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin nghề nghiệp
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả về bản thân *"
              placeholder="Hãy mô tả về bản thân, phong cách thiết kế, và điều khiến bạn đặc biệt..."
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              error={Boolean(errors.bio)}
              helperText={errors.bio || `${formData.bio.length}/500 ký tự`}
              inputProps={{ maxLength: 500 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Kinh nghiệm làm việc"
              placeholder="Mô tả về kinh nghiệm làm việc, các dự án đã thực hiện..."
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              helperText={`${formData.experience.length}/300 ký tự`}
              inputProps={{ maxLength: 300 }}
            />

            <TextField
              fullWidth
              label="Chứng chỉ/Giải thưởng (Certificates)"
              placeholder="Nhập vào, cách nhau bởi dấu phẩy"
              value={formData.certificates}
              onChange={(e) => updateFormData("certificates", e.target.value)}
              helperText="Nhập các chứng chỉ hoặc giải thưởng, cách nhau bởi dấu phẩy"
              error={Boolean(errors.certificates)}
            />

            <TextField
              fullWidth
              label="URL chuyên môn"
              placeholder="https://your-specialization-site.com"
              value={formData.specializationUrl}
              onChange={(e) =>
                updateFormData("specializationUrl", e.target.value)
              }
              helperText="Link tới website hoặc trang web thể hiện chuyên môn của bạn"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Mã số thuế"
              placeholder="Nhập mã số thuế cá nhân (nếu có)"
              value={formData.taxNumber}
              onChange={(e) => updateFormData("taxNumber", e.target.value)}
              helperText="Tùy chọn - Dành cho Designer có đăng ký kinh doanh"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessCenter color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 2: // Portfolio & Media
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Portfolio & Hình ảnh
            </Typography>

            {/* Avatar Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh đại diện *
              </Typography>
              <FileUpload
                label="Chọn ảnh đại diện"
                files={formData.avatarFile}
                onFilesChange={(files) => updateFormData("avatarFile", files)}
                accept="image/*"
                maxSize={5}
                error={errors.avatarFile as string}
                helperText="Ảnh đại diện sẽ hiển thị trên profile của bạn (tối đa 5MB)"
              />
            </Paper>

            {/* Banner Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh banner
              </Typography>
              <FileUpload
                label="Chọn ảnh banner"
                files={formData.bannerFile}
                onFilesChange={(files) => updateFormData("bannerFile", files)}
                accept="image/*"
                maxSize={10}
                helperText="Ảnh banner lớn hiển thị ở đầu profile (tối đa 10MB)"
              />
            </Paper>

            {/* Portfolio Files */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Portfolio (ảnh sản phẩm)
              </Typography>
              <FileUpload
                label="Chọn ảnh sản phẩm"
                multiple
                files={formData.portfolioFiles}
                onFilesChange={(files) =>
                  updateFormData("portfolioFiles", files)
                }
                accept="image/*"
                maxSize={5}
                helperText="Có thể chọn nhiều ảnh để showcase sản phẩm của bạn (mỗi ảnh tối đa 5MB)"
              />
            </Paper>

            <TextField
              fullWidth
              label="Portfolio URL"
              placeholder="https://your-portfolio.com"
              value={formData.portfolioUrl}
              onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
              helperText="Link tới website portfolio của bạn"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Social Links */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Mạng xã hội (tùy chọn)
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Instagram"
                    placeholder="https://instagram.com/username"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      updateSocialLinks("instagram", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Behance"
                    placeholder="https://behance.net/username"
                    value={formData.socialLinks.behance}
                    onChange={(e) =>
                      updateSocialLinks("behance", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Language color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Facebook"
                    placeholder="https://facebook.com/page"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      updateSocialLinks("facebook", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Website"
                    placeholder="https://your-website.com"
                    value={formData.socialLinks.website}
                    onChange={(e) =>
                      updateSocialLinks("website", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Language color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        );

      case 3: // Identity Verification
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="info">
              Vui lòng cung cấp Thông tin Định danh của Nhà Thiết Kế.
            </Alert>

            <FormControl component="fieldset">
              <FormLabel component="legend">Hình thức định danh:</FormLabel>
              <RadioGroup
                value={formData.identificationType}
                onChange={(e) =>
                  updateFormData(
                    "identificationType",
                    e.target.value as "cccd" | "cmnd"
                  )
                }
                row
              >
                <FormControlLabel
                  value="cccd"
                  control={<Radio />}
                  label="Căn Cước Công Dân (CCCD)"
                />
                <FormControlLabel
                  value="cmnd"
                  control={<Radio />}
                  label="Chứng Minh Nhân Dân (CMND)"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              label={`Số ${formData.identificationType.toUpperCase()} *`}
              value={formData.identificationNumber}
              onChange={(e) =>
                updateFormData("identificationNumber", e.target.value)
              }
              error={Boolean(errors.identificationNumber)}
              helperText={errors.identificationNumber}
              inputProps={{ maxLength: 12 }}
            />

            <TextField
              fullWidth
              label="Họ & Tên *"
              placeholder="Họ và tên theo CCCD/CMND"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />

            <TextField
              fullWidth
              label="Chủ sở hữu ảnh định danh"
              placeholder="Nhập tên chủ sở hữu ảnh"
              value={formData.identificationPictureOwner}
              onChange={(e) =>
                updateFormData("identificationPictureOwner", e.target.value)
              }
              error={Boolean(errors.identificationPictureOwner)}
              helperText={errors.identificationPictureOwner}
            />

            {/* ID Picture Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Hình chụp của thẻ {formData.identificationType.toUpperCase()} *
              </Typography>
              <FileUpload
                label={`Chọn ảnh ${formData.identificationType.toUpperCase()}`}
                files={formData.identificationPictureFile}
                onFilesChange={(files) =>
                  updateFormData("identificationPictureFile", files)
                }
                accept="image/*"
                maxSize={5}
                required
                error={errors.identificationPictureFile as string}
                helperText="Vui lòng chụp ảnh chụp cận CCCD/CMND. Các thông tin trong CCCD/CMND phải được hiển thị rõ ràng"
              />
            </Paper>
          </Box>
        );

      case 4: // Agreement & Completion
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="success">
              Bạn đã hoàn thành các bước đăng ký! Vui lòng xem lại thông tin và
              xác nhận.
            </Alert>

            {/* Summary */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tóm tắt thông tin
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Tên Designer:
                    </Typography>
                    <Typography variant="body1">
                      {formData.designerName}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Email:
                    </Typography>
                    <Typography variant="body1">{formData.email}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Số điện thoại:
                    </Typography>
                    <Typography variant="body1">
                      {formData.phoneNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Số {formData.identificationType.toUpperCase()}:
                    </Typography>
                    <Typography variant="body1">
                      {formData.identificationNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Chứng chỉ/Giải thưởng:
                    </Typography>
                    <Typography variant="body1">
                      {formData.certificates}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Chủ sở hữu ảnh định danh:
                    </Typography>
                    <Typography variant="body1">
                      {formData.identificationPictureOwner}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ghi chú (tùy chọn)"
              placeholder="Nhập thêm thông tin bạn muốn chia sẻ với EcoFashion..."
              value={formData.note}
              onChange={(e) => updateFormData("note", e.target.value)}
              helperText={`${formData.note.length}/500 ký tự`}
              inputProps={{ maxLength: 500 }}
            />

            <FormControl error={Boolean(errors.agreedToTerms)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreedToTerms}
                      onChange={(e) =>
                        updateFormData("agreedToTerms", e.target.checked)
                      }
                    />
                  }
                  label="Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và trung thực. Tôi đã đọc và đồng ý với Chính sách Bảo Mật của EcoFashion"
                />
                {errors.agreedToTerms && (
                  <Typography variant="caption" color="error">
                    {errors.agreedToTerms}
                  </Typography>
                )}
              </FormGroup>
            </FormControl>
          </Box>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <PaletteIcon sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Đăng ký Nhà Thiết Kế
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Tham gia cộng đồng những nhà thiết kế thời trang bền vững
            </Typography>
            <Divider />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Quay lại
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || isSubmitting}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting
                  ? "Đang xử lý..."
                  : loading
                  ? "Đang gửi..."
                  : "Gửi đơn đăng ký"}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Tiếp theo
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
=======
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
>>>>>>> main
  );
}
