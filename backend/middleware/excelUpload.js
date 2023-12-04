const multer = require("multer");
const path = require("path")

// img storage config
const imgConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/excel_temp")
  },
  filename: (req, file, cb) => {
    // cb(null, `${(file.originalname)}`)
    cb(null, `${Date.now() + path.extname(file.originalname)}`)
  }
})

exports.uploadExcel = multer({
  storage: imgConfig,

})
