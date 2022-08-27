<template>
  <div>
    <div id="listFunction" class="listFunction">
      <div  @click="popup" class="item-func">{{ btn.repli }}</div>
      <div class="item-func" @click="handleDeleteEmployee">
        {{ btn.delete }}
      </div>
      <div class="item-func">{{ btn.stop }}</div>
    </div>
  
    <MsgDelete
      v-show="isShowMsg"
      :employeeCode="empCode"
      @delete="functionDelete"
      @noDelete="noDelete"
    >
    </MsgDelete>
       <popup style="right: 10px; bottom: 70px;" @closePopup="showPopup" :msgPopup="popupMsg" v-show="isShowPopup"></popup>
    
  </div>
</template>
<script >
import MsgDelete from "../Base/BaseMsgDelete.vue";
import $ from "jquery";
import axios from "axios";
import btn from "../../Locale/LocaleButton";
import msg from "../../Locale/LocaleMsg";
import{ElementPlus}  from 'element-plus';
import popup from "../Base/BasePopup.vue";
import { useToast } from "vue-toastification";

const open2 = () => {
 ElementPlus({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
function me(){
  console.log(1)
}

export default {
  components: {
    MsgDelete,popup
  },

  data() {
    return {
     
      btn: btn,
      msg: msg,
      empCode: "",
      employeeId: "",
      // empDeleteId: "",
      isShowMsg: false,
      isDelete: false,
      isShowPopup: false,
      popupMsg:"",
    };
  },
  props: ["showMenu","empDeleteCode", "employeeDelete", "employeeDeleteId","loadData"],
  watch: {
    employeeDelete: function (value) {
      console.log(value);
      this.Employees = value;
    },
    employeeDeleteId: function (value) {
      this.employeeId = value;
    },
    empDeleteCode: function (value) {
      this.empCode = value;
    },
  },
  methods: {
    popup() {
     this.me()
       this.open.open2()
     
     
    },
    showPopup(value) {
      this.isShowPopup = value;
    },


    /**
     * hàm hiển thị msg confirm xóa
     * AUTHOR: HTTHOA (12/08/2022)
     */
    handleDeleteEmployee() {
      //
      this.showMsgDelete(true);
    },

    /**
     * hàm hiển thị msg confirm xóa
     * AUTHOR: HTTHOA (12/08/2022)
     */
    showMsgDelete(is) {
      this.isShowMsg = is;
    },

    /**
     * hàm thực hiện xóa
     * AUTHOR: HTTHOA (12/08/2022)
     */
   functionDelete(e) {
      this.isDelete = e;
      console.log(e);
      this.showMsgDelete(true);

      if (this.isDelete) {
        
        this.empDeleteId();
       
       
       this.closeDrop();
        this.showMsgDelete(false);
      }
    },
    /**
     * hàm đóng menu chức năng 
     * AUTHOR: HTTHOA (12/08/2022)
     */
    closeDrop() {
      this.$emit("closeDrop", false);
     
    },
    /**
     * hàm api xóa employee
     * AUTHOR: HTTHOA (12/08/2022)
     */
    empDeleteId() {
      const toast = useToast();
      console.log(this.empCode);
      axios
        .delete(`http://localhost:3131/api/v1/Employees/${this.employeeId}`)
        .then(function () {
    
          toast.warning("Xóa nhân viên thành công", { timeout: 2000 });
          this.loadData();
        
        })
        .catch(function () {});
    },
    /**
     * hàm xử lý khi ấn nút no của msg confirm
     * AUTHOR: HTTHOA (12/08/2022)
     */
    noDelete(is) {
      this.isShowMsg = is;
      this.closeDrop();
    },
  },
};
</script>
<style>
.listFunction {
  position: absolute;
  width: 120px;
  margin-bottom: 10px;
  background-color: #fff;
  color: #727272;
  border: 1px solid #ccc;
  z-index: 6;
}

.item-func {
  padding: 6px;
}

.item-func:hover {
  background-color: #eee;
  color: #2f9d22;
}
</style>
