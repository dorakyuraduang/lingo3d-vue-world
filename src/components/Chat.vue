<template>
  <el-drawer :modal="false" title="聊天室" :size="350" v-model="show" class="rounded-t-lg">
    <template #title>
    </template>
    <el-menu>
      <el-menu-item class="text-white ">
        <div>世界</div>
        <div>( {{userStore?.usersData?.length+1 || 0}} )</div>
      </el-menu-item>
      <el-menu-item class="text-white" v-for="item  in userStore?.usersData">
        <div>{{(item as any).name}}</div>
      </el-menu-item>
    </el-menu>
    <div class="message-list"></div>
  </el-drawer>
</template>
<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import useUserStore from '@/store/modules/player'
const userStore = useUserStore()
const props = defineProps({
  isShow: {
    type: Boolean,
    defalut: false
  }
})
const show = useVModel(props, "isShow")
</script>
<style lang="less" >
.el-menu {
  width: 80px !important;
  height: 100%;
  border-right: none !important;;
  background-color:rgba(86, 86, 86,.06)!important;
 

}
.el-menu-item{
  >div{
    height: 30px;
    line-height: 30px !important;
  }
   line-height: none !important;
  display: flex;
  align-items: center !important;
  justify-content: center;
  flex-wrap:wrap;
background-color:rgba(86, 86, 86,.06)!important;
}
#el-drawer__title {
  margin: 0;
  background-color: #3B82F6;
  color: #fff;
  padding: 10px 20px !important;
}
.is-active{
background-color:rgba(18, 18, 18, .6)!important;
color: white !important;
}
.el-drawer {
  border: none !important;
  border-radius: 15px 0 0 0;

  background-color: transparent !important;
}

.el-drawer__body {
    display: flex;
  padding: 0 !important;
}
.message-list{
  height: 100%;
  flex: 1;
   background-color:rgba(18, 18, 18, .6);
}
</style>