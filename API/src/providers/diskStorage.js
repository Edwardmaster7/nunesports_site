const fs = require('fs')
const path = require('path')
const uploadConfig = require('./config/upload')

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_DIR, file),
            path.resolve(uploadConfig.UPLOADS_DIR, file)
        )

        return file
    }

    async deleteFile(file) {
        const filePath = fs.promises.unlink(path.resolve(uploadConfig.UPLOADS_DIR, file))
        
        try {
            await fs.promises.stat(filePath)
        } catch (err) {
            return
        }
    }
}

module.exports = DiskStorage