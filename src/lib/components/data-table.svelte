<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type OnChangeFn,
    type Row,
    type RowSelectionState,
    type SortingState,
    type TableOptions,
    type TableState,
    type Table as TableType,
  } from '@tanstack/table-core';
  import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
  import * as Table from '$lib/components/ui/table/index.js';

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowSelectionChange?: OnChangeFn<RowSelectionState> | undefined;
    onSortingChange?: OnChangeFn<SortingState> | undefined;
    onColumnFiltersChange?: OnChangeFn<ColumnFiltersState> | undefined;
    state?: Partial<TableState> | undefined;
    table?: TableType<TData> | undefined;
    rowClassesFn?: (row: Row<TData>) => string;
  };

  let {
    data,
    columns,
    state,
    onRowSelectionChange,
    onSortingChange,
    onColumnFiltersChange,
    table = $bindable(),
    rowClassesFn = () => '',
  }: DataTableProps<TData, TValue> = $props();

  const tableOptions: TableOptions<TData> = {
    get data() {
      return data;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state,
    onSortingChange,
    onRowSelectionChange,
    onColumnFiltersChange,
  };

  table = createSvelteTable(tableOptions);
</script>

<div class="mx-2 rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && 'selected'} class={rowClassesFn(row)}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
