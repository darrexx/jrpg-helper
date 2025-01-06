<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Check, ChevronDown, ChevronUp, ListCheck, X } from 'lucide-svelte';

  let { table = $bindable(), showCompleted = $bindable(), toggleComplete } = $props();

  let dropdownOpen = $state<boolean>(false);
</script>

<div class="flex gap-2">
  <Input
    placeholder="Filter by Name..."
    value={(table?.getColumn('name')?.getFilterValue() as string) ?? ''}
    onchange={(e) => {
      table?.getColumn('name')?.setFilterValue(e.currentTarget.value);
    }}
    oninput={(e) => {
      table?.getColumn('name')?.setFilterValue(e.currentTarget.value);
    }}
    class=""
  />
  <DropdownMenu.Root bind:open={dropdownOpen}>
    <DropdownMenu.Trigger class={buttonVariants({ variant: 'default' })}
      >Actions {#if dropdownOpen}
        <ChevronUp />
      {:else}
        <ChevronDown />
      {/if}</DropdownMenu.Trigger
    >
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Item onclick={() => (showCompleted = !showCompleted)}
          >{#if showCompleted}
            <Check />
          {:else}
            <X />
          {/if}Show Completed</DropdownMenu.Item
        >
        <DropdownMenu.Item onclick={toggleComplete}><ListCheck />Toggle Complete</DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
