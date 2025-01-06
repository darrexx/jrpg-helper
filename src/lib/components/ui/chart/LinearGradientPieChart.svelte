<script lang="ts">
  import { Arc, Group, LinearGradient, PieChart } from 'layerchart';
  import { Text } from 'layerchart';

  //todo migrate to svelte 5 when layerchart is upgraded to svelte 5 (https://github.com/techniq/layerchart/issues/159)
  export let divClasses: string = 'h-[160px]  p-4';
  export let domain: number[] = [0, 100];
  export let currentValue: number;
</script>

<div class={divClasses}>
  <PieChart>
    <svelte:fragment slot="marks">
      <LinearGradient class="from-destructive to-primary" let:url>
        <Group y={20}>
          <Arc
            {domain}
            outerRadius={80}
            innerRadius={-15}
            cornerRadius={10}
            padAngle={0.02}
            range={[-120, 120]}
            fill={url}
            track={{ class: 'fill-none stroke-surface-content/10' }}
            bind:value={currentValue}
          >
            <Text
              value="{currentValue} / {domain[1]}"
              textAnchor="middle"
              verticalAnchor="middle"
              class="overflow-visible text-3xl tabular-nums dark:fill-slate-50"
            />
          </Arc>
        </Group>
      </LinearGradient>
    </svelte:fragment>
  </PieChart>
</div>
