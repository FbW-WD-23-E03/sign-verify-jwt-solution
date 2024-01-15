import { Router } from "express";
import database from "../database.js";
import { signToken, verifyToken } from "../utils/jwt.js";

const router = new Router();

router.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).send("No email provided");
  }

  const user = database.find((record) => record.email === email);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = signToken(user);

  res.send(token);
});

router.post("/verify", (req, res) => {
  try {
    const { token } = req.body;
    const verifiedToken = verifyToken(token);
    res.send(verifiedToken);
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
});

export default router;
