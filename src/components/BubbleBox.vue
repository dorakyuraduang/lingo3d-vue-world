<template>
  <div
  v-show="userStore.message"
    class="mt-5 mb-5 p-2 bg-white border-solid border-gray-300 border-l border-t border-r border-b border-light-blue-500 rounded-md relative">
    <div
      class="w-2.5 h-2.5 border-gray-300 bg-white transform absolute  border-r border-b rotate-45 -bottom-1.5 inset-x-2/4 -translate-x-1.5">
    </div>
    <div>{{ userStore.message }}</div>
  </div>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/player'
const userStore = useUserStore()
</script>