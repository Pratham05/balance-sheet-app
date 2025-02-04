import { Context } from 'koa';
import { ApiClients } from '../apiClients';
import { getBalanceSheet } from '../usecases/getBalanceSheet';

export const createGetBalanceSheetHandler =
  (apiClients: ApiClients) => async (context: Context) => {
    try {
      const balanceSheetResult = await getBalanceSheet(apiClients.xeroClient);

      if ('error' in balanceSheetResult) {
        context.status = balanceSheetResult.error.statusCode;
        context.body = { error: balanceSheetResult.error.message };
      } else {
        context.status = 200;
        context.body = balanceSheetResult.data;
      }
    } catch (error) {
      context.status = 500;
      context.body = { error: 'Internal Server Error' };
    }
  };
