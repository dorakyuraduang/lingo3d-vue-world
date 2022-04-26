<template>
  <World>
    <div class="ms">{{`ping : ${ms}`}}</div>
    <el-button ref="buttonRef" v-click-outside="onClickOutside" type="primary" class="bg-blue-400 help" circle>
      ?
    </el-button>
    <el-popover :width="200" ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="游戏帮助">
      <template #default>
        <div class="help-text">
          <p>wasd四个方向移动</p>
          <p>W+Shift跑步</p>
          <p>空格跳跃</p>
          <p>长按v语音通话</p>
          <p>t打开聊天窗口</p>
        </div>
      </template>
    </el-popover>
    <Model src="map.glb" :scale="6" physics="map">
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
import { World, Model, ThirdPersonCamera, Skybox, Find } from 'lingo3d-vue';
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import useUserStore from '@/store/modules/player'
import User from '@/components/User.vue'
const userStore = useUserStore()
const ms=ref<number>(0)
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
socket.on('ms',(time)=>{
  ms.value=new Date().getTime()-time
})
const movie = document.createElement('video')
const flvPlayer = flvjs.createPlayer({
  type: 'flv',
  url: import.meta.env.VITE_APP_MOVIE_URL,
  isLive: true
});
//@ts-ignore
flvPlayer.attachMediaElement(movie);
flvPlayer.load();
flvPlayer.play();
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
<style lang="less" scoped>
.ms{
  top:10px ;
  left: 20px;
  color: #fff;
  position: absolute;
  z-index: 999;
}
.help {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 20px;
  width: 40px;
  height: 40px;
  &-text{
   padding: 0 5px;
    color: #fff;
    color: #000;
    >*{
      margin: 3px 0;
    }
  }
}
</style>