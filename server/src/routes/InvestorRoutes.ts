import { Router } from "express";
import {
  getInvestors,
  getInvestorById,
  getCommitmentsByInvestor,
  createInvestor
} from "../controllers";

export const router = Router();
router.get("/investors", getInvestors);
router.get("/investors/:id", getInvestorById);
router.get("/investors/:id/commitments", getCommitmentsByInvestor);
router.post("/investors", createInvestor);
