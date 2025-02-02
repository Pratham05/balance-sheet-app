import { createGetBalanceSheetHandler } from './getBalanceSheetHandler';
import { ApiClients } from '../apiClients';
import { Context } from 'koa';
import { getBalanceSheet } from '../usecases/getBalanceSheet';

jest.mock('../usecases/getBalanceSheet');

describe('createGetBalanceSheetHandler', () => {
  const mockApiClients: Partial<ApiClients> = {
    xeroClient: { getBalanceSheet: jest.fn() },
  };
  const mockContext: Partial<Context> = {};

  const mockedGetBalanceSheet = jest.mocked(getBalanceSheet);

  const handler = createGetBalanceSheetHandler(mockApiClients as ApiClients);

  afterEach(jest.resetAllMocks);

  it('should return balance sheet data and set status 200', async () => {
    const mockData = { assets: 1000, liabilities: 500 };
    mockedGetBalanceSheet.mockResolvedValue({ data: mockData });

    await handler(mockContext as Context);

    expect(mockedGetBalanceSheet).toHaveBeenCalledWith(
      mockApiClients.xeroClient
    );
    expect(mockContext.status).toBe(200);
    expect(mockContext.body).toEqual(mockData);
  });

  it('should handle errors and set appropriate status code when the use case returns an error', async () => {
    const mockError = {
      name: '',
      message: 'Error processing balance sheet data',
      statusCode: 500,
    };
    mockedGetBalanceSheet.mockResolvedValue({ error: mockError });

    await handler(mockContext as Context);

    expect(mockContext.status).toBe(500);
    expect(mockContext.body).toEqual({
      error: 'Error processing balance sheet data',
    });
  });

  it('should set status 500 for unexpected errors when there is an unexpected erorr', async () => {
    mockedGetBalanceSheet.mockRejectedValue(new Error('Unexpected error'));

    await handler(mockContext as Context);

    expect(mockContext.status).toBe(500);
    expect(mockContext.body).toEqual({ error: 'Internal Server Error' });
  });
});
