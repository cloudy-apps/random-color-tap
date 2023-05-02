<template>
  <main class="w-screen h-screen z-2 absolute" @click="onTap()" @tap="onTap()" @touchend="onTap()" :class="color"></main>
</template>

<script>
import { defineComponent, ref, unref, computed } from 'vue';

export default defineComponent({
  setup() {
    const color = ref('');

    function onTap() {
      const index = 1 + Math.floor(Math.random() * 1000) % 18;
      color.value = `color-${index}`;
      console.log(unref(color));
    }

    return { color, onTap };
  },
});
</script>
<style>
main {
  transition: background-color 0.5s ease;
}

.color-1 { background-color: rgb(244, 67, 54); }
.color-2 { background-color: rgb(233, 30, 99); }
.color-3 { background-color: rgb(156, 39, 176); }
.color-4 { background-color: rgb(103, 58, 183); }
.color-5 { background-color: rgb(63, 81, 181); }
.color-6 { background-color: rgb(33, 150, 243); }
.color-7 { background-color: rgb(3, 169, 244); }
.color-8 { background-color: rgb(0, 188, 212); }
.color-9 { background-color: rgb(0, 150, 136); }
.color-10 { background-color: rgb(76, 175, 80); }
.color-11 { background-color: rgb(139, 195, 74); }
.color-12 { background-color: rgb(205, 220, 57); }
.color-13 { background-color: rgb(255, 235, 59); }
.color-14 { background-color: rgb(255, 193, 7); }
.color-15 { background-color: rgb(255, 152, 0); }
.color-16 { background-color: rgb(255, 87, 34); }
.color-17 { background-color: rgb(121, 85, 72); }
.color-18 { background-color: rgb(158, 158, 158); }
.color-19 { background-color: rgb(96, 125, 139); }

</style>
