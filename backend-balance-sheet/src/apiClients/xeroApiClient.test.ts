import { AxiosInstance } from 'axios';
import { createXeroApiClient, XeroApiClient } from './xeroApiClient';

jest.mock('axios');

describe('XeroApiClient', () => {
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;
  let xeroClient: XeroApiClient;

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    xeroClient = createXeroApiClient(mockAxiosInstance);
  });

  it('should fetch balance sheet data successfully', async () => {
    const mockResponse = { data: { assets: 1000, liabilities: 500 } };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const result = await xeroClient.getBalanceSheet();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/Reports/BalanceSheet');
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error when API call fails', async () => {
    mockAxiosInstance.get.mockRejectedValue(new Error('API failure'));

    await expect(xeroClient.getBalanceSheet()).rejects.toThrow(
      'Failed to fetch balance sheet data from Xero API'
    );

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/Reports/BalanceSheet');
  });
});
