import { useState, useEffect } from 'react';
import { getBalanceSheetData } from '../apis/balanceSheetApi';
import type { BalanceSheetData } from '../types/balanceSheet';

export const useBalanceSheet = () => {
  const [data, setData] = useState<BalanceSheetData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBalanceSheetData();
        setData(result);
      } catch (err) {
        setError('Failed to fetch balance sheet data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
