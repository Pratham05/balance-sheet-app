import React from 'react';
import type { BalanceSheetData, BalanceSheetRow, BalanceSheetCell } from '../types/balanceSheet';

interface BalanceSheetTableProps {
  data: BalanceSheetData;
}

const BalanceSheetTable = ({ data }: BalanceSheetTableProps) => {
  const renderRow = (row: BalanceSheetRow) => {
    if (row.rowType === 'Header') {
      return (
        <tr>
          {row.cells &&
          row.cells.map((cell: BalanceSheetCell, cellIndex) => (
          <td key={cellIndex}>
            {cell.value}
          </td>
        ))}
        </tr>
      );
    } else if (row.rowType === 'Row' || row.rowType === 'SummaryRow') {
      return (
        <tr>
          {row.cells &&
        row.cells.map((cell: BalanceSheetCell, cellIndex) => (
          <td key={cellIndex}>
            {cell.value}
          </td>
        ))}
        </tr>
      );
    } else if (row.rowType === 'Section') {
      return (
        <tr>
          <td colSpan={3}><strong>{row.title}</strong></td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>{data.reportName}</h1>
      <h2>{data.reportTitles.join(' - ')}</h2>
      <table>
        <thead>
          {data.rows.filter(row => row.rowType === 'Header').map((row, index) => (
            <React.Fragment key={index}>
              {renderRow(row)}
            </React.Fragment>
          ))}
        </thead>
        <tbody>
          {data.rows.filter(row => row.rowType !== 'Header').map((row, index) => (
            <React.Fragment key={index}>
              {renderRow(row)}
              {row.subRows && row.subRows.map((subRow, subIndex) => (
                <React.Fragment key={subIndex}>
                  {renderRow(subRow)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetTable;