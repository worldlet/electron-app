<script setup>
import { onMounted, ref, reactive } from "vue";

const actionForm = reactive({
  text: '',
  color: '#333333',
  size: 20,
})
const actionBox = ref(null)


let text = '测试文字内容！'
let fonts = ref([]);
const func = async () => {
  return fonts.value = await window.versions.fonts()
}

const resetForm = () => {
  actionBox.value.resetFields()
}
onMounted(() => {
  func()
  console.log(fonts)
})
</script>

<template>
  <div>
    <el-form :inline="true" ref="actionBox" :model="actionForm" class="action-bar" style="-webkit-app-region: drag; background: #aaa;">
      <el-form-item label="文字" prop="text">
        <el-input v-model="actionForm.text" placeholder="请输入演示文字" clearable />
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-color-picker v-model="actionForm.color" />
      </el-form-item>
      <el-form-item label="大小" prop="size">
        <el-slider v-model="actionForm.size" :step="4" :min="20" :max="40" show-stops />
      </el-form-item>
      <el-button type="primary" @click="resetForm()">重置</el-button>
    </el-form>
    <div v-for="item in fonts" :style="{ fontFamily: item }" class="list">
      <h4 :style="{ fontSize: actionForm.size + 'px', color: actionForm.color }" v-show="actionForm.text">{{ actionForm.text }}</h4>
      <h5>{{ item.replace(/"/g, '') }}</h5>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p style="text-transform: uppercase">abcdefghijklmnopqrstuvwxyz</p>
      <p>1234567890</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .el-form-item {
    flex-grow: 1;
  }
}

.list {
  padding: 15px 15px 8px;
  margin-bottom: 10px;
  background: #f7f7f7;

  h4 {
    padding-bottom: 10px;
    margin-bottom: 5px;
    border-bottom: #eee solid 1px;
  }

  h5 {
    margin-bottom: 5px;
    font-size: 16px;
  }

  p {
    margin-bottom: 5px;
    font-size: 16px;
    letter-spacing: 0.5em;
  }
}
</style>
