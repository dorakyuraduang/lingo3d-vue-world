<template>
  <el-drawer :modal="false" title="聊天室" :size="350" v-model="show" class="rounded-t-lg">
    <template #title>
    </template>
    <el-menu :default-active="active">
      <el-menu-item class="text-white" index="world">
        <div>世界</div>
        <div>( {{ userStore?.usersData?.length + 1 || 0 }} )</div>
      </el-menu-item>
      <el-menu-item  :index="item.id" class="text-white" v-for="item  in userStore?.usersData">
         <el-avatar :size="20" :src="`${item.role}/avatar.jpg`" />
        <div>{{ (item as any).name }}</div>
      </el-menu-item>
    </el-menu>
    <div class="message">
      <div class="message-list" v-if="userStore.messageList.length">
        <div class="message-list-item" v-for="item in (userStore.messageList as any)" :key="new Date().toString()">
          <div v-if="item.type == 0" class="system">{{ item.msg }}</div>
          <div v-if="item.type == 1" class="user">
            <el-avatar :size="35" class="avatar" :src="`${item.role}/avatar.jpg`" />
            <div class='user-right'>
              <div class='user-right-name'>{{ item.name + '：' }}</div>
              <div class='user-right-message '>{{ item.msg }}</div>
            </div>
          </div>

        </div>
      </div>
      <div class="message-send">
        <el-input v-model="message" type="textarea" :autosize="{ minRows: 3, maxRows: 3 }"></el-input>
        <el-button style="height:73px;margin-left:10px" @click="sendMessage" type="primary" class="bg-blue-400">发送
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useMessage from '@/hooks/useMessage';
import socket from '@/utils/socket';
import { useVModel } from "@vueuse/core"
import useUserStore from '@/store/modules/player'
const userStore = useUserStore()
const active = ref<string>('world')
const props = defineProps({
  isShow: {
    type: Boolean,
    defalut: false
  }
})
const show = useVModel(props, "isShow")
const message = ref<string>('')
socket.on('message', (msg: any) => {
  //@ts-ignore
  userStore.messageList.push(msg)
  if (userStore.messageList.length >= 20) {
    userStore.messageList.shift()
  }
  if (msg.type === 0) {
  } else if (msg.type === 1) {
    if (msg.id !== userStore.id) {
      useMessage(msg.name + ' 说：' + msg.msg,msg.role)
    } else {
      useMessage('你说：' + msg.msg,msg.role)
    }
  }
})
const sendMessage = () => {
  socket.emit('message', message.value);
  message.value = ''
}
</script>
<style lang="less" >
.el-menu {
  width: 80px !important;
  height: 100%;

  border-right: none !important;
  ;
  background-color: rgba(86, 86, 86, .06) !important;
}

.el-menu-item {
    color: #fff !important;
  >div {
    height: 20px;
    font-size: 14px;
    line-height: 20px !important;
  }
  line-height: none !important;
  display: flex;
  align-items: center !important;
  justify-content: center;
  flex-direction: column;
  background-color:rgba(86, 86, 86, .06) !important;
}

#el-drawer__title {
  margin: 0;
  background-color: #3B82F6;
  color: #fff;
  padding: 10px 20px !important;
}

.is-active {
  background-color: rgba(18, 18, 18, .6) !important;
  color: white !important;
}

.el-drawer {
  border: none !important;
  border-radius: 15px 0 0 0;
  overflow: hidden;
  background-color: transparent !important;
}

.el-drawer__body {
  display: flex;
  padding: 0 !important;
  overflow: hidden !important;

}

.message {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(18, 18, 18, .6);
  &-list::-webkit-scrollbar {
  width: 0;
  }
  &-list {
    padding: 20px 0;
    flex: 1;
        overflow-x: hidden;
    overflow-y: scroll;

    .system {
      height: 30px;
      margin: 0 10px;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
      color: rgba(255, 255, 255, .6);
    }

    .user {
      margin: 5px 20px;
      display: flex;
      width: 100%;

      &-right {
        margin-left: 20px;

        &-name {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: rgba(255, 255, 255, .6);
        }

        &-message {
          color: white;
          font-size: 16px;
          line-height: 25px;
        }
      }

    }
  }

  &-send {

    display: flex;
    height: 110px;
    padding: 15px;

    textarea {
      height: 100%;
      resize: none;
      margin-right: 10px;
    }
  }

}
</style>