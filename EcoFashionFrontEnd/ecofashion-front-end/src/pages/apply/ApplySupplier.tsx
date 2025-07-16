import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applySupplierSchema } from "../../schemas/applySupplierSchema";
import { applicationService } from "../../services/api/applicationService";
import { useNavigate } from "react-router-dom";

export default function ApplySupplier() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: zodResolver(applySupplierSchema),
  });

  // Xử lý preview hình ảnh
  const avatarFile = watch("avatarFile");
  const bannerFile = watch("bannerFile");
  const identificationPictureFront = watch("identificationPictureFront");
  const identificationPictureBack = watch("identificationPictureBack");
  const portfolioFiles = watch("portfolioFiles");

  const getPreview = (file) => {
    if (file && file instanceof File) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const onSubmit = async (data) => {
    const files = data.portfolioFiles ? Array.from(data.portfolioFiles) : [];
    const request = { ...data, portfolioFiles: files };
    try {
      await applicationService.applyAsSupplier(request);
      alert("Gửi đơn đăng ký thành công!");
      reset();
      navigate("/my-applications");
    } catch (e) {
      alert("Có lỗi xảy ra khi gửi đơn!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <fieldset style={{ border: "1px solid #ccc", borderRadius: 6, marginBottom: 24, padding: 16 }}>
        <legend style={{ fontWeight: "bold", color: "#1976d2" }}>Thông tin cơ bản</legend>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label>Logo công ty *</label>
            <input type="file" {...register("avatarFile")} accept="image/*" />
            {avatarFile && avatarFile[0] && getPreview(avatarFile[0]) && (
              <img src={getPreview(avatarFile[0])} alt="avatar preview" width={80} style={{ marginTop: 8 }} />
            )}
                          {typeof errors.avatarFile?.message === "string" && (
                <span style={{ color: "red" }}>{errors.avatarFile.message}</span>
              )}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label>Ảnh banner</label>
            <input type="file" {...register("bannerFile")} accept="image/*" />
            {bannerFile && bannerFile[0] && getPreview(bannerFile[0]) && (
              <img src={getPreview(bannerFile[0])} alt="banner preview" width={120} style={{ marginTop: 8 }} />
            )}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Địa chỉ *</label>
          <input type="text" {...register("address")} />
          {errors.address && <span style={{ color: "red" }}>{errors.address.message}</span>}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Số điện thoại *</label>
          <input type="text" {...register("phoneNumber")} />
          {errors.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber.message}</span>}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mã số thuế</label>
          <input type="text" {...register("taxNumber")} />
        </div>
      </fieldset>

      <fieldset style={{ border: "1px solid #ccc", borderRadius: 6, marginBottom: 24, padding: 16 }}>
        <legend style={{ fontWeight: "bold", color: "#1976d2" }}>Portfolio & Media</legend>
        <div style={{ marginBottom: 12 }}>
          <label>Website Portfolio</label>
          <input type="text" {...register("portfolioUrl")} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Ảnh sản phẩm (Portfolio Files)</label>
          <input type="file" {...register("portfolioFiles")} multiple accept="image/*" />
          {portfolioFiles && Array.from(portfolioFiles).map((file, idx) => (
            getPreview(file) && <img key={idx} src={getPreview(file)} alt="portfolio preview" width={60} style={{ marginRight: 8, marginTop: 8 }} />
          ))}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Chuyên môn (Specialization URL)</label>
          <input type="text" {...register("specializationUrl")} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mô tả công ty (Bio)</label>
          <textarea {...register("bio")} rows={3} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Chứng chỉ/Giải thưởng</label>
          <input type="text" {...register("certificates")} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mạng xã hội (Social Links, JSON)</label>
          <input type="text" {...register("socialLinks")} placeholder='{"instagram":"...","facebook":"..."}' />
        </div>
      </fieldset>

      <fieldset style={{ border: "1px solid #ccc", borderRadius: 6, marginBottom: 24, padding: 16 }}>
        <legend style={{ fontWeight: "bold", color: "#1976d2" }}>Thông tin định danh</legend>
        <div style={{ marginBottom: 12 }}>
          <label>Số CCCD/CMND *</label>
          <input type="text" {...register("identificationNumber")} />
          {errors.identificationNumber && <span style={{ color: "red" }}>{errors.identificationNumber.message}</span>}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Ảnh mặt trước CCCD/CMND *</label>
          <input type="file" {...register("identificationPictureFront")} accept="image/*" />
          {identificationPictureFront && identificationPictureFront[0] && getPreview(identificationPictureFront[0]) && (
            <img src={getPreview(identificationPictureFront[0])} alt="front id preview" width={80} style={{ marginTop: 8 }} />
          )}
                        {typeof errors.identificationPictureFront?.message === "string" && (
                <span style={{ color: "red" }}>{errors.identificationPictureFront.message}</span>
              )}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Ảnh mặt sau CCCD/CMND *</label>
          <input type="file" {...register("identificationPictureBack")} accept="image/*" />
          {identificationPictureBack && identificationPictureBack[0] && getPreview(identificationPictureBack[0]) && (
            <img src={getPreview(identificationPictureBack[0])} alt="back id preview" width={80} style={{ marginTop: 8 }} />
          )}
         {typeof errors.identificationPictureBack?.message === "string" && (
  <span style={{ color: "red" }}>{errors.identificationPictureBack.message}</span>
)}
        </div>
      </fieldset>

      <div style={{ marginBottom: 16 }}>
        <label>Ghi chú</label>
        <textarea {...register("note")} rows={2} />
      </div>

      <button type="submit" style={{ padding: "10px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600, cursor: "pointer" }}>
        Gửi đơn đăng ký
      </button>
    </form>
  );
}
