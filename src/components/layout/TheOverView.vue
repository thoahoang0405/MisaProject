<template>

  <div class="main">
    <div class="main-header">
      <h3 class="Emp-title">MISA</h3>
      <button id="btn-add" class="btn-add">Thêm mới nhân viên</button>
    <el-select v-model="value" placeholder="Select" teleported>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
    </div>

  </div>
</template>
<style >
@import url("../../assets/css/base/main.css");

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: var(el-color-success-dark-2) !important;
}
.el-select-dropdown{
  height: 140px;
  overflow-y: auto;
}
</style>
<script>
 
  import {
    ElSelect,
    ElOption
} from "element-plus/dist/index.full.js";
import 'element-plus/es/components/message/style/css'
import { ref } from 'vue'

const value = ref('')
// const options = [
//   {
//     value: 'Option1',
//     label: 'Option1',
//   },
//   {
//     value: 'Option2',
//     label: 'Option2',
//   },
//   {
//     value: 'Option3',
//     label: 'Option3',
//   },
//   {
//     value: 'Option4',
//     label: 'Option4',
//   },
//   {
//     value: 'Option5',
//     label: 'Option5',
//   },
// ]
export default {
  name: 'App',
  components: {
    ElSelect,
    ElOption
  },
  data() {
    return{
  options: [
    {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },


    ]
    }
  }
}
</script>
