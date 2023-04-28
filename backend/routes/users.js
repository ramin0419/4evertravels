import express from "express";
import { updateTour } from "../controllers/tourController.js";
import { deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

//update  user
router.put('/:id',verifyUser ,updateTour)

//delete  user
router.delete('/:id',verifyUser ,deleteUser)

//getSingle  user
router.get('/:id',verifyUser ,getSingleUser)

//getAll  user
router.get('/',verifyAdmin, getAllUser)


export default router;