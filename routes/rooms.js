import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
// CREATE
router.post("/:hotelid", createRoom);
// UPDATE
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);
// DELETE
router.delete("/:id/:hotelid", deleteRoom);
// GET ONE
router.get("/:id", getRoom);
// GET ALL
router.get("/", getRooms);

export default router;
