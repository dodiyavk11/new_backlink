const fs = require('fs');
const path = require("path")

exports.unlinkProfile = (filename)=>{
  const getFileName = path.basename(`assets/profile/${filename}`)

  fs.exists(`assets/profile/${filename}`,(exists)=>{ 
    if (exists && getFileName !== "null") {
      fs.unlink(`assets/profile/${filename}`, (err) => {
        console.log(err)
        if (err) throw err
      })
    }
  })
}

exports.unlinkAttachement = (filename)=>{
  const getFileName = path.basename(`assets/attachement/${filename}`)

  fs.exists(`assets/attachement/${filename}`,(exists)=>{ 
    if (exists && getFileName !== "null") {
      fs.unlink(`assets/attachement/${filename}`, (err) => {
        console.log(err)
        if (err) throw err
      })
    }
  })
}

exports.unlinkMessageFiles = (filename)=>{
  const getFileName = path.basename(`assets/message_assets/${filename}`)

  fs.exists(`assets/message_assets/${filename}`,(exists)=>{
    if (exists && getFileName !== "null") {
      fs.unlink(`assets/message_assets/${filename}`, (err) => {
        console.log(err)
        if (err) throw err
      })
    }
  })
}

exports.deleteOrderFile = (filename)=>{
  const getFileName = path.basename(`assets/order_assets/${filename}`)
  fs.exists(`assets/order_assets/${filename}`,(exists)=>{
    if (exists && getFileName !== "null") {
      fs.unlink(`assets/order_assets/${filename}`, (err) => {
        console.log(err)
        if (err) throw err
      })
    }
  })
}