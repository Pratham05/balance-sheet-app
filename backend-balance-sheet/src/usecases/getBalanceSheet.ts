import {
  BalanceSheetResponse,
  BalanceSheetResponseCell,
  BalanceSheetResponseRow,
  XeroApiClient,
} from '../apiClients/xeroApiClient';
import { BalanceSheetError } from '../errors/CustomErrors';

interface BalanceSheet {
  reportId: string;
  reportName: string;
  reportType: string;
  reportTitles: string[];
  reportDate: string;
  updatedDateUtc: string;
  rows: BalanceSheetRow[];
}

interface BalanceSheetRow {
  rowType: string;
  title?: string;
  subRows?: BalanceSheetRow[];
  cells?: BalanceSheetCell[];
}

interface BalanceSheetCell {
  value: string;
  attributes?: { id: string; value: string }[];
}

type BalanceSheetResult = { data: BalanceSheet } | { error: BalanceSheetError };

const getBalanceSheet = async (
  xeroClient: XeroApiClient
): Promise<BalanceSheetResult> => {
  try {
    const balanceSheetResponse = await xeroClient.getBalanceSheet();
    return {
      data: mapBalanceSheetResponseToBalanceSheet(balanceSheetResponse),
    };
  } catch (error) {
    return {
      error: new BalanceSheetError('Error processing balance sheet data', 500),
    };
  }
};

const mapBalanceSheetResponseToBalanceSheet = (
  response: BalanceSheetResponse
): BalanceSheet => {
  const balanceSheetReport = response.Reports.find(
    (report) => report.ReportID === 'BalanceSheet'
  );
  if (!balanceSheetReport) {
    throw new Error('Could not find balance sheet report in response');
  }
  return {
    reportId: balanceSheetReport.ReportID,
    reportName: balanceSheetReport.ReportName,
    reportType: balanceSheetReport.ReportType,
    reportTitles: balanceSheetReport.ReportTitles,
    reportDate: balanceSheetReport.ReportDate,
    updatedDateUtc: balanceSheetReport.UpdatedDateUTC,
    rows: balanceSheetReport.Rows.map(mapBalanceSheetRow),
  };
};

const mapBalanceSheetRow = (row: BalanceSheetResponseRow): BalanceSheetRow => {
  return {
    rowType: row.RowType,
    title: row.Title,
    subRows: row.Rows ? row.Rows.map(mapBalanceSheetRow) : undefined,
    cells: row.Cells ? row.Cells.map(mapBalanceSheetCell) : undefined,
  };
};

const mapBalanceSheetCell = (
  cell: BalanceSheetResponseCell
): BalanceSheetCell => {
  return {
    value: cell.Value,
    attributes: cell.Attributes
      ? cell.Attributes.map((attr) => ({ id: attr.Id, value: attr.Value }))
      : undefined,
  };
};

export { type BalanceSheetResult, getBalanceSheet };
