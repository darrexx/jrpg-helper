<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { page } from '$app/state';

  let { class: className = '' } = $props();

  const splittedPath = $derived(['home', ...page.url.pathname.split('/').filter((x) => x)]);
  const items = $derived(
    splittedPath.map((x, i, arr) => {
      return {
        label: x,
        href: `${i !== arr.length - 1 ? `/${splittedPath.slice(1, 1 + i).join('/')}` : ''}`,
      };
    }),
  );
</script>

<Breadcrumb.Root class={className}>
  <Breadcrumb.List>
    {#each items as item}
      <Breadcrumb.Item>
        {#if item.href !== ''}
          <Breadcrumb.Link href={item.href} class="max-w-20 truncate md:max-w-none">
            {item.label}
          </Breadcrumb.Link>
        {:else}
          <Breadcrumb.Page class="max-w-20 truncate md:max-w-none">
            {item.label}
          </Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
      {#if item.href !== ''}
        <Breadcrumb.Separator />
      {/if}
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
