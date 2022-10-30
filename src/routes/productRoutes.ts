import express, { Router } from "express";
import { db } from "../config/database";
import { handleAuthentication } from "../middleware/verifyHeader";

const router: Router = express.Router();

router.use(handleAuthentication);
router.get("/", (req, res) => {
  const chon = req.query["search"];
  const query = "SELECT * FROM products";
  db.query(query, (err, result, fields) => {
    console.log("result ", result);
  });
});
router.post("/", (req, res) => {});

export default router;
