const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})


//File filter

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|mp4/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);


  if(extname && mimetype)
  {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"))
  }
}
console.log("🚀 ~ fileFilter ~ fileFilter:", fileFilter)

//size limit
 const upload = multer({ storage: storage , 
  fileFilter, 
  limits : {
  fileSize: 20 * 1024 * 1024 , 
  files: 10
}})
 console.log("🚀 ~ upload:", upload)


 module.exports = {upload}