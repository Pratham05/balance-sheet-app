import {
  getBalanceSheet,
  BalanceSheetResult,
} from '../usecases/getBalanceSheet';
import {
  BalanceSheetResponse,
  XeroApiClient,
} from '../apiClients/xeroApiClient';
import { BalanceSheetError } from '../errors/CustomErrors';

describe('getBalanceSheet', () => {
  const mockXeroClient = {
    getBalanceSheet: jest.fn(),
  } as unknown as jest.Mocked<XeroApiClient>;

  afterEach(jest.resetAllMocks);

  it('should return balance sheet data when API call succeeds and response contains Balance Sheet report', async () => {
    const mockResponse = {
      Reports: [
        {
          ReportID: 'BalanceSheet',
          ReportName: 'My mock Report',
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

    mockXeroClient.getBalanceSheet.mockResolvedValue(mockResponse);

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty('data', {
      reportDate: '23 February 2018',
      reportId: 'BalanceSheet',
      reportName: 'My mock Report',
      reportTitles: [
        'Balance Sheet',
        'Demo Company (AU)',
        'As at 28 February 2018',
      ],
      reportType: 'BalanceSheet',
      rows: [],
      updatedDateUtc: '/Date(1519358515899)/',
    });

    expect(mockXeroClient.getBalanceSheet).toHaveBeenCalledTimes(1);
  });

  it('should return a BalanceSheetError when API response does not contain Balance Sheet report', async () => {
    const mockResponseWithoutBalanceSheet = {
      Reports: [
        {
          ReportID: 'no-balance-sheet',
          ReportName: 'My mock Report',
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

    mockXeroClient.getBalanceSheet.mockResolvedValue(
      mockResponseWithoutBalanceSheet
    );

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty(
      'error',
      new BalanceSheetError('Error processing balance sheet data', 500)
    );
  });

  it('should return a BalanceSheetError when API call fails', async () => {
    mockXeroClient.getBalanceSheet.mockRejectedValue(new Error('API Error'));

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty(
      'error',
      new BalanceSheetError('Error processing balance sheet data', 500)
    );
  });

  it('should return a BalanceSheetError when response data is invalid', async () => {
    const invalidResponse = { invalid: 'data' };
    mockXeroClient.getBalanceSheet.mockResolvedValue(
      invalidResponse as unknown as BalanceSheetResponse
    );

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty(
      'error',
      new BalanceSheetError('Error processing balance sheet data', 500)
    );
  });
});
