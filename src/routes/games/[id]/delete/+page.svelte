<script lang="ts">
  import TriangleAlert from 'lucide-svelte/icons/circle-alert';
  import * as Alert from '$lib/components/ui/alert/index.js';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data } = $props();
</script>

<Alert.Root variant="destructive" class="mx-8 my-2">
  <TriangleAlert class="size-4" />
  <Alert.Title>Warning</Alert.Title>
  <Alert.Description>This Operation results in deletion of Data</Alert.Description>
</Alert.Root>

<h1 class=" scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
  Do you really want to delete {data.gameName}?
</h1>
<form method="post">
  <input hidden name="id" id="id" value={data.id} />
  <!-- <div class="float-right flex gap-4"> -->
  <Button variant="default" href={`/games`} class="float-left mx-4 my-2">Back</Button>
  <Button variant="destructive" type="submit" class="float-right mx-4 my-2">Delete</Button>
  <!-- </div> -->
</form>
