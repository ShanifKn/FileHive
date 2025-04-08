import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// Set up Multer storage configuration
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, "./uploads"); // Save files to the 'uploads' directory temporarily
      },
      filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Generate a temporary file name
      },
});

// Initialize multer WITHOUT file size limit
const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
            // Allowed types: images + documents
            const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|txt|doc|docx|xlsx|csv/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype.toLowerCase());

            if (extname && mimetype) {
                  return cb(null, true);
            } else {
                  cb(new Error("Only image, PDF, text, and document files are allowed!"), false);
            }
      },
});

// Middleware to handle file upload (image or document)
const uploadSingleFile = upload.single("file"); // Use field name 'file'

// Middleware to convert image to WebP (only if it's an image)
const convertToWebP = async (req, res, next) => {
      if (!req.file) {
            return next(new Error("No file uploaded!"));
      }

      const isImage = /^image\//.test(req.file.mimetype);

      if (!isImage) {
            // If not an image, skip WebP conversion
            return next();
      }

      try {
            const originalPath = req.file.path;
            const webpPath = `./uploads/${Date.now()}.webp`;

            await sharp(originalPath)
                  .webp({ quality: 80 })
                  .toFile(webpPath);

            fs.unlinkSync(originalPath); // Delete original image

            // Update file info to point to the WebP version
            req.file.path = webpPath;
            req.file.filename = path.basename(webpPath);
            req.file.mimetype = "image/webp";

            next();
      } catch (err) {
            next(err);
      }
};

export { uploadSingleFile, convertToWebP };
