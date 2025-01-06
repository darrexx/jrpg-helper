<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import DataTable from '$lib/components/data-table.svelte';
  import { columns } from './columns';
  import { CirclePlus } from 'lucide-svelte';

  let { data } = $props();
  const games = data.games;
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
<DataTable data={games} {columns}></DataTable>
