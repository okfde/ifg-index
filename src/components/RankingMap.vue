<template>
  <div class="flex justify-center w-full">
    <ranking-map class="map" ref="map" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import rankingMap from '@data/map?component';
import '@data/map'; // to generate the svg file too

const router = useRouter();
const map = ref(null);

onMounted(() => {
  for (const node of map.value.querySelectorAll('path[id]')) {
    const slug = node.id;
    node.addEventListener('click', () => router.push(`/laender/${slug}/`));
  }
});
</script>

<style lang="postcss" scoped>
.map {
  @apply sm:max-w-1/2 w-full pointer-events-auto;

  &:deep() path[id] {
    @apply cursor-pointer transition-opacity;
  }

  &:deep() g:hover > path[id] {
    @apply opacity-25;
  }

  &:deep() g:hover > path[id]:hover {
    @apply opacity-100;
  }
}
</style>