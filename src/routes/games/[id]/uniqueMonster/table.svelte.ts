import type {
  RowSelectionState,
  SortingState,
  ColumnFiltersState,
  Updater,
} from '@tanstack/table-core';

export const getTableConfig = () => {
  let rowSelection = $state<RowSelectionState>({});
  const onRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    if (typeof updater === 'function') {
      rowSelection = updater(rowSelection);
    } else {
      rowSelection = updater;
    }
  };

  let sorting = $state<SortingState>([]);
  const onSortingChange = (updater: Updater<SortingState>) => {
    if (typeof updater === 'function') {
      sorting = updater(sorting);
    } else {
      sorting = updater;
    }
  };

  let columnFilters = $state<ColumnFiltersState>([]);
  const onColumnFiltersChange = (updater: Updater<ColumnFiltersState>) => {
    if (typeof updater === 'function') {
      columnFilters = updater(columnFilters);
    } else {
      columnFilters = updater;
    }
  };

  const tableState = {
    get rowSelection() {
      return rowSelection;
    },
    get sorting() {
      return sorting;
    },
    get columnFilters() {
      return columnFilters;
    },
  };

  return { tableState, onColumnFiltersChange, onSortingChange, onRowSelectionChange };
};
