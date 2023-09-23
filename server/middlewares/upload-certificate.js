const multer = require('multer'); // For handling file uploads
const path = require('path');


// Configure multer to handle file uploads and store them in a directory
const multerStorageSingle = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/certificates')); // Store uploads in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const multerFilterSingle = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    // pdfValidationError = 'Unsupported PDF file format.';
    cb(null, false);
  }
};

const uploadCertificate = multer({
  storage: multerStorageSingle,
  fileFilter: multerFilterSingle,
  limits: { fieldSize: 2000000 }, // Adjust the file size limit as needed
}).single('pdfFile'); // Make sure to use 'pdfFile' as the field name matching your input element



module.exports = { uploadCertificate };

