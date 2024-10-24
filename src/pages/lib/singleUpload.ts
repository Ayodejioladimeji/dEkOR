export const singleUpload = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_UPDATE_PRESET);
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
