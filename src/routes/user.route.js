import express from "express"
import { addUsers, deleteUser, getUser, getUsers, searchUsers, updateUser } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/add", addUsers)
router.get("/get", getUsers)
router.delete("/delete/:id", deleteUser)
router.get("/get/:id", getUser)
router.patch("/update/:id", updateUser)
router.get("/search", searchUsers)

export default router