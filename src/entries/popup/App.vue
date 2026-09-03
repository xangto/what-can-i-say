<script lang="ts" setup>
import type {popupFrom} from "@/types/types.ts";
import {autoWebFullscreenStorage, popupFormStorage} from "../utils/storage";

const fontFamilyList = [
  {label: '微软雅黑', value: `Microsoft YaHei`},
  {label: '宋体', value: `SimSun`},
  {label: '黑体', value: `SimHei`},
  {label: '楷体', value: `KaiTi`},
  {label: '仿宋', value: `FangSong`},
  {label: '微软正黑体', value: `Microsoft JhengHei`},
]
// 	{"fontFamily":"KaiTi","autoWebFullScreen":1}
// 绑定表单数据
const form = ref<popupFrom>({
  fontFamily: 'Microsoft YaHei',
})

const autoWebFullScreen = ref(0) // 自动网页全屏开关

// 页面挂载读取旧配置
onMounted(() => {
  popupFormStorage.getValue().then((res) => {
    form.value = {...form.value, ...res}
  })
  autoWebFullscreenStorage.getValue().then((res) => {
    autoWebFullScreen.value = res
  })
})

const handleSave = async () => {
  popupFormStorage.setValue(form.value)
}

const handleSave2 = async () => {
  autoWebFullscreenStorage.setValue(autoWebFullScreen.value)
}

</script>

<template>
  <el-config-provider size="default" :zIndex="3000">
    <div class="popup-container">
      <div class="form-item">
        <div class="label">字体：</div>
        <div>
          <el-select v-model="form.fontFamily" @change="handleSave">
            <el-option v-for="item in fontFamilyList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">网页全屏：</div>
        <div title="点击页面即可网页全屏">
          <el-switch v-model="autoWebFullScreen" :active-value="1" :inactive-value="0" @change="handleSave2"/>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped>
.popup-container {
  width: 320px;
  height: 320px;
  padding: 14px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(n+2) {
    margin-top: 8px;
  }

  .label {
    margin-right: 10px;
    width: 70px;
    text-align: right;
  }

  div:nth-child(2) {
    flex: 1;
  }
}
</style>
