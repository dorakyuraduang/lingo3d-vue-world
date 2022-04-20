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
  </Model>
</template>
<script setup lang="ts">
import {Model} from 'lingo3d-vue'
import {getRoleAnimetions } from '@/model/role'
const props=defineProps({
 userData:{
    default:null,
    type:Object
  }
})
console.log(props.userData)
</script>
