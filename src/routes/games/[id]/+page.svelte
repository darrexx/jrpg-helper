<script lang="ts">
  import { browser } from '$app/environment';
  import LinearGradientPieChart from '$lib/components/ui/chart/LinearGradientPieChart.svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/';
  import { localStore } from '$lib/localstorage.svelte.js';
  import * as Card from '$lib/components/ui/card/';
  import { Button } from '$lib/components/ui/button/index.js';
  import { BookOpenCheck, Swords } from 'lucide-svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';

  let { data } = $props();

  let completedUniqueMonsters = localStore<number[]>(`${data.gameId}uniqueMonsterIds`, []);
  let completedUniqueMonstersCount = $derived(completedUniqueMonsters.value.length);

  let completedSideQuests = localStore<number[]>(`${data.gameId}sideQuestIds`, []);
  let completedSideQuestsCount = $derived(completedSideQuests.value.length);
</script>

<h1 class="self mb-2 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
  {data.gameName}
</h1>
<Separator></Separator>
<div class="mx-12 my-4 grid grid-cols-2 grid-rows-1 gap-4">
  <Card.Root class="bg-slate-100 dark:bg-slate-900">
    <Card.Header>
      <Card.Title class="text-center">Unique Monsters killed</Card.Title>
    </Card.Header>
    <Card.Content>
      {#if !browser}
        <Skeleton class="h-[160px] w-[100px] rounded-full" />
      {:else}
        <LinearGradientPieChart
          currentValue={completedUniqueMonstersCount}
          domain={[0, data.amountOfUniqueMonsters]}
        ></LinearGradientPieChart>
      {/if}
    </Card.Content>
    <Card.Footer>
      <Button class="w-full" href={`/games/${data.gameId}/uniqueMonster`}>
        <Swords class="mr-2 size-4" /> Show Unique Monsters
      </Button>
    </Card.Footer>
  </Card.Root>
  <Card.Root class="bg-slate-100 dark:bg-slate-900">
    <Card.Header>
      <Card.Title class="text-center">Sidequests completed</Card.Title>
    </Card.Header>
    <Card.Content>
      {#if !browser}
        <Skeleton class="h-[160px] w-[100px] rounded-full" />
      {:else}
        <LinearGradientPieChart
          currentValue={completedSideQuestsCount}
          domain={[0, data.amountOfSideQuests]}
        ></LinearGradientPieChart>
      {/if}
    </Card.Content>
    <Card.Footer>
      <Button class="w-full" href={`/games/${data.gameId}/sideQuests`}>
        <BookOpenCheck class="mr-2 size-4" /> Show Sidequests
      </Button>
    </Card.Footer>
  </Card.Root>
</div>
