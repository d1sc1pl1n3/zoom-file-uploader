const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(req, res) {
  const tags = await cloudinary.api.tags({
    max_results: 50,
  });
  res.status(200).json(tags);
}
