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

  it('should return balance sheet data and set status 200 when usecase returns a successful response', async () => {
    const mockData = {
      reportDate: '23 February 2018',
      reportId: 'report-id',
      reportName: 'My mock Report',
      reportTitles: [
        'Balance Sheet',
        'Demo Company (AU)',
        'As at 28 February 2018',
      ],
      reportType: 'BalanceSheet',
      rows: [],
      updatedDateUtc: '/Date(1519358515899)/',
    };

    mockedGetBalanceSheet.mockResolvedValue({ data: mockData });

    await handler(mockContext as Context);

    expect(mockedGetBalanceSheet).toHaveBeenCalledWith(
      mockApiClients.xeroClient
    );
    expect(mockContext.status).toBe(200);
    expect(mockContext.body).toEqual(mockData);
  });

  it('should return error and set received status code when the usecase returns an error', async () => {
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

  it('should return error and set status 500 when there is an unexpected erorr', async () => {
    mockedGetBalanceSheet.mockRejectedValue(new Error('Unexpected error'));

    await handler(mockContext as Context);

    expect(mockContext.status).toBe(500);
    expect(mockContext.body).toEqual({ error: 'Internal Server Error' });
  });
});
