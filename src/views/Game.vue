<template>
  <World>
    <Model src="map.glb" :scale='70' physics="map" />
    <ThirdPersonCamera active mouseControl>
      <Player />
    </ThirdPersonCamera>
          <template v-if="usersData">
      <User  v-for="item in usersData" :key="item.id" :user-data="item" />
      </template>
    <Skybox texture="skybox.jpg" />
  </World>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import socket from '@/utils/socket'
import Player from '@/components/Player.vue'
import { World, Model, ThirdPersonCamera,Cube,Skybox } from 'lingo3d-vue';
import useUserStore from '@/store/modules/player'
import User from '@/components/User.vue'
const userStore = useUserStore()
const usersData = ref<Array<any>>([])
socket.on('update', (data: any) => {
  delete data[userStore.id]
    const arr: Array<any> = Object.keys(data)
    if(arr.length){
    const arr2=arr.map((v) => {
      return { ...data[v] }
    })
     usersData.value=arr2
    }else{
      usersData.value=[]
    }
})

</script>