import React from 'react';

interface TableProps<T> {
  readonly columns: Array<{ key: keyof T; label: string }>;
  readonly data: T[];
  readonly renderRow: (item: T, idx: number) => React.ReactNode;
}

export const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>{renderRow(item, idx)}</tr>
        ))}
      </tbody>
    </table>
  );
};
