<template>
  <div class="cbbDepartment">
    <input ref="txtDepartmentName" v-model="val" @blur="blurInput" placeholder="Tên đơn vị" title="Đơn vị không được bỏ trống" type="text" />
    <div class="btn-cbb"  @click="isShowOption = !isShowOption">
      <div class="icon-cbb"></div>
    </div>
    <div v-show="isShowOption" class="option-cbb">
      <table>
        <tr  v-for="dpm in departments" v-bind:key="dpm.DepartmentId" @click="addValue(dpm)" class="option-cbb-item ">
        <td class="icon-check" ></td>
        <td >{{ dpm.DepartmentName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      departments: {},
      isShowOption: false,
      val: "",
    };
  },
  
  /**
   * gọi  api lấy tên đơn vị
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
     */
    addValue(dpm) {
      this.val = dpm.DepartmentName;
      this.DepartmentID = dpm.DepartmentID;
      this.$emit("dpmId", dpm.DepartmentID);
      this.isShowOption = false;
    },
    /**
     * ẩn combobox
     */
    hideOption(){
      this.isShowOption= false
      
    },
    /**
     * blur qua input nếu rỗng thì hiện border đỏ
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
    Department: function (value) {
      this.val = value;
    },
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

.cbbDepartment {
  font-family: misa_fonts;
  font-size: 13px;
  margin-top: 4px;
  margin-bottom: 10px;
  width: 380px;
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
  width: 380px;
  top: 35px;
  border: 1px solid #b8bcc3;
  background-color: #fff;
  border-radius: 2px;
  border-bottom: none;

}
.icon-check{
  background: url('../../assets/icon/checkmark-16.png') no-repeat 10px center;
  color: #fff;
  width: 14px;
  height: 11px;  
 

}

.option-cbb table {
  width: 380px;
}

.option-cbb-item:hover {
  color: #f4f5f8;
  background-color: #35bf22;
  cursor: pointer;
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
