<script>
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { uniqueMonsterFormSchema } from '$lib/forms/uniqueMonster/uniqueMonsterFormSchema';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';

  let { data } = $props();
  const form = superForm(data.form, {
    validators: zodClient(uniqueMonsterFormSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="post" use:enhance class="mx-8 my-4" enctype="multipart/form-data">
  <Form.Field {form} name="file">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Json File</Form.Label>
        <Input {...props} type="file" accept=".json,application/json" bind:value={$formData.file} />
      {/snippet}
    </Form.Control>
    <Form.Description
      >Json File for Unique Monsters according to Json Schema: <Button
        variant="link"
        href="/uniqueMonster.schema.json">schema.json</Button
      ></Form.Description
    >
    <Form.FieldErrors />
  </Form.Field>
  <input hidden type="number" value={$formData.id} name="id" />
  <Form.Button class="float-right">Submit</Form.Button>
</form>
