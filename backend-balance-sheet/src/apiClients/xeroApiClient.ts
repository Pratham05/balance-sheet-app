import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { ApiError, ValidationError } from '../errors/CustomErrors';

const BalanceSheetSchema = z.object({
  Reports: z.array(
    z.object({
      ReportID: z.string(),
      ReportName: z.string(),
      ReportType: z.string(),
      ReportTitles: z.array(z.string()),
      ReportDate: z.string(),
      UpdatedDateUTC: z.string(),
      Rows: z.array(
        z.object({
          RowType: z.string(),
          Title: z.string().optional(),
          Rows: z
            .array(
              z.object({
                RowType: z.string(),
                Cells: z
                  .array(
                    z.object({
                      Value: z.string(),
                      Attributes: z
                        .array(
                          z.object({
                            Value: z.string(),
                            Id: z.string(),
                          })
                        )
                        .optional(),
                    })
                  )
                  .optional(),
              })
            )
            .optional(),
        })
      ),
    })
  ),
});

type BalanceSheetResponse = z.infer<typeof BalanceSheetSchema>;

type BalanceSheetResponseRow = {
  RowType: string;
  Title?: string;
  Rows?: BalanceSheetResponseRow[];
  Cells?: BalanceSheetResponseCell[];
};

type BalanceSheetResponseCell = {
  Value: string;
  Attributes?: { Id: string; Value: string }[];
};

interface XeroApiClient {
  getBalanceSheet: () => Promise<BalanceSheetResponse>;
}

const createXeroApiClient = (axiosInstance: AxiosInstance): XeroApiClient => {
  return {
    getBalanceSheet: async (): Promise<BalanceSheetResponse> => {
      try {
        const response = await axiosInstance.get('/Reports/BalanceSheet');
        const validationResult = BalanceSheetSchema.safeParse(response.data);

        if (!validationResult.success) {
          throw new ValidationError('Invalid balance sheet data format');
        }

        return validationResult.data;
      } catch (error) {
        if (error instanceof ValidationError) {
          throw error;
        }
        throw new ApiError('Failed to fetch balance sheet data from Xero API');
      }
    },
  };
};

export {
  createXeroApiClient,
  XeroApiClient,
  BalanceSheetResponse,
  BalanceSheetResponseRow,
  BalanceSheetResponseCell,
};
