const path = require("path")
const multer = require("multer");

// new order file storage config
const newOrderConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./order_assets")
  },
  filename: (req, file, cb) => {
    cb(null, `new_order_${Date.now() + path.extname(file.originalname)}`)
    // cb(null, `NewOrder_${Date.now() +(file.originalname)}`)
  }
})


exports.uploadOrderFile = multer({
  storage: newOrderConfig,

})

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.doc', '.docx'];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExt)) {
    cb(null, true);
  } else {
    return cb("Error: only doc|docx is allowed", false);
  }
};

// final file
// new order file storage config
const finalOrderConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./order_assets")
  },
filename: (req, file, cb) => {
  cb(null, `final_file${Date.now() + path.extname(file.originalname)}`)
  // cb(null, `Final_File_${Date.now() +(file.originalname)}`)
}
})


exports.uploadOrderFinalFile = multer({
  storage: finalOrderConfig,

})


const textFileConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/temp_file");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(null, `textFile${Date.now() + path.extname(file.originalname)}`)
  }
});

exports.textFileUploadTemp = multer({
  storage: textFileConfig,
  fileFilter: fileFilter
});