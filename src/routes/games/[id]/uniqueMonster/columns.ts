import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import TableActions from './table-actions.svelte';
import { Button } from '$lib/components/ui/button';
import DataTableCheckbox from '$lib/components/ui/data-table/data-table-checkbox.svelte';
import DataTableHeaderButton from '$lib/components/data-table-header-button.svelte';
import type { UniqueMonster } from '$lib/models/uniqueMonster';

export const columns: ColumnDef<UniqueMonster>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        controlledChecked: true,
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        controlledChecked: true,
        'aria-label': 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton, {
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        buttonText: 'Id',
      }),
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton, {
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        buttonText: 'Name',
      }),
  },
  {
    accessorKey: 'level',
    header: ({ column }) =>
      renderComponent(DataTableHeaderButton, {
        onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        buttonText: 'Level',
      }),
  },
  { accessorKey: 'map', header: 'Map' },
  { accessorKey: 'location', header: 'Location' },
  { accessorKey: 'spawntime', header: 'Spawntime' },
  { accessorKey: 'x', header: 'X' },
  { accessorKey: 'y', header: 'Y' },
  { accessorKey: 'z', header: 'Z' },
  {
    accessorKey: 'wikiLink',
    header: 'Wiki Link',
    cell: ({ row }) => {
      const link = row.getValue<string | undefined>('wikiLink');
      if (link != null) {
        return renderComponent(Button, {
          href: link,
          variant: 'link',
          children: createRawSnippet(() => {
            return {
              render: () => {
                return '<span>Link</span>';
              },
            };
          }),
        });
      }
      return renderSnippet(
        createRawSnippet(() => {
          return {
            render: () => {
              return '<span></span>';
            },
          };
        }),
        '',
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(TableActions, { id: row.original.id, gameId: row.original.gameId });
    },
  },
];
