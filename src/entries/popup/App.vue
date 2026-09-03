<script lang="ts" setup>
import {storage} from "#imports";

const fontFamilyList = [
  {label: '微软雅黑', value: `Microsoft YaHei`},
  {label: '宋体', value: `SimSun`},
  {label: '黑体', value: `SimHei`},
  {label: '楷体', value: `KaiTi`},
  {label: '仿宋', value: `FangSong`},
  {label: '微软正黑体', value: `Microsoft JhengHei`},
]
// 绑定表单数据
const form = ref({
  fontFamily: 'Microsoft YaHei',
})

storage.getItem('local:bilibili_style').then(res => {
  if (res) {
    try {
      const value = JSON.parse(res)
      form.value = value
    } catch (err) {
    }
  }
})

const handleSave = () => {
  storage.setItem('local:bilibili_style', JSON.stringify(form.value))
}

</script>

<template>
  <el-config-provider size="default" :zIndex="3000">
    <div class="popup-container">
      <div class="form-item">
        <div class="label">字体：</div>
        <el-select v-model="form.fontFamily" @change="handleSave">
          <el-option v-for="item in fontFamilyList" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </div>
    </div>
  </el-config-provider>
</template>

<style scoped>
.popup-container {
  width: 320px;
  height: 320px;
  padding: 14px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .label {
    margin-right: 10px;
    width: 60px;
    text-align: right;
  }
}
</style>
