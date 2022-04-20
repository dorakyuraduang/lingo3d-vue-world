<template>
    <div class="role-pick">
        <div v-for="(item, index) in roleList" :class="{ list: true, active: role === item }" @click="  emits('update:role',item)">
            <el-avatar :size="60" :key="index" :src="`${item}/avatar.jpg`" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { roleList } from '@/model/role.ts'
import { defineEmits } from 'vue'
defineProps({
    role: {
        default: "",
        type: String
    }
})
const emits = defineEmits(['update:role'])

</script>
<style lang="less">
.role-pick {
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 10px 0;
}

.active {
    border: 1px solid #409eff;

}

.list {
    flex: 0 0 auto;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

}
</style>