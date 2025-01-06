<script lang="ts">
  import Header from './Header.svelte';
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';

  let { children } = $props();
</script>

<ModeWatcher />
<div class="app">
  <Header />

  <main>
    {@render children()}
  </main>
</div>
