<script lang="ts">
  import * as Sheet from '$lib/components/ui/sheet/index.js';
  import { NotebookPen } from 'lucide-svelte';
  import { page } from '$app/state';
  import { localStore } from '$lib/localstorage.svelte';
  import Textarea from './ui/textarea/textarea.svelte';

  const isGamePage = $derived(page.route.id?.includes('games') ?? false);

  const id = $derived(isGamePage ? (page.params?.id ?? -1) : -1);

  let note = localStore<string>(`${page.params?.id ?? -1}Notes`, '');
</script>

<Sheet.Root>
  <Sheet.Trigger><NotebookPen class="size-5" /></Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title class="text-3xl">Notes</Sheet.Title>
      {#if id != -1}
        <Textarea
          class="h-[50rem]"
          oninput={(e) => {
            note.value = e.currentTarget.value;
          }}
          value={note.value}
        />
      {:else}
        <Sheet.Description>
          <p>Here you can take Notes for a Game.</p>
          <p>Please select a Game and try it out!</p>
        </Sheet.Description>
      {/if}
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
