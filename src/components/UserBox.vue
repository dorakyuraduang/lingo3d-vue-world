<template>
  <div class="user-box" ref="userBox">
    <div v-show="message"
      class="mt-5 mb-5 p-2 bg-white border-solid border-gray-300 border-l border-t border-r border-b border-light-blue-500 rounded-md relative">
      <div
        class="w-2.5 h-2.5 border-gray-300 bg-white transform absolute  border-r border-b rotate-45 -bottom-1.5 inset-x-2/4 -translate-x-1.5">
      </div>
      <div>{{ message }}</div>
    </div>
     <img v-show="isRed"  :src="getImageUrl('red')"  style="width:50px;margin-bottom:10px;" />
    <p class="name">{{ name }}</p>
  </div>
</template>
<script lang="ts" setup>
import { inject, Ref, watchEffect, ref } from 'vue';
const { name,message,isRed} = defineProps({
  name: String,
  message:String,
  isRed:Boolean
})
const userBox = ref()
function getImageUrl(name:string) {
  return new URL(`../../public/icon/${name}.png`, import.meta.url).href
}
const parentRef = inject<Ref<any> | undefined>("parent", undefined)
watchEffect(() => {
  if (userBox.value) {
    parentRef?.value.loop(() => {
      userBox.value.style.left = parentRef?.value.clientX + 'px'
      userBox.value.style.top = parentRef?.value.clientY + 'px'
    })
  }
})
</script>