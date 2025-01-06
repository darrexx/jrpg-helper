<script lang="ts">
  import DataTable from '$lib/components/data-table.svelte';
  import type { Row, Table } from '@tanstack/table-core';
  import { columns } from './columns';
  import { localStore } from '$lib/localstorage.svelte';
  import type { SideQuest } from '$lib/models/sideQuests';
  import { getTableConfig } from './table.svelte';
  import SideQuestsActions from './SideQuestsActions.svelte';

  let { data } = $props();
  const sideQuests = data.sideQuests;

  let { tableState, onColumnFiltersChange, onRowSelectionChange, onSortingChange } =
    getTableConfig();
  let table: Table<SideQuest> | undefined = $state();

  let completedSideQuests = localStore<number[]>(`${data.gameId}sideQuestIds`, []);

  let showCompleted = $state<boolean>(false);
  let mergedSideQuests: SideQuest[] = $derived(
    sideQuests
      .map((x) => {
        return { completed: completedSideQuests.value.includes(x.id), ...x };
      })
      .filter((x) => (showCompleted ? true : !x.completed)),
  );

  const toggleComplete = () => {
    const selected = table?.getFilteredSelectedRowModel().rows ?? [];

    let selectedIds = selected.map((x) => x.getValue<number>('id'));
    const selectedIdsToRemove: number[] = [];

    const inLocalstorage = completedSideQuests.value;
    selectedIds.forEach((x) => {
      const i = inLocalstorage.indexOf(x);
      if (i !== -1) {
        inLocalstorage.splice(i, 1);
        selectedIdsToRemove.push(x);
      }
    });
    selectedIds = selectedIds.filter((x) => !selectedIdsToRemove.includes(x));

    const completedIds = Array.from(new Set([...selectedIds, ...inLocalstorage]));
    completedSideQuests.value = completedIds;

    selected.forEach((x) => x.toggleSelected());
  };

  const rowClassesFn = (row: Row<SideQuest>) => {
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
  <SideQuestsActions {toggleComplete} {table} bind:showCompleted></SideQuestsActions>
</div>
<DataTable
  data={mergedSideQuests}
  {columns}
  {onRowSelectionChange}
  {onSortingChange}
  {onColumnFiltersChange}
  state={tableState}
  bind:table
  {rowClassesFn}
></DataTable>
