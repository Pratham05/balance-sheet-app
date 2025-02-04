import axios from 'axios';
import type { BalanceSheetData } from '../types/balanceSheet';

const API_BASE_URL = 'http://localhost:4000';

export const getBalanceSheetData = async (): Promise<BalanceSheetData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/balance-sheet`);

    if (!response.data) {
      throw new Error('Invalid response');
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve balance sheet data.');
  }
};
