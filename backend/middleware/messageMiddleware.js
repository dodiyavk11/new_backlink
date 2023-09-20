const path = require("path")
const multer = require("multer");

// new order file storage config
const messageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/message_assets")
  },
  filename: (req, file, cb) => {
    // cb(null, `${(file.originalname)}`)
    cb(null, `msg_image_${Date.now() + path.extname(file.originalname)}`)
  }
})

exports.assetsUpload = multer({
  storage: messageConfig,
})
