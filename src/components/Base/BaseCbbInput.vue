<template>
  <div class="cbbDepartment">
    <input ref="txtDepartmentName" v-model="val" @blur="blurInput" placeholder="Tên đơn vị" title="Đơn vị không được bỏ trống" type="text" />
    <div class="btn-cbb"  @click="isShowOption = !isShowOption">
      <div class="icon-cbb"></div>
    </div>
    <div v-show="isShowOption" v-clickoutside="hideOption" class="option-cbb">
      <table>
        <tr  v-for="dpm in departments" :class="{act: isActive==dpm.DepartmentID}" v-bind:key="dpm.DepartmentID" @click="addValue(dpm)" class="option-cbb-item ">
        <td class="icon-check" >
        <font-awesome-icon icon="fa-solid fa-check"  style="width: 18px; height: 18px;"/>
        </td>
        <td >{{ dpm.DepartmentName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import axios from 'axios';


/**
 * xử lý khi click ra ngoài combobox thì combobox ẩn đi
 * AUTHOR: HTTHOA(05/08/2022)
 */
const clickoutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      
      if (
        !(
          (
            el === event.target || 
            el.contains(event.target) || 
            el.previousElementSibling.contains(event.target)
          )
        )
      ) {      
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
export default {
  directives: {
    clickoutside,
  },
 

  data() {
    return {
      departments: {},
      isShowOption: false,
      val: "",
      isActive: ""
    };
  },
  
  /**
   * gọi  api lấy tên đơn vị
   * AUTHOR: HTTHOA(05/08/2022)
   */
  created() {
    try {
      var me = this;
      axios
        .get("http://localhost:3131/api/v1/Departments")
        .then((res) => {
          me.departments = res.data;
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
  beforeUpdate() {
    if (this.val) {
      this.$refs.txtDepartmentName.classList.remove('input-error')

    }

  },
  methods: {
    /**
     * lấy dữ liệu
     * AUTHOR: HTTHOA(05/08/2022)
     */
    addValue(dpm) {
      this.val = dpm.DepartmentName;
      this.DepartmentID = dpm.DepartmentID;
      this.$emit("dpmId", dpm.DepartmentID);
      this.isShowOption = false;
      this.isActive= dpm.DepartmentID
    },
    /**
     * ẩn combobox
     * AUTHOR: HTTHOA(05/08/2022)
     */
    hideOption(){
      this.isShowOption= false
      
    },
    /**
     * blur qua input nếu rỗng thì hiện border đỏ
     * AUTHOR: HTTHOA(05/08/2022)
     */
    blurInput() {
      // this.isShowOption=!this.isShowOption
      var value = event.currentTarget.value
      console.log(value)
      if (!value) {
        this.$refs.txtDepartmentName.classList.add('input-error')
      
      }
    },
  },


  props: ["Department"],
  watch: {
    /**
     * 
     * theo dõi lấy dữ liệu department
     * AUTHOR: HTTHOA(05/08/2022) 
     */
    Department: function (value) {
      this.val = value;
    },
    /**
     * 
     * gửi dữ liệu sang from
     * AUTHOR: HTTHOA(05/08/2022)
     */
    val: function (newValue) {
      this.$emit("newDepartmentName", newValue);
    },

  },
};
</script>

<style scoped>
@import url('../../css/base/style.css');
@font-face {
    font-family: misa_fonts;
    src: url(../../assets/fonts/notosans-regular.2cb88a13.woff2);
}
font-awesome-icon{
  width: 18px;
  height: 18px;
}

.cbbDepartment {
  font-family: misa_fonts;
  font-size: 13px;
  margin-top: 4px;
  margin-bottom: 10px;
  width: 392px;
  height: 32px;
  border-radius: 2px;
  position: relative;
  line-height: 32px;
}

.cbbDepartment input {
  height: 100%;
  width: 100%;
  position: absolute;
  color: #000;
  font-family: misa_fonts;
  margin-left: 0;
}

.btn-cbb {
  position: absolute;
  width: 30px;
  height: 100%;
  border-radius: 0 4px 4px 0;
  right: 0;
  top: 0;
  margin-left: -4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn-cbb:hover {
  background-color: #b8bcc3;
}

.icon-cbb {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -564px -365px;
  width: 8px;
  height: 5px;
  margin: 0 auto;
}

.option-cbb {

  position: absolute;
  width: 392px;
  top: 35px;
  border: 1px solid #b8bcc3;
  background-color: #fff;
  border-radius: 2px;


}
.icon-check {
  /* background: url('../../assets/icon/check-solid.svg') no-repeat 10px center; */
  color: #fff !important;
  width: 18px;
  height: 18px;  
  
 

}
.option-cbb::-webkit-scrollbar {
   display: none;
  }
.option-cbb table {
  width: 392px;
 
}
.option-cbb{
  overflow-y:auto;
  height: 200px;
 
}

.act{
  background-color:#35bf22 ;
  color: #f4f5f8;
}

.option-cbb-item:hover {
  color: #f4f5f8;
  background-color: #35bf22;
  cursor: pointer;
}
.option-cbb-item:hover .icon-check{
  color: #35bf22;
}

.option-cbb table tr td {
  border-right: none !important;
}

.option-cbb td:last-child {
  /* border-bottom: none !important; */

}

.option-cbb table tr th {
  text-align: left;
}
</style>
