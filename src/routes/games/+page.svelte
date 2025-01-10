<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import DataTable from '$lib/components/data-table.svelte';
  import { columns, type Game } from './columns';
  import { CirclePlus } from 'lucide-svelte';
  import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    type TableOptions,
  } from '@tanstack/table-core';
  import { createSvelteTable } from '$lib/components/ui/data-table/index.js';

  let { data } = $props();
  const games = data.games;

  const tableOptions: TableOptions<Game> = {
    get data() {
      return games;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  };
  let table = $state(createSvelteTable(tableOptions));
</script>

<div class="my-2 grid grid-cols-3 items-center">
  <div></div>
  <h1 class="self scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
    Games
  </h1>
  <Button variant="default" class="ml-auto mr-2 w-28" href="/games/add"
    ><div class="flex items-center gap-2"><span>Add Game</span> <CirclePlus /></div></Button
  >
</div>
<DataTable {table}></DataTable>
