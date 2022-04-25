<template>
  <div  class="xcprogress">
          <span class="xcprogress-bar-value">{{`加载中${progress.toFixed(2)}` }}%</span>
    <div class="xcprogress-bar" :style="{ width: `${progress}%` }">
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
progress:{
  default:0,
  type:Number
}
})
</script>
<style lang="less">
.xcprogress {
  align-self: center;
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 20px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

.xcprogress-bar {
  width: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: cornflowerblue;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
  transition: width 0.6s ease;
  border-radius: 4px;
  animation: xcprogress-bar-anim 2s linear infinite;
}
.xcprogress-bar-value {
  align-self: center;
  font-size: 12px;
  position: absolute;
  font-weight: bold;
  color: white;
  margin-right: 5px;
}
@keyframes xcprogress-bar-anim {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>