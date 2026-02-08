import path from "path";
import fs from "fs";
import multer from "multer";

const PET_UPLOAD_DIR = path.join("public", "upload", "pets");

if (!fs.existsSync(PET_UPLOAD_DIR)) {
  fs.mkdirSync(PET_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PET_UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const name = `${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type. Only jpeg, png, jpg, webp allowed."));
  },
});

export const uploadPetImage = upload.single("image");
export const PET_IMAGE_URL_PREFIX = "/public/upload/pets/";
