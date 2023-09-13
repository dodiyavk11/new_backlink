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
