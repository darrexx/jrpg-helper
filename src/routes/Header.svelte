<script lang="ts">
  import { page } from '$app/state';
  import Sun from 'lucide-svelte/icons/sun';
  import Moon from 'lucide-svelte/icons/moon';

  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import logo from '../lib/images/J-logo.png';
  import BreadCrumb from '$lib/components/BreadCrumb.svelte';
  import NoteSheet from '$lib/components/NoteSheet.svelte';
</script>

<header
  class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <div
    class="container flex h-12 max-w-screen-2xl content-between justify-center gap-6 align-middle"
  >
    <img src={logo} alt="Logo" />
    <BreadCrumb class="w-1/2 self-center"></BreadCrumb>
    <!-- <nav class="flex w-full items-center align-middle">
      <ul class="flex w-full content-between justify-around">
        <li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
          <a href="/">Home</a>
        </li>
        <li aria-current={page.url.pathname === '/games' ? 'page' : undefined}>
          <a href="/games">Games</a>
        </li>
      </ul>
    </nav> -->
    <div class="ml-auto flex self-center align-middle">
      <NoteSheet></NoteSheet>
      <Button onclick={toggleMode} variant="ghost" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
  </div>
</header>
