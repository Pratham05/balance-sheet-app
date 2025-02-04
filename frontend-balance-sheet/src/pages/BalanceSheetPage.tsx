import { useBalanceSheet } from '../controllers/balanceSheetController';
import BalanceSheetTable from '../components/BalanceSheetTable';

const BalanceSheetPage = () => {
  const { data, loading, error } = useBalanceSheet();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No balance sheet data available</p>;

  return (
    <div>
      <BalanceSheetTable data={data} />
    </div>
  );
};

export default BalanceSheetPage;
