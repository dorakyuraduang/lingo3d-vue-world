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
        <div class="user-box">
        <!-- HTML组件里的数据会失去响应式,暂时无法实现对话框显示 -->
        <p class="name">{{ userData.name }}</p>
      </div>
    </HTML>
    </Cube>
  </Model>
</template>
<script setup lang="ts">
import {Model,Cube,HTML} from 'lingo3d-vue'
import {getRoleAnimetions } from '@/model/role'
import BubbleBox from '@/components/BubbleBox.vue'
const props=defineProps({
 userData:{
    default:null,
    type:Object
  }
})
</script>
