const multer = require('multer'); // For handling file uploads
const path = require('path');


// Configure multer to handle file uploads and store them in a directory
const multerStorageSingle = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/profile-photos')); // Store uploads in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const multerFilterSingle = (req, file, cb) => {
    const allowedMimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // pdfValidationError = 'Unsupported PDF file format.'
    cb(null, false);
  }
};

const uploadProfilePhoto = multer({
  storage: multerStorageSingle,
  fileFilter: multerFilterSingle,
  limits: { fieldSize: 2000000 }, // Adjust the file size limit as needed
}).single('profilePhoto');



module.exports = { uploadProfilePhoto };

