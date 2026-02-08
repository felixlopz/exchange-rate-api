import { Router, Request, Response } from "express";
import ratesRouter from "./rates";

const router = Router();

router.use("/rates", ratesRouter);

// Health check
router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
