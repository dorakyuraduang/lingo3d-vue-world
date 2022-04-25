<template>
<Model
    :src="`${userData.role}/untitled.fbx`"
    :x="userData.x"
    :y="userData.y"
    :z="userData.z"
    :rotationX="userData.rotationX"
    :rotationY="userData.rotationY"
    :rotationZ="userData.rotationZ"
    :animations="getRoleAnimetions(userData.role)"
    :animation="userData.motion || 'idle'"
  >
     <Cube :physics="false" :visible="false"    :y="65" >
    <HTML>
      <div class="name"> {{userData.name}}</div>
    </HTML>
    </Cube>
  </Model>
</template>
<script setup lang="ts">
import {Model,Cube,HTML} from 'lingo3d-vue'
import {getRoleAnimetions } from '@/model/role'
const props=defineProps({
 userData:{
    default:null,
    type:Object
  }
})
</script>
<style>
.name{
  transform: translateX(-50%);
}
</style>
