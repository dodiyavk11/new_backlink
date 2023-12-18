const multer = require("multer");
const path = require("path");

const pdfFilter = (req, file, cb,res) => {
  const allowedExtensions = ['.pdf'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/attachement");
  },
  filename: (req, file, cb) => {
    cb(null, `attachement_${Date.now() + path.extname(file.originalname)}`);
  },
});

exports.emailAttachementUpload = multer({
  storage: imgConfig,
  fileFilter: pdfFilter,
});
