export interface BalanceSheetData {
  reportId: 'BalanceSheet';
  reportName: string;
  reportType: string;
  reportTitles: string[];
  reportDate: string;
  updatedDateUtc: string;
  rows: BalanceSheetRow[];
}

export interface BalanceSheetRow {
  rowType: string;
  title?: string;
  subRows?: BalanceSheetRow[];
  cells?: BalanceSheetCell[];
}

export interface BalanceSheetCell {
  value: string;
  attributes?: { id: string; value: string }[];
}
