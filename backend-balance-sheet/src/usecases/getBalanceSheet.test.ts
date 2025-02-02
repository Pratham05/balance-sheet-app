import {
  getBalanceSheet,
  BalanceSheetError,
  BalanceSheetResult,
} from '../usecases/getBalanceSheet';
import { XeroApiClient } from '../apiClients/xeroApiClient';

describe('getBalanceSheet', () => {
  let mockXeroClient: jest.Mocked<XeroApiClient>;

  beforeEach(() => {
    mockXeroClient = {
      getBalanceSheet: jest.fn(),
    } as unknown as jest.Mocked<XeroApiClient>;
  });

  it('should return balance sheet data when API call succeeds', async () => {
    const mockData = { assets: 1000, liabilities: 500 };

    mockXeroClient.getBalanceSheet.mockResolvedValue(mockData);

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty('data', mockData);
    expect(mockXeroClient.getBalanceSheet).toHaveBeenCalledTimes(1);
  });

  it('should return a BalanceSheetError when API call fails', async () => {
    mockXeroClient.getBalanceSheet.mockRejectedValue(new Error('API Error'));

    const result: BalanceSheetResult = await getBalanceSheet(mockXeroClient);

    expect(result).toHaveProperty(
      'error',
      new BalanceSheetError('Error processing balance sheet data', 500)
    );
  });
});
