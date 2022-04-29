<template>
  <div id="zone_joystick"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import nipplejs from 'nipplejs';
const { send } = defineProps({
  send: Function
})

onMounted(() => {
  console.log(send)
  const manager = nipplejs.create({
    //@ts-ignore
    zone: document.getElementById('zone_joystick'),
    size: 100,
    threshold: 0.1,
    fadeTime: 250,
    multitouch: false,
    maxNumberOfNipples: 1,
    dataOnly: false,
    position: { top: '80%', left: '75px' },
    mode: 'static',
    restJoystick: true,
    catchDistance: 200,
    shape: 'circle'
  });
  manager.on('dir:up', (e) => {
       //@ts-ignore
    send('KEY_W_DOWN')
  })
  manager.on('dir:down', (e) => {
       //@ts-ignore
    send('KEY_S_DOWN')
  })
  manager.on('dir:left', (e) => {
       //@ts-ignore
    send('KEY_A_DOWN')
  })
  manager.on('dir:right', (e) => {
       //@ts-ignore
    send('KEY_D_DOWN')
  })
  manager.on('end',()=>{
     //@ts-ignore
    send('KEY_NONE_DOWN')
  })
})
</script>