import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Table } from './table';

function renderTable() {
  return render(
    <Table
      label="Cookies we use"
      columns={[
        { label: 'Name', width: '40%' },
        { label: 'Lifetime', width: '60%' },
      ]}
      rows={[
        ['session', '90 days'],
        ['csrf', 'Browser session'],
      ]}
    />,
  );
}

describe('Table', () => {
  it('names the table and its scroll region', () => {
    renderTable();

    expect(screen.getByRole('table', { name: 'Cookies we use' }))
      .toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Cookies we use' }))
      .toHaveAttribute('tabindex', '0');
  });

  it('heads each row with its first cell', () => {
    renderTable();

    const row = screen.getAllByRole('row')[1];

    expect(within(row).getByRole('rowheader')).toHaveTextContent('session');
    expect(within(row).getByRole('cell')).toHaveTextContent('90 days');
  });

  it('matches snapshot', () => {
    const { container } = renderTable();

    expect(container).toMatchSnapshot();
  });
});
