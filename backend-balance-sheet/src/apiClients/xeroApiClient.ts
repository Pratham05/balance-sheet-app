import { AxiosInstance } from 'axios';

interface XeroApiClient {
  getBalanceSheet: () => Promise<any>;
}

const createXeroApiClient = (axiosInstance: AxiosInstance): XeroApiClient => {
  return {
    getBalanceSheet: async () => {
      try {
        const response = await axiosInstance.get('/Reports/BalanceSheet');
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch balance sheet data from Xero API');
      }
    },
  };
};

export { createXeroApiClient, XeroApiClient };
