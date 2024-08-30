require('express-async-errors')

const AppError = require('./utils/AppError')
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const uploadConfig = require('./config/upload')


const app = express()

const port = process.env.PORT || 3333

app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_DIR))

app.use(express.json())

app.use(routes)

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    console.log(err)

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})