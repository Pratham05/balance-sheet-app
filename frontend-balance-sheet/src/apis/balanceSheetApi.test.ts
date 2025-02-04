import axios from 'axios';
import { getBalanceSheetData } from '../apis/balanceSheetApi';
import { BalanceSheetData } from '../types/balanceSheet';

jest.mock('axios');

describe('getBalanceSheetData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(jest.resetAllMocks);

  it('should get balance sheet data and return response when Api Call is succeeds', async () => {
    const mockData: BalanceSheetData = {
      reportId: 'BalanceSheet',
      reportName: 'Balance Sheet',
      reportType: 'BalanceSheet',
      reportTitles: [
        'Balance Sheet',
        'Demo Company (AU)',
        'As at 28 February 2018',
      ],
      reportDate: '23 February 2018',
      updatedDateUtc: '/Date(1519358515899)/',
      rows: [],
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getBalanceSheetData();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:4000/api/balance-sheet'
    );
    expect(result).toEqual(mockData);
  });

  it('should throw an error when API response is invalid', async () => {
    mockedAxios.get.mockResolvedValue({ data: null });

    await expect(getBalanceSheetData()).rejects.toThrow(
      'Failed to retrieve balance sheet data.'
    );
  });

  it('should throw an error when the API call fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getBalanceSheetData()).rejects.toThrow(
      'Failed to retrieve balance sheet data.'
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
