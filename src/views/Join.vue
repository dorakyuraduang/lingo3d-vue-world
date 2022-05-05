<template>
  <el-form
    ref="ruleFormRef"
    :rules="rules"
    hide-required-asterisk
    class="join"
    size="large"
    label-width="auto"
    label-position="top"
    :model="formData"
  >
    <div class="title">欢迎加入游戏</div>
    <el-form-item label="输入名字" prop="name">
      <el-input v-model="formData.name" minlength="2" maxlength="16" placeholder="请输入你的名字" />
    </el-form-item>
    <el-form-item label="选择人物" prop="role">
      <role-pick v-model:role="formData.role" />
    </el-form-item>
    <el-form-item class="join-btn">
      <el-button type="primary" class="bg-blue-400" @click="submitForm(ruleFormRef)">
        加入游戏
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import RolePick from "@/components/RolePick.vue";
import { reactive, ref, defineEmits } from "vue";
import useMessage from "@/hooks/useMessage";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import socket from "@/utils/socket";
import useUserStore from "@/store/modules/player";
const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const formData = reactive({
  name: "",
  role: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { min: 2, max: 16, message: "名字长度在2到16位", trigger: "blur" },
  ],
  role: [
    {
      required: true,
      message: "请选择人物",
      trigger: "blur",
    },
  ],
});
const emit = defineEmits(["select-role"]);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      socket.emit("join", formData);
      emit("select-role", formData.role);
    } else {
      useMessage("加入游戏失败");
    }
  });
};
socket.on("join", ({ code, name, role, id }) => {
  if (code == 200) {
    userStore.id = id;
    userStore.name = name;
    userStore.role = role;
    userStore.isJoin = true;
    useMessage("成功加入游戏");
  } else {
    useMessage("加入游戏失败");
  }
});
</script>
<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.join {
  padding: 20px 30px;
  position: absolute;
  margin-top: 20vh;
  width: 40vw;
  max-width: 500px;
  min-width: 300px;
  border-radius: 10px;
  background-color: #fff;

  ::v-deep(&-btn) {
    > div {
      justify-content: center;
    }
  }
}
</style>
