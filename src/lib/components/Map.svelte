<script lang="ts">
  import 'leaflet/dist/leaflet.css';

  import {
    map,
    latLng,
    tileLayer,
    type MapOptions,
    CRS,
    imageOverlay,
    latLngBounds,
  } from 'leaflet';
  import { onMount } from 'svelte';

  let { image } = $props();

  onMount(() => {
    let asdf = map('map', {
      crs: CRS.Simple,
      minZoom: -5,
    });

    let bounds = latLngBounds(latLng(0, 0), latLng(1000, 1000));
    let imagae = imageOverlay(image, bounds).addTo(asdf);
    asdf.fitBounds(bounds);
  });
</script>

<div id="map" class="h-48"></div>
