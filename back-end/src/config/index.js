const config = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  KEY: process.env.KEY,
  JWT_LIFETIME: process.env.JWT_LIFETIME,
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
  SERVER: process.env.SERVER,
  PATH_UPLOAD: process.env.PATH_UPLOAD,
  MONGO_URL: process.env.MONGO_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
}

export default config;