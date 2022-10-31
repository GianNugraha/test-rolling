const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './image')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime()+'-'+file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg' ){
      cb(null, true)
    }
    else{
      cb(null, false)
    }
  }
  
  const upload = multer({storage: fileStorageEngine, fileFilter: fileFilter}).single('file')

  module.exports = upload;