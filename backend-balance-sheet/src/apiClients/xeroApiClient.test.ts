import { AxiosInstance } from 'axios';
import { createXeroApiClient } from './xeroApiClient';
import { BalanceSheetResponse } from './xeroApiClient';
import { ApiError, ValidationError } from '../errors/CustomErrors';

jest.mock('axios');

describe('XeroApiClient', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
  } as unknown as jest.Mocked<AxiosInstance>;

  const xeroClient = createXeroApiClient(mockAxiosInstance);

  afterEach(jest.resetAllMocks);

  it('should fetch balance sheet data and return the result when API call is successful', async () => {
    const mockResponse: BalanceSheetResponse = {
      Reports: [
        {
          ReportID: 'BalanceSheet',
          ReportName: 'Balance Sheet',
          ReportType: 'BalanceSheet',
          ReportTitles: [
            'Balance Sheet',
            'Demo Company (AU)',
            'As at 28 February 2018',
          ],
          ReportDate: '23 February 2018',
          UpdatedDateUTC: '/Date(1519358515899)/',
          Rows: [],
        },
      ],
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const result = await xeroClient.getBalanceSheet();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/Reports/BalanceSheet');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an ApiError when API call fails', async () => {
    mockAxiosInstance.get.mockRejectedValue(new Error('API failure'));

    await expect(xeroClient.getBalanceSheet()).rejects.toThrow(ApiError);
    await expect(xeroClient.getBalanceSheet()).rejects.toThrow(
      'Failed to fetch balance sheet data from Xero API'
    );

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/Reports/BalanceSheet');
  });

  it('should throw a ValidationError when response data is invalid', async () => {
    const invalidResponse = { data: { invalid: 'data' } };
    mockAxiosInstance.get.mockResolvedValue(invalidResponse);

    await expect(xeroClient.getBalanceSheet()).rejects.toThrow(ValidationError);
    await expect(xeroClient.getBalanceSheet()).rejects.toThrow(
      'Invalid balance sheet data format'
    );
  });
});
