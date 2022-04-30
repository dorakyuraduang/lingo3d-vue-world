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
    @click="socket.emit('shoot',userData.id)"
  >
     <Cube :physics="false" :visible="false" :y="52" >
     <UserBox :name="userData.name"  :message="userData.message"  :isRed="userData.isRed" />
    </Cube>
  </Model>
</template>
<script setup lang="ts">
import {Model,Cube,HTML} from 'lingo3d-vue'
import {getRoleAnimetions } from '@/model/role'
import socket from '@/utils/socket';
import UserBox from './UserBox.vue';
const props=defineProps({
 userData:{
    default:null,
    type:Object
  }
})
</script>
