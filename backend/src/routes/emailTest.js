import express from "express";
import { sendTestEmail } from "../services/email.js";

export const emailTestRouter = express.Router();

emailTestRouter.post("/send", async (req, res) => {
  try {
    await sendTestEmail();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});