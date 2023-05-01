<template>
  <main class="w-screen h-screen z-2 absolute" @click="onTap()" :style="colorStyle"></main>
</template>

<script>
import { computed, defineComponent, ref, unref, computed } from 'vue';

const colors = `
rgb(244, 67, 54)
rgb(233, 30, 99)
rgb(156, 39, 176)
rgb(103, 58, 183)
rgb(63, 81, 181)
rgb(33, 150, 243)
rgb(3, 169, 244)
rgb(0, 188, 212)
rgb(0, 150, 136)
rgb(76, 175, 80)
rgb(139, 195, 74)
rgb(205, 220, 57)
rgb(255, 235, 59)
rgb(255, 193, 7)
rgb(255, 152, 0)
rgb(255, 87, 34)
rgb(121, 85, 72)
rgb(158, 158, 158)
rgb(96, 125, 139)
`.trim().split('\n');

export default defineComponent({
  setup() {
    const color = ref('');

    function onTap() {
      const index = Math.floor(Math.random() * 1000) % colors.length;
      color.value = colors[index];
    }

    const colorStyle = computed(() => ({ backgroundColor: unref(color) }));

    return { color, colorStyle, onTap };
  },
});
</script>
<style>
main {
  transition: background-color 0.5 ease;
}
</style>
