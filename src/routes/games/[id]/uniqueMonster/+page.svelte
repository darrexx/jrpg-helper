<script lang="ts">
  import DataTable from '$lib/components/data-table.svelte';
  import type { Row, Table } from '@tanstack/table-core';
  import { columns } from './columns';
  import { localStore } from '$lib/localstorage.svelte';
  import type { UniqueMonster } from '$lib/models/uniqueMonster';
  import { getTableConfig } from './table.svelte';
  import UniqueMonsterActions from './UniqueMonsterActions.svelte';

  let { data } = $props();
  const uniqueMonster = data.uniqueMonster;

  let { tableState, onColumnFiltersChange, onRowSelectionChange, onSortingChange } =
    getTableConfig();
  let table: Table<UniqueMonster> | undefined = $state();

  let completedUniqueMonsters = localStore<number[]>(`${data.gameId}uniqueMonsterIds`, []);

  let showCompleted = $state<boolean>(false);
  let mergedUniqueMonsters: UniqueMonster[] = $derived(
    uniqueMonster
      .map((x) => {
        return { completed: completedUniqueMonsters.value.includes(x.id), ...x };
      })
      .filter((x) => (showCompleted ? true : !x.completed)),
  );

  const toggleComplete = () => {
    const selected = table?.getFilteredSelectedRowModel().rows ?? [];

    let selectedIds = selected.map((x) => x.getValue<number>('id'));
    const selectedIdsToRemove: number[] = [];

    const inLocalstorage = completedUniqueMonsters.value;
    selectedIds.forEach((x) => {
      const i = inLocalstorage.indexOf(x);
      if (i !== -1) {
        inLocalstorage.splice(i, 1);
        selectedIdsToRemove.push(x);
      }
    });
    selectedIds = selectedIds.filter((x) => !selectedIdsToRemove.includes(x));

    const completedIds = Array.from(new Set([...selectedIds, ...inLocalstorage]));
    completedUniqueMonsters.value = completedIds;

    selected.forEach((x) => x.toggleSelected());
  };

  const rowClassesFn = (row: Row<UniqueMonster>) => {
    if (row.original.completed) {
      return 'bg-green-200 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800';
    }
    return '';
  };
</script>

<div class="m-2 grid grid-cols-3 items-center">
  <div></div>
  <h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
    {data.gameName}
  </h1>
  <UniqueMonsterActions {toggleComplete} {table} bind:showCompleted></UniqueMonsterActions>
</div>
<DataTable
  data={mergedUniqueMonsters}
  {columns}
  {onRowSelectionChange}
  {onSortingChange}
  {onColumnFiltersChange}
  state={tableState}
  bind:table
  {rowClassesFn}
></DataTable>
