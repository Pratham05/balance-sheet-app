import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/BalanceSheetPage', () => () => <div data-testid="balance-sheet-page">Balance Sheet Page</div>);

describe('App Component', () => {
  it('should render BalanceSheetPage', () => {
    render(<App />);

    expect(screen.getByTestId('balance-sheet-page')).toBeInTheDocument();
    expect(screen.getByText('Balance Sheet Page')).toBeInTheDocument();
  });
});
