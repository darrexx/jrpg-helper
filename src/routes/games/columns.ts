import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import TableActions from './table-actions.svelte';

//Todo: Add Stats: Count of Monster / Sidequests
export type Game = {
  id: number;
  name: string;
  wikiLink: string;
  releaseDate?: Date | null;
};

export const columns: ColumnDef<Game>[] = [
  { accessorKey: 'id', header: 'id' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'wikiLink', header: 'Wiki Link' },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: ({ row }) => {
      const dateHeaderSnippet = createRawSnippet<[Date | undefined]>((getDate) => {
        const date = getDate();
        return { render: () => `<span>${date ? date.toLocaleDateString() : ''}</span>` };
      });
      return renderSnippet(dateHeaderSnippet, row.getValue('releaseDate'));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return renderComponent(TableActions, { id: row.original.id });
    },
  },
];
