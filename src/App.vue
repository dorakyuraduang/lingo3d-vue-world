<script setup lang="ts">
import { usePreload } from "lingo3d-vue";
import { getRoleModel } from "@/model/role";
import Loading from "@/components/Loading.vue";
import Join from "./views/Join.vue";
import useUserStore from "@/store/modules/player";
import Game from "./views/Game.vue";
import { ref } from "vue";
import { preload } from "lingo3d";
const userStore = useUserStore();
// 和角色无关的模型先加载
usePreload(["skybox.jpg", "maps/scene.gltf"], "26mb");

const progress = ref(0);
const selectedRole = (role: string) => {
  preload(getRoleModel(role), "17mb", val => (progress.value = val)).then(
    () => (progress.value = 100)
  );
};
</script>
<template>
  <Join v-if="!userStore.isJoin" @select-role="selectedRole" />
  <Loading v-else-if="userStore.isJoin && progress !== 100" :progress="progress" />
  <Game v-else />
</template>
