<script lang="ts">
  import { Ellipsis, TriangleAlert } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';

  let { id } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open menu</span>
        <Ellipsis class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <a class="w-full" href={`/games/${id}`}>View</a>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item>
        <a class="w-full" href={`/games/${id}/edit`}>Edit</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a class="w-full" href={`/games/${id}/edit/uniqueMonster`}>Edit Unique Monsters</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a class="w-full" href={`/games/${id}/edit/sideQuests`}>Edit Side Quests</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a class="flex w-full items-center gap-2 align-middle" href={`/games/${id}/delete`}
          ><TriangleAlert class="text-red-600" />Delete</a
        >
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
