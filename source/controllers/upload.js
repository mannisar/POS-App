const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './upload')
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
})

const multerFilter = (request, file, callback) => {
    const dotext = file.mimetype.toLowerCase()
    if (dotext === 'image/png' || dotext === 'image/jpeg' || dotext === 'image/jpg' || dotext === 'image/gif') {
        callback(null, true)
    } else {
        callback("ONLY EXTENSION IMAGE FILE!", false)
    }
}

const upload = multer({
    storage: multerStorage,
    // limits: {
    //     fileSize: 1024 * 1024
    // },
    fileFilter: multerFilter
})

const uploadImages = upload.single('image')
// const uploadFiles = upload.array("images", 10); // limit to 10 images

module.exports = {
    uploadImages: uploadImages
}