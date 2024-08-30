const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs')

const TMP_DIR = path.resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_DIR = path.resolve(TMP_DIR, 'uploads')

// create temporary directory for upload files, then create the upload directory
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR)
  fs.mkdirSync(UPLOADS_DIR)
}

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_DIR,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

module.exports = {
    TMP_DIR,
    UPLOADS_DIR,
    MULTER
}