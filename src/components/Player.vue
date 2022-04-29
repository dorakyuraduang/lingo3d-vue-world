<template>
  <Model ref="model" :src="`${userStore.role}/untitled.fbx`" physics="character"
    :animations="getRoleAnimetions(userStore.role)" :animation="pose.value">
    <Cube :physics="false" :visible="false" :width="model?.width" :y="52">
      <UserBox :name="userStore.name" :message="userStore.message" :isRed="userStore.isRed"></UserBox>
    </Cube>
  </Model>
  <Chat v-model:isShow="chatShow" />
  <Keyboard @key-press="handleKeyPress" @key-up="handleKeyUp" @key-down="handleKeyDown" />
  <template v-if="userStore.isMobile">
    <div class="chat mobileBtn" circle @touchstart="chatShow = !chatShow">
      <img src="icon/chat.png" alt="">
    </div>
    <div class="run mobileBtn" circle @touchstart="send('KEY_SHIFT_DOWN')">
      <img src="icon/run.png" alt="">
    </div>
    <div class="jump mobileBtn" circle @touchstart="send('KEY_SPACE_DOWN')">
      <img src="icon/jump.png" alt="">
    </div>
    <div class="red mobileBtn" circle @touchstart="recStart" @touchend="recStop()">
      <img src="icon/red.png" alt="">
    </div>
  </template>
  <Mouse v-if="!userStore.isMobile" @click="send('SHOOT')"></Mouse>
  <Manager v-if="userStore.isMobile" :send="send" />
</template>
<script setup lang="ts">
import { Model, types, Mouse, Keyboard, useKeyboard, Cube } from 'lingo3d-vue';
import Manager from '@/components/Manager.vue';
import poseChine from '@/stateMachines/poseMachine'
import { useMachine } from '@xstate/vue'
import useUserStore from '@/store/modules/player'
import { ref, onUnmounted, watchEffect } from 'vue';
import socket from '@/utils/socket'
import { getRoleAnimetions } from '@/model/role'
import { recStart, recStop } from '@/utils/recoder'
import UserBox from './UserBox.vue';
import Chat from './Chat.vue';
const chatShow = ref<boolean>(false)
enum keyDown {
  w = 'KEY_W_DOWN',
  a = 'KEY_A_DOWN',
  s = 'KEY_S_DOWN',
  d = 'KEY_D_DOWN',
  Shift = 'KEY_SHIFT_DOWN',
  Space = 'KEY_SPACE_DOWN',
  e = 'KEY_E_DOWN'
}
enum keyUp {
  w = 'KEY_W_UP',
  a = 'KEY_A_UP',
  s = 'KEY_S_UP',
  d = 'KEY_D_UP',
  Shift = 'KEY_SHIFT_UP',
  e = 'KEY_E_UP'
}
const userStore = useUserStore()
const model = ref<types.Model>()
const mykey = useKeyboard()
watchEffect(() => {
  if (userStore.hp <= 0) {
    console.log('你死了')
  }
})
const updateState = setInterval(() => {
  socket.emit('update', {
    x: model.value!.x,
    y: model.value!.y,
    z: model.value!.z,
    rotationX: model.value!.rotationX,
    rotationY: model.value!.rotationY,
    rotationZ: model.value!.rotationZ,
    motion: pose.value.value,
    message: userStore.message,
    isRed: userStore.isRed
  })
}, 16)
const { state: pose, send } = useMachine(poseChine, {
  actions: {
    enterLeft() {
      model.value!.onLoop = () => {
        model.value?.moveRight(2)
      }
    }, enterWalking() {
      model.value!.onLoop = () => {
        model.value?.moveForward(-4)
      }
    }, enterBack() {
      model.value!.onLoop = () => {
        model.value?.moveForward(2)
      }
    }, enterRight() {
      model.value!.onLoop = () => {
        model.value?.moveRight(-2)
      }
    }, enterIdle() {
      if (!model.value) return
      model.value!.onLoop = undefined
    }, enterRun() {
      model.value!.onLoop = () => {
        model.value?.moveForward(-16)
      }
    }, enterJump() {

      model.value!.onLoop = () => {
        //@ts-ignore
        if (model.value!.velocity.y === 0 && model.value!.animationManager.action.time > 0.6) {
          send('JUMP_OVER')
          return
        }
        //@ts-ignore

        if (model.value!.animationManager.action.time > 0.5) {
          if (model.value!.velocity.y === 0) {
            model.value!.velocity.y = 8
          }
          if (mykey.value.includes('w') && mykey.value.includes('Shift')) {
            model.value?.moveForward(-8)
          } else if (mykey.value.includes('w')) {
            model.value?.moveForward(-4)
          } else if (mykey.value.includes('s')) {
            model.value?.moveForward(4)
          } else if (mykey.value.includes('a')) {
            model.value?.moveRight(4)
          } else if (mykey.value.includes('d')) {
            model.value?.moveRight(-4)
          }
        }
      }
    }
  }
});
socket.on('shoot', () => {
  userStore.hp -= 20
  console.log('aaa')
})
socket.on('audio', ({ id, blob: buffer }) => {
  if (id !== userStore.id) {
    const blob = new Blob([buffer], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)
    let audio: HTMLAudioElement | null = new Audio(url);
    audio.play()
    audio.addEventListener('ended', () => {
      URL.revokeObjectURL(url)
      audio = null
    }, false);
  }
})
const handleKeyUp = (key: string) => {
  if (keyUp[key]) {

    send(keyUp[key])
  } else {
    if (key == 'v') {
      userStore.isRed = false
      recStop()
    }
    send('KEY_NONE_NONE')
  }
}
const handleKeyPress = (key: string) => {
  if (keyDown[key]) {
    send(keyDown[key])
  } else {
    send('KEY_NONE_DOWN')
  }
}
const handleKeyDown = (key: string) => {
  if (key === 'Space') {
    send('KEY_SPACE_DOWN')
  } else if (key === 't') {
    chatShow.value = !chatShow.value
  } else if (key === 'v' && !userStore.isRed) {
    userStore.isRed = true
    recStart()
  }
}
onUnmounted(() => {
  clearInterval(updateState)
})
</script>
<style scoped lang="less">
.mobileBtn {
  width: 60px;
  position: absolute;
  z-index: 999;
  border: 0px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(138, 131, 131, 0.3);
  border-radius: 50%;

  img {
    width: 25px;
    height: 25px;
  }
}
.run {
  right: 80px;
  bottom: 20px;
}

.jump {
  right: 20px;
  bottom: 60px;
}

.chat {
  top: 60px;
  right: 100px;
}

.red {
  top: 60px;
  right: 30px;
}
</style>