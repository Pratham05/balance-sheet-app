import { render, screen } from '@testing-library/react';
import BalanceSheetPage from '../pages/BalanceSheetPage';
import { useBalanceSheet } from '../controllers/balanceSheetController';
import type { BalanceSheetData } from '../types/balanceSheet';

jest.mock('../controllers/balanceSheetController');


describe('BalanceSheetPage', () => {
  const mockUseBalanceSheet = useBalanceSheet as jest.MockedFunction<typeof useBalanceSheet>;

  afterEach(jest.resetAllMocks);

  it('should display loading message when data is being fetched', () => {
    mockUseBalanceSheet.mockReturnValue({ data: null, loading: true, error: null });

    render(<BalanceSheetPage />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should display an error message when fetching data fails', () => {
    mockUseBalanceSheet.mockReturnValue({ data: null, loading: false, error: 'Failed to fetch data' });

    render(<BalanceSheetPage />);

    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });

  it('should display a no data message when no balance sheet data is available', () => {
    mockUseBalanceSheet.mockReturnValue({ data: null, loading: false, error: null });

    render(<BalanceSheetPage />);

    expect(screen.getByText(/No balance sheet data available/i)).toBeInTheDocument();
  });

  it('should display the BalanceSheetTable component when data is available', () => {
    const mockData: BalanceSheetData = {
      reportId: 'BalanceSheet',
      reportName: 'Balance Sheet',
      reportType: 'BalanceSheet',
      reportTitles: ['Balance Sheet', 'Demo Company (AU)', 'As at 28 February 2018'],
      reportDate: '23 February 2018',
      updatedDateUtc: '/Date(1519358515899)/',
      rows: [
        {
          rowType: 'Header',
          cells: [{ value: 'Assets' }, { value: 'Liabilities' }, { value: 'Equity' }],
        },
      ],
    };

    mockUseBalanceSheet.mockReturnValue({ data: mockData, loading: false, error: null });

    render(<BalanceSheetPage />);

    expect(screen.getByText('Balance Sheet')).toBeInTheDocument(); 
    expect(screen.getByText('Balance Sheet - Demo Company (AU) - As at 28 February 2018')).toBeInTheDocument(); 
  });
});
