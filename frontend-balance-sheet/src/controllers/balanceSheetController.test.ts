import { renderHook, waitFor } from '@testing-library/react';
import { useBalanceSheet } from '../controllers/balanceSheetController';
import { getBalanceSheetData } from '../apis/balanceSheetApi';
import type { BalanceSheetData } from '../types/balanceSheet';

jest.mock('../apis/balanceSheetApi');

describe('useBalanceSheet', () => {
  const mockGetBalanceSheetData = getBalanceSheetData as jest.MockedFunction<
    typeof getBalanceSheetData
  >;

  afterEach(jest.resetAllMocks);

  it('should return balance sheet data when getting balance sheet data succeeds', async () => {
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

    mockGetBalanceSheetData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useBalanceSheet());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should set an error when getting balance sheet data fails', async () => {
    mockGetBalanceSheetData.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useBalanceSheet());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Failed to fetch balance sheet data');
  });
});
