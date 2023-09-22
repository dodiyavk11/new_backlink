const path = require("path")
const multer = require("multer");

// new order file storage config
const newOrderConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/order_assets")
  },
  filename: (req, file, cb) => {
    // console.log(file)
    cb(null, `new_order_${Date.now() + path.extname(file.originalname)}`)
    // cb(null, `NewOrder_${Date.now() +(file.originalname)}`)
  }
})


exports.uploadOrderFile = multer({
  storage: newOrderConfig,

})

// final file
// new order file storage config
const finalOrderConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/order_assets")
  },
filename: (req, file, cb) => {
  cb(null, `final_file${Date.now() + path.extname(file.originalname)}`)
  // cb(null, `Final_File_${Date.now() +(file.originalname)}`)
}
})




exports.uploadOrderFinalFile = multer({
  storage: finalOrderConfig,

})
