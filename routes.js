import express from "express";
import sparql from "./sparql.js";

const router = express.Router();
router.post("/select", sparql.select);

export default router;
