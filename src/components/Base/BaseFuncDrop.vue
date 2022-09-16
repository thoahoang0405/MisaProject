<template>
  <div>
    <div id="listFunction" class="listFunction">
      <div @click="btnReplication" class="item-func">{{ btn.repli }}</div>
      <div class="item-func" @click="handleDeleteEmployee">
        {{ btn.delete }}
      </div>
      <div class="item-func">{{ btn.stop }}</div>
    </div>
    <MsgDelete v-show="isShowMsg" :employeeCode="empCode" @delete="functionDelete" @noDelete="noDelete"
      :message="message">
    </MsgDelete>
    <formDetail v-show="isShowForm" @showDialog="hideForm" :employeeDetailAdd="Employees" :empNewCodeRepli="newCode"
      :formRepli="formModeRepli" :formMode="formModeDetail"></formDetail>
  </div>
</template>
<script>
import MsgDelete from "../base/BaseMsgDelete.vue";
import axios from "axios";
import btn from "../../locales/LocaleButton";
import msg from "../../locales/LocaleMsg";
import { useToast } from "vue-toastification";
import formDetail from "../layout/TheEmployeeDetail.vue";
import Msg from "../../utils/common";
import { employeeApi } from "../../store/api";
import { FormMode } from "../../utils/enumeration"
export default {
  components: {
    MsgDelete,
    formDetail,
  },
  data() {
    return {
      isShowForm: false,
      btn: btn,
      msg: msg,
      empCode: "",
      employeeId: "",
      isShowMsg: false,
      isDelete: false,
      newCode: null,
      formModeDetail: FormMode.Add,
      Employees: [],
      fromModeRepli: FormMode.Replication,
      message: "",
    };
  },
  props: [
    "showMenu",
    "empDeleteCode",
    "employeeDelete",
    "employeeDetails",
    "employeeDeleteId",
    "loadData",
    "newEmployeeCode",
  ],
  watch: {
    /**
     * nhận mảng employee được truyền từ cha để xóa
     * AUTHOR:HTTHOA(12/08/2022)
     */
    employeeDelete: function(value) {
      this.Employees = value;
    },
    /**
     * nhận mảng employee được truyền từ cha để nhân bản
     * AUTHOR:HTTHOA(01/09/2022)
     */
    employeeDetails: function (value) {
      this.Employees = value;
    },
    /**
     * nhận  employee id được truyền từ cha
     * AUTHOR:HTTHOA(12/09/2022)
     */
    employeeDeleteId: function (value) {
      this.employeeId = value;
    },
    /**
     * nhận employee code được truyền từ cha
     * AUTHOR:HTTHOA(01/09/2022)
     */
    empDeleteCode: function (value) {
      this.empCode = value;
    },
    /**
     * nhận employee code new được truyền từ cha
     * AUTHOR:HTTHOA(01/09/2022)
     */
    newEmployeeCode: function (value) {
      this.newCode = value;
    },
  },
  methods: {
    /**
     * hiển thị form chi tiết
     * AUTHOR:HTTHOA(01/09/2022)
     */
    showForm(value) {
      this.isShowForm = value;
    },
    hideForm(value) {
      this.isShowForm = value;
      this.closeDrop()
    },
    /**
     * khi ấn nút repli
     * AUTHOR:HTTHOA(01/09/2022)
     */
    btnReplication() {
      this.showForm(true)
      this.newCode = {};
      this.getNewEmployeeCode();
      this.formModeDetail = FormMode.Add;
      this.formModeRepli = FormMode.Replication;
    },
    /**
   * lấy mã  nhân viên mới
   * AUTHOR: HTTHOA(09/08/2022)
   */
    getNewEmployeeCode() {
      var me = this;
      const toast = useToast();
      axios
        .get(`${employeeApi}NewCode`)
        .then(function (res) {
          me.newCode = res.data;
        })
        .catch(function (response) {
          toast.error(Msg.Error, { timeout: 2000 });
        });
    },
    /**
     * hàm hiển thị msg confirm xóa
     * AUTHOR: HTTHOA (12/08/2022)
     */
    handleDeleteEmployee() {
      this.showMsgDelete(true);
      this.message = `Bạn có chắc chắn muốn xóa nhân viên <${this.empCode}> không?`
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
      try {
        const toast = useToast();
        var me = this
        axios
          .delete(`${employeeApi}${me.employeeId}`)
          .then(function () {
            toast.warning(Msg.DeleteSuccess, { timeout: 2000 });
            me.loadData();
          })
          .catch(function () {
            toast.error(Msg.Error, { timeout: 2000 });
          });
      } catch (error) {
        console.log(error);
      }
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
  border-radius: 2px;
  border: 1px solid #babec5;
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
