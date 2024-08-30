const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../config/upload")

const UsersController = require("../controllers/usersController.js")
// const UserAvatarController = require("../controllers/userAvatarController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const ensureAdmin = require("../middlewares/ensureAdmin.js")

const usersRouter = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
// const userAvatarController = new UserAvatarController()

usersRouter.get("/:id", usersController.show)
usersRouter.post("/", usersController.create)
usersRouter.put("/:id", ensureAuthenticated, usersController.update)
usersRouter.delete("/:id", ensureAuthenticated, ensureAdmin, usersController.delete)

module.exports = usersRouter