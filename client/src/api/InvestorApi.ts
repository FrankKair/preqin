import axios from 'axios';
import { Commitment, Investor } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchInvestors = async () => {
  try {
    const response = await api.get<Investor[]>('/investors');
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to load investors: ${error}`);
  }
};

export const fetchInvestorById = async (id: number) => {
  try {
    const response = await api.get<Investor>(`/investors/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to load investor: ${error}`);
  }
};

export const fetchInvestorCommitments = async (id: number) => {
  try {
    const response = await api.get<Commitment[]>(`/investors/${id}/commitments`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to load commitments: ${error}`);
  }
};
