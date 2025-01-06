<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
  import { Button } from '$lib/components/ui/button/index.js';

  let {
    variant = 'ghost',
    buttonText,
    sortIcon,
    ...restProps
  }: ComponentProps<typeof Button> & { buttonText: string; sortIcon?: Snippet } = $props();
  //Todo, update Arrow Icons if sorting asc or desc
</script>

<Button {variant} {...restProps}>
  {buttonText}
  {#if sortIcon}
    {@render sortIcon()}
  {:else}
    <ArrowUpDown class="ml-2 size-4" />
  {/if}
</Button>
