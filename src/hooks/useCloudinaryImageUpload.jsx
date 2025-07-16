import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// 1. Upload function: makes a POST request to Cloudinary
const uploadCloudinaryImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_upload_preset);
  formData.append("cloud_name", import.meta.env.VITE_cloud_name);

  const res = await axios.post(import.meta.env.VITE_cloudinary_url, formData);
  return res?.data?.secure_url; // returns only the URL
};

// 2. Hook: wraps the upload function with TanStack Query's useMutation
const useCloudinaryImageUpload = () => {
  return useMutation({
    mutationFn: uploadCloudinaryImage,
  });
};

export default useCloudinaryImageUpload;
