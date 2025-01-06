<script lang="ts">
  import { gamesFormSchema } from '$lib/forms/games/gamesFormSchema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Calendar } from '$lib/components/ui/calendar';
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils.js';
  import { buttonVariants } from '$lib/components/ui/button/button.svelte';
  import CalendarIcon from 'lucide-svelte/icons/calendar';
  import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from '@internationalized/date';

  let { data } = $props();
  const form = superForm(data.form, {
    validators: zodClient(gamesFormSchema),
  });

  const { form: formData, enhance } = form;
  const df = new DateFormatter('de-DE', {
    dateStyle: 'long',
  });

  let value = $state<DateValue | undefined>();
  $effect(() => {
    value = $formData.releaseDate
      ? new CalendarDate(
          $formData.releaseDate.getFullYear(),
          $formData.releaseDate.getMonth() + 1,
          $formData.releaseDate.getDate(),
        )
      : undefined;
  });
</script>

<form method="post" use:enhance class="mx-8">
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Name</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.Description>Game Name</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="wikiLink">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Wiki-Link</Form.Label>
        <Input {...props} bind:value={$formData.wikiLink} />
      {/snippet}
    </Form.Control>
    <Form.Description>Link to Wiki</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="releaseDate" class="flex flex-col">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Release Date</Form.Label>
        <Popover.Root>
          <Popover.Trigger
            {...props}
            class={cn(
              buttonVariants({ variant: 'outline' }),
              'justify-start pl-4 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            {$formData.releaseDate ? df.format($formData.releaseDate) : 'Pick a date'}
            <CalendarIcon class="ml-auto size-4 opacity-50" />
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" side="top">
            <Calendar
              type="single"
              value={value as DateValue}
              calendarLabel="Release Date"
              onValueChange={(v) => {
                if (v) {
                  $formData.releaseDate = v.toDate(getLocalTimeZone());
                } else {
                  $formData.releaseDate = undefined;
                }
              }}
            />
          </Popover.Content>
        </Popover.Root>
        <Form.Description>Release Date</Form.Description>
        <Form.FieldErrors />
        <input hidden value={$formData.releaseDate} name={props.name} />
      {/snippet}
    </Form.Control>
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
