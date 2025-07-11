﻿using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using EcoFashionBackEnd.Exceptions;
using EcoFashionBackEnd.Helpers.Photos;
using Microsoft.Extensions.Options;

namespace EcoFashionBackEnd.Services
{
    public class CloudService
    {
        private readonly Cloudinary _cloudinary;

        public CloudService(IOptions<CloundSettings> cloundSettingsOptions)
        {
            var cloudSettings = cloundSettingsOptions.Value;

            Account account = new Account(
                cloudSettings.CloundName,
                cloudSettings.CloundKey,
                cloudSettings.CloundSecret);

            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
        }

        public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0 ||
                (file.ContentType != "image/png" && file.ContentType != "image/jpeg" && file.ContentType != "image/jpg"))
            {
                throw new BadRequestException("File is null, empty, or not in JPG,PNG or JPEG format.");
            }

            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    UploadPreset = "Ecofashion"
                };

                try
                {
                    return await _cloudinary.UploadAsync(uploadParams);
                }
                catch (Exception ex)
                {
                    // Xử lý lỗi tải lên Cloudinary
                    throw new Exception("Failed to upload image to Cloudinary.", ex);
                }
            }
        }



        public async Task<List<ImageUploadResult>> UploadImagesAsync(List<IFormFile> files)
        {
            var uploadResults = new List<ImageUploadResult>();

            foreach (var file in files)
            {
                uploadResults.Add(await UploadImageAsync(file));
            }

            return uploadResults;
        }
    }
}
