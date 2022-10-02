const multer = require('multer')

const ImageUpload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('invalid file format'))
        }

        cb(undefined,true)

    }
})
const docUpload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

        if(!file.originalname.match(/\.(png|jpg|jpeg|doc|docx|csv|xlsx|xls|pdf)$/)){
            return cb(new Error('invalid file format'))
        }

        cb(undefined,true)

    }
})
module.exports ={ImageUpload,docUpload}