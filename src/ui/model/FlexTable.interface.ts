import React from 'react';

export interface FlexTableHeader<T> {
  label: string;
  field: keyof T;
  searchComponent?: React.ReactNode;
}

export interface FlexTableProps<T> {
  headers: FlexTableHeader<T>[];
  data: T[];
  renderCell: (item: T, field: keyof T) => React.ReactNode | string | undefined;
  onRowClick: (item: T) => void;
}
