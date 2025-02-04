import { render, screen } from '@testing-library/react';
import BalanceSheetTable from '../components/BalanceSheetTable';
import type { BalanceSheetData } from '../types/balanceSheet';

describe('BalanceSheetTable', () => {
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
      {
        rowType: 'Section',
        title: 'Bank Accounts',
      },
      {
        rowType: 'Row',
        cells: [{ value: 'Business Account' }, { value: '50000' }, { value: '20000' }],
      },
      {
        rowType: 'SummaryRow',
        cells: [{ value: 'Total' }, { value: '5000' }, { value: '2000' }],
      },
      {
        rowType: 'Section',
        title: 'Investments',
        subRows: [
          {
            rowType: 'Row',
            cells: [{ value: 'Stocks' }, { value: '10000' }, { value: '4000' }],
          },
        ],
      },
    ],
  };

  it('should render report name and titles', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Balance Sheet')).toBeInTheDocument();
    expect(screen.getByText('Balance Sheet - Demo Company (AU) - As at 28 February 2018')).toBeInTheDocument();
  });

  it('should render header row and its cells', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Liabilities')).toBeInTheDocument();
    expect(screen.getByText('Equity')).toBeInTheDocument();
  });

  it('should render section titles', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Bank Accounts')).toBeInTheDocument();
    expect(screen.getByText('Investments')).toBeInTheDocument();
  });

  it('should render normal rows and their cell values', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Business Account')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
    expect(screen.getByText('20000')).toBeInTheDocument();
  });

  it('should render summary row and their cell values', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('should render nested subRows', () => {
    render(<BalanceSheetTable data={mockData} />);
    
    expect(screen.getByText('Stocks')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
  });
});
