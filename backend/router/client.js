import express from "express";
import client from "../controllers/client.js";
const router = express.Router();

//http://localhost:3003/api/client/registerClient
router.post("/registerClient", client.registerClient);
router.get("/listClient", client.listClient);
router.get("/findClient/:_id", client.findClient);
router.put("/updateClient", client.updateClient);
router.delete("/deleteClient/:_id", client.deleteClient);

export default router;