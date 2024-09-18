import { Request, Response } from "express";
import { InvestorService } from "../services";

const investorService = new InvestorService();

export const getInvestors = async (req: Request, res: Response) => {
  try {
    const investors = await investorService.getInvestors();
    res.json(investors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvestorById = async (req: Request, res: Response) => {
  try {
    const investor = await investorService.getInvestorById(parseInt(req.params.id));
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    res.json(investor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommitmentsByInvestor = async (req: Request, res: Response) => {
  try {
    const commitments = await investorService.getCommitmentsByInvestor(parseInt(req.params.id));
    if (!commitments) {
      return res.status(404).json({ message: "No commitments found for this investor" });
    }
    res.json(commitments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createInvestor = async (req: Request, res: Response) => {
  try {
    const newInvestor = await investorService.createInvestor(req.body);
    res.status(201).json(newInvestor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
