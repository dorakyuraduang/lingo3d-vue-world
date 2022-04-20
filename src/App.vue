<script setup lang="ts" >
import {usePreload } from 'lingo3d-vue'
import { getRoleModel } from '@/model/role'
import Loading from '@/components/Loading.vue'
import Join from './views/Join.vue';
import useUserStore from '@/store/modules/player'
import Game from './views/Game.vue';
const userStore = useUserStore()
const progress = usePreload([
  "skybox.jpg",
  "map.glb",
  ...getRoleModel(),
], "55.4mb")
</script>
<template>
  <Loading v-if="progress !== 100" :progress="progress" />
  <Join v-else-if="progress == 100 && !userStore.isJoin"/>
  <Game v-else-if="userStore.isJoin"/>
</template>
<style lang="less" >
</style>