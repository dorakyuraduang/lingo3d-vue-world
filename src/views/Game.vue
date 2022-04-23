<template>
  <World>
    <Model src="map.glb"  :scale="6" physics="map">
      <Find name="Material2.007" :texture="movie">
      </Find>
    </Model>
    <ThirdPersonCamera active mouseControl>
      <Player />
    </ThirdPersonCamera>
    <template v-if="userStore.usersData">
      <User v-for="item in  (userStore.usersData as any)" :key="item.id" :user-data="item" />
    </template>
    <Skybox texture="skybox.jpg" />
  </World>
</template>
<script setup lang="ts">
import flvjs from 'flv.js'
import socket from '@/utils/socket'
import Player from '@/components/Player.vue'
import { onMounted } from 'vue';
import { World, HTML, Model, ThirdPersonCamera, Cube, Skybox, Find } from 'lingo3d-vue';
import useUserStore from '@/store/modules/player'
import User from '@/components/User.vue'
const userStore = useUserStore()
document.getElementById('app')!.style.backgroundImage = 'none'
socket.on('update', (data: any) => {
  delete data[userStore.id]
  const arr: Array<any> = Object.keys(data)
  if (arr.length) {
    const arr2 = arr.map((v) => {
      return { ...data[v] }
    })
    //@ts-ignore
    userStore.usersData = arr2
  } else {
    userStore.usersData = []
  }
})
const movie=document.createElement('video')
  var flvPlayer = flvjs.createPlayer({
    type: 'flv',
    url: 'http://127.0.0.1:8000/live/dgl.flv',
    isLive:true
  });
  //@ts-ignore
  flvPlayer.attachMediaElement(movie);
  flvPlayer.load();
  flvPlayer.play();

</script>