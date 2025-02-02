import { XeroApiClient } from '../apiClients/xeroApiClient';

interface BalanceSheet {}

class BalanceSheetError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'BalanceSheetError';
  }
}

type BalanceSheetResult = { data: BalanceSheet } | { error: BalanceSheetError };

const getBalanceSheet = async (
  xeroClient: XeroApiClient
): Promise<BalanceSheetResult> => {
  try {
    const data = await xeroClient.getBalanceSheet();
    return { data };
  } catch (error) {
    return {
      error: new BalanceSheetError('Error processing balance sheet data', 500),
    };
  }
};

export { BalanceSheetError, BalanceSheetResult, getBalanceSheet };
