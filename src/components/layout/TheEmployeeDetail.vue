<template>
  <div id="dialog" class="dialog">
    <div class="dialog-form">
      <div class="form-header">
        <div class="form-header-left">
          <h1>{{ infoEmployee.infoEmployee }}</h1>
          <div class="form-header-checkbox">
            <input name="isCustomer camelCase PascalCase" type="checkbox" />
            <p for="isCustomer">{{ infoEmployee.isCustomer }}</p>
          </div>
          <div class="form-header-checkbox">
            <input name="isCustomer" type="checkbox" />
            <p for="isCustomer">{{ infoEmployee.isSupp }}</p>
          </div>
        </div>
        <div class="form-header-right">
          <div @click="open2" class="icon-help"></div>
          <div @click="btnCloseOnclick" id="icon-close" class="icon-close"></div>
        </div>
      </div>
      <div class="form-content">
        <div class="m-row">
          <div class="input-content EmpCode">
            <label for="Code">{{ infoEmployee.empCode }}
              <p style="color: red; margin-left: 4px">*</p>
            </label>
            <input class="Code" v-model="Employee.employeeCode" @blur="blurInput" placeholder="Mã nhân viên" type="text"
              title="Mã không được bỏ trống" propname="EmployeeCode" id="Code" name="Mã" required=""
              ref="txtEmployeeCode" />
          
          </div>
          <div class="input-content EmpName">
            <label for="Name">{{ infoEmployee.empName }}
              <p style="color: red; margin-left: 4px">*</p>
            </label>
            <input type="text" @blur="blurInput" placeholder="Tên nhân viên" ref="txtEmployeeName"
              title="Tên không được bỏ trống" v-model="Employee.employeeName" propname="FullName" id="Name" name="Tên"
              class="Name" required="" />
          
          </div>
          <div class="input-content">
            <label for="Dob">{{ infoEmployee.dob }}</label>
            <input class="Dob" type="date" v-model="Employee.dateOfBirth" />
            <div id="Dob-error">ngày sinh phải nhỏ hơn ngày hiện tại</div>
          </div>
          <div class="input-content">
            <label for="Gender">{{ infoEmployee.gender }}</label>
            <div class="radio-group">
              <input propname="Render" style="margin-right: 8px" type="radio" value="0" class="gender" name="Gender"
                v-model="Employee.gender" />{{ infoEmployee.male }}

              <input style="margin-left: 16px" type="radio" value="1" class="gender" name="Gender"
                v-model="Employee.gender" />{{ infoEmployee.female }}
              <br />
              <input style="margin-left: 16px" type="radio" value="2" class="gender" name="Gender"
                v-model="Employee.gender" />{{ infoEmployee.other }}
            </div>
          </div>
        </div>
        <div class="m-row">
          <div class="input-content EmpUnit">
            <label for="Unit">{{ infoEmployee.department }}
              <p style="color: red; margin-left: 4px">*</p>
            </label>
            <InputCombobox @newDepartmentName="newDepartmentName" @dpmId="dpmId" :Department="Employee.departmentName">
            </InputCombobox>
          </div>
          <div class="input-content Iden">
            <label for="IdenNum">{{ infoEmployee.idenNumber }}</label>
            <input class="IdenNum" placeholder="Số cmnd" type="text" v-model="Employee.identityNumber"
              title="Số chứng minh nhân dân" />
          </div>
          <div class="input-content" style="margin-left: 20px">
            <label for="IdenDate">{{ infoEmployee.idenDate }}</label>
            <input class="IdenDate" placeholder="Ngày cấp" type="date" v-model="Employee.identityDate" />
          </div>
        </div>
        <div class="m-row">
          <div class="input-content" :value="Employee.PositionId">
            <label for="PosName">{{ infoEmployee.positionName }} </label>
            <input placeholder="Chức danh" v-model="Employee.positionName" type="text" id="PositionName"
              propname="PositionName" class="PosName"  />
          </div>
          <div class="input-content">
            <label for="IdenPlace">{{ infoEmployee.idenPlace }}</label>
            <input placeholder="Nơi cấp" type="text" v-model="Employee.identityPlace" propname="IdentityPlace"
              class="IdenPlace" />
          </div>
        </div>
        <div class="m-row" style="padding-top: 20px">
          <div class="input-content">
            <label for="Address">{{ infoEmployee.address }}</label>
            <input placeholder="Địa chỉ" type="text" v-model="Employee.address" propname="Address" id="Address"
              class="Address"  />
          </div>
        </div>
        <div class="m-row">
          <div class="input-content">
            <label for="mobile-phone">{{ infoEmployee.mobilePhone }}</label>
            <input placeholder="Điện thoại di động" type="number" id="mobile-phone" v-model="Employee.phoneNumber"
              class="mobile-phone" />
          </div>
          <div class="input-content">
            <label for="phone">{{ infoEmployee.lineLandPhone }}</label>
            <input placeholder="Điện thoại cố định" v-model="Employee.landlinePhone" type="number" id="phone" class="phone"  />
          </div>
          <div class="input-content">
            <label for="Email">{{ infoEmployee.email }}</label>
            <input placeholder="Email" type="text" id="Email" class="Email" v-model="Employee.email"  />
            <div class="red">{{ emailError }}</div>
          </div>
        </div>
        <div class="m-row">
          <div class="input-content">
            <label for="BankName">{{ infoEmployee.bankName }}</label>
            <input placeholder="Tên ngân hàng"  v-model="Employee.bankName"  type="text" id="BankName" class="BankName"  />
          </div>
          <div class="input-content">
            <label for="BankPlace">{{ infoEmployee.bankBranch }}</label>
            <input placeholder="Chi nhánh tài khoản ngân hàng"  v-model="Employee.bankBranch" type="text" id="BankPlace" class="BankPlace"
              />
          </div>
          <div class="input-content">
            <label for="BankNum">{{ infoEmployee.bankAccount }}</label>
            <input placeholder="Số tài khoản"  v-model="Employee.bankAccount" type="text" id="BankNum" class="BankNum"  />
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button @click="isShowMsgWarning = !isShowMsgWarning" id="cancel" class="cancel">
          {{ btn.btnCancel }}
        </button>
        <div class="btn-right">
          <button id="btn-store" @click="btnSave" class="btn-store">
            {{ btn.btnSave }}
          </button>
          <button id="btn-stor-add" @keyup.enter="btnAddAndSave" @click="btnAddAndSave" class="btn-stor-add">
            {{ btn.btnSaveAdd }}
          </button>
        </div>
      </div>
    </div>

    <MsgErrorRequired :Msg="message" v-show="isMsgRequired" @closeMsgError="showMsgRequired" @borderError="blurInput">
    </MsgErrorRequired>
    <MsgExist v-show="isShowMsgExist" :Msg="MsgExist" @closeMsg="showMsgExist"></MsgExist>
    <MsgWarning v-show="isShowMsgWarning" @closeMsgWarn="hideWarnForm" @MsgWarn="closeSave"
      @cancelMsgWarn="hideMsgWarning"></MsgWarning>
    <LoadData v-show="loading"></LoadData>
    <popup @closePopup="showPopup" :msgPopup="popupMsg" v-show="isShowPopup"></popup>
  </div>
</template>

<style>
@import url("../../css/form/form.css");
@import url("../../css/base/style.css");
</style>

<script>
import axios from "axios";
import MsgErrorRequired from "../Base/BaseMsgError.vue";
import InputCombobox from "../Base/BaseCbbInput.vue";
import info from "../../Locale/LocaleTableEmployee";
import btn from "../../Locale/LocaleButton";
import MsgExist from "../Base/BaseMsgExist.vue";
import LoadData from "../../components/Base/BaseLoading.vue";
import MsgWarning from "../Base/BaseMsgWarning.vue";
import popup from "../Base/BasePopup.vue";
import { useToast } from "vue-toastification";

import $ from "jquery";

export default {


  components: {
    MsgErrorRequired,
    InputCombobox,
    MsgExist,
    MsgWarning,
    popup,
  },
  data() {
    return {
      code: "",
      popupMsg: "",
      getData: {},
      loading: false,
      btn: btn,
      infoEmployee: info,
      closeDep: false,
      departmentName: "",
      isShowDropCbb: false,
      empCode: [],
      emailError: "",
      borderErr: false,
      email: "",
      Employee: {
        EmployeeCode: "",
      },
      newCode: "",
      message: [],
      isshowDialog: false,
      isShowMsgExist: false,
      isShowCbb: false,
      isShowMsgWarning: false,
      MsgExist: "",
      isMsgDelete: false,
      isMsgRequired: false,
      selected: "",
      errors: [],
      arr: [],
      oldEmp: {},
      isValid: true,
      newEmpCode: "",
      loadEmp: [],
      isShowPopup: false,
      employees:{},
    };
  },
  props: [
    "showDialog",
    "employeeDetail",
    "loadData",
    "employeeSelectedId",
    "newEmployeeCode",
    "formMode",
    "addOnclick",
    "employeeCode",
  ],
  computed: {},

  watch: {
    /**
     *
     * hàm lấy dữ liệu từ bảng lên form
     *  Authors: HTTHOA(09/08/2022)
     *
     */
    employeeDetail: function (value) {
      console.log(value)
      value.dateOfBirth = this.fomartDate(value.dateOfBirth);
      value.identityDate = this.fomartDate(value.identityDate);
      this.Employee.identityDate = value.dateOfBirth;
      this.Employee.dateOfBirth = value.identityDate;
      this.Employee = value;
      this.oldEmp = { ...value };
    },

    /**
     *
     * lấy mã nhân viên mới
     * Authors: HTTHOA(09/08/2022)
     */
    newEmployeeCode: function (value) {
      this.newCode = value;
      console.log(value);
      this.Employee.employeeCode = value;
      this.$refs.txtEmployeeCode.focus();
    },
    /**
     *
     * @param {validate email} value
     * AUTHOR: HTTHOA (10/08/2022)
     */
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
  },

  methods: {
   async popup() {
      this.showPopup(true);
     await setTimeout(() => {
        this.showPopup(false);
      }, 3000);
    },
    showPopup(value) {
      this.isShowPopup = value;
    },
    /**
         * 
         * @param {validate ngày tháng năm đưa lên form chi tiết} date 
         AUTHOR: HTTHOA (14/08/2022)
         */
    fomartDate(date) {
      try {
        if (date) {
          date = new Date(date);
          let newDate = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          newDate = newDate < 10 ? `0${newDate}` : newDate;
          month = month < 10 ? `0${month}` : month;
          return `${year}-${month}-${newDate}`;
        }
        console.log(date);
      } catch (error) {
        console.log(error);
        return "";
      }
    },

    /**
     * validate
     * AUTHOR: HTTHOA (10/08/2022)
     */
    validate() {
      this.message = [];
      console.log(this.Employee.employeeCode);
      if (!this.Employee.employeeCode) {
        this.push.message("Mã không được trống");

        this.showMsgRequired(true);

        this.isValid = true;
      }
      console.log(this.Employee.employeeName);
      if (!this.Employee.employeeName) {
        this.message.push("Tên không được trống");
        this.showMsgRequired(true);
        this.isValid = true;
      }
      console.log(this.Employee.departmentName);
      console.log(this.Employee.departmentID);
      if (!this.Employee.departmentName) {
        this.message.push("Đơn vị không được trống");
        this.showMsgRequired(true);
        this.isValid = true;
      }
      console.log(this.Employee.dateOfBirth);
      if (this.Employee.dateOfBirth) {
        this.Employee.dateOfBirth = new Date(this.Employee.dateOfBirth);
      }
      if (this.Employee.dateOfBirth > new Date() && this.Employee.dateOfBirth) {
        this.message.push("Ngày sinh không lớn hơn ngày hiện tại");
        this.showMsgRequired(true);
        this.isValid = true;
      }
    },

    /**
     * hiển thị message lỗi không được trống
     * AUTHOR: HTTHOA(10/08/2022)
     */
    showMsgRequired(value) {
      this.isMsgRequired = value;
    },
    /**
     *
     * @param {hiển thị message cảnh báo xóa} is
     * AUTHOR: HTTHOA(10/08/2022)
     */
    showMsgDelete(value) {
      this.isMsgDelete = value;
    },

    /**
     * sự kiện blur vào input trống hiện border màu đỏ
     * AUTHOR: HTTHOA(10/08/2022)
     */
    blurInput() {
      var value = event.currentTarget.value;
      if (!value) {
        event.currentTarget.classList.add("input-error");
      } else {
        event.currentTarget.classList.remove("input-error");
      }
    },
    /**
     *
     * @param {xử lý combobox lấy Id đơn vị} e
     * AUTHOR: HTTHOA(10/08/2022)
     */
    dpmId(value) {
      this.Employee.departmentID =value;
      console.log(value);
    },
    /**
     *
     * @param {Lấy tên đơn vị} e
     * AUTHOR: HTTHOA(10/08/2022)
     */
    newDepartmentName(value) {
      this.Employee.departmentName = value;
      console.log(value);
    },

    /**
         * hiển thị combobox
         AUTHOR: HTTHOA (13/08/2022)
         */
    functionShowCbb(value) {
      this.isShowDropCbb = value;
    },

    showLoading(value) {
      this.loading = value;
    },
    /**
         * 
         * @param{ kiểm tra mã nhân viên đã tồn tại} value 
         Author: HTTHOA(15/8/2022)
         */
    getEmployeeExist() {
      if (this.formMode == 1) {
        var me = this;
        axios
          .get("http://localhost:3131/api/v1/Employees")
          .then(function (response) {
            me.employees = response.data;
            console.log(response.data);
            for (const emp of response.data) {
              me.code = emp.EmployeeCode;
              me.arr.push(me.code);
              if (me.Employee.employeeCode == me.code) {
                
                me.showMsgExist(true);
                me.isValid = true;
              }
             
            }
          })
          .catch(function (response) {
            console.log(response);
          });
        me.MsgExist = me.Employee.employeeCode;
        console.log(me.MsgExist);
      }
    },
    /**
     *
     * hiển thị msg mã nhân viên đã tồn tại
     * Author: HTTHOA(15/8/2022)
     */

    showMsgExist(value) {
      this.isShowMsgExist = value;
    },

    /**
     * lấy mã  nhân viên mới
     * AUTHOR: HTTHOA(09/08/2022)
     */
    getNewEmployeeCode() {
      var me = this;
      //sau reset thì lấy nhân viên mới
      axios
        .get("http://localhost:3131/api/v1/Employees/NewCode")
        .then(function (res) {
          console.log(res.data);
          me.newEmpCode = res.data;
          me.Employee.employeeCode = res.data;
          console.log(me.newEmpCode);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    /**
     * click nút cất
     * AUTHOR: HTTHOA(10/08/2022)
     */
    btnSave() {
      this.validate();
      this.getEmployeeExist();
      this.showLoading(true);

      if (this.isValid) {
        this.$emit("showDialog", true);
      }
      this.saveData();

      this.showLoading(false);
    },

    /**
     *
     * @param {Hàm nhấn nút cất và save để sửa và thêm nhân viên (formMofe==1: thêm, formMode=0: sửa)} e
     * Author: HTTHOA(6/8/2022)
     *
     */
    btnAddAndSave() {
      this.saveAndAddData();
      
    },
    /**
     * thêm , sửa cho nút cất
     * Author: HTTHOA(6/8/2022)
     */
   saveData() {
      var me = this;
      var newEmployee = me.Employee;
        const toast = useToast();
      if (this.formMode == 1) {
        axios
          .post("http://localhost:3131/api/v1/Employees", newEmployee)
          .then(function () {
           toast.success("Thêm nhân viên thành công", { timeout: 2000 });

            this.$emit("showDialog", false);
          })
          
          .catch(function () { });
      } else {
       axios
          .put(
            `http://localhost:3131/api/v1/Employees/${me.Employee.employeeID}`,
            newEmployee
          )
          .then(function () {
            toast.success("Sửa nhân viên thành công", { timeout: 2000 });
           
          })
          .catch(error=>{
            console.log(error)
          });
      }
       this.$emit("showDialog", false);
    },
    /**
     * thêm , sửa cho nút cất và thêm
     * Author: HTTHOA(16/8/2022)
     */
    saveAndAddData() {
      const toast = useToast();
      var me = this;
      me.validate();
      me.getEmployeeExist();

      if (this.formMode == 1) {
        axios
          .post("http://localhost:3131/api/v1/Employees", me.Employee)
          
          .then(function () {
            toast.success("Thêm nhân viên thành công", { timeout: 2000 });
            this.Employee = {};
            this.getNewEmployeeCode();
            this.Employee.employeeCode = this.newCode;
            this.$refs.txtEmployeeCode.focus();
            
           
          })
          .catch(function () {});
      } else {
        axios
          .put(
            `http://localhost:3131/api/v1/Employees/${me.Employee.employeeID}`,
            me.Employee
          )
          .then(function () {
            toast.success("Sửa nhân viên thành công", { timeout: 2000 });
            // me.popupMsg = "Sửa dữ liệu thành công";
            // me.popup();
          })

          .catch(function () { });
      }
    },

    /**
     * đóng form chi tiết
     *  Authors: HTTHOA(09/08/2022)
     */
    btnCloseOnclick() {

      let checkEmp =
        JSON.stringify(this.oldEmp) === JSON.stringify(this.Employee);
      if (checkEmp) {
        this.$emit("showDialog", false);
      } else {
        this.isShowMsgWarning = true;
      }
    },

    /**
     *
     * @param {validate email} value
     * AUTHOR: HTTHOA (10/08/2022)
     */
    validateEmail(email) {
      console.log(email);
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
        email == ""
      ) {
        this.emailError = "";
        event.currentTarget.classList.remove("input-error");
      } else {
        this.emailError = "email không đúng định dạng";
        event.currentTarget.classList.add("input-error");
      }
    },
    /**
     *
     * @param {đóng msg cảnh báo khi ấn hủy (nút hủy)} value
     *AUTHOR: HTTHOA (17/08/2022)
     */
    hideWarnForm(value) {
      this.isShowMsgWarning = value;
      this.$emit("showDialog", false);
    },
    /**
     *
     * @param {đóng msg cảnh báo khi ấn hủy (nút không) gán object hiện tại bằng object cũ } value
     *AUTHOR: HTTHOA (17/08/2022)
     */
    hideMsgWarning(value) {
      this.isShowMsgWarning = value;
      let me = this;
      var names = Object.getOwnPropertyNames(this.oldEmp);
      names.filter(function (name) {
        me.Employee[name] = me.oldEmp[name];
      });
    },
    /**
     *
     * @param {đóng msg cảnh báo khi ấn hủy (nút có)} value
     *AUTHOR: HTTHOA (17/08/2022)
     */
    closeSave(value) {
      this.btnAddAndSave();
      this.isShowMsgWarning = value;
      this.$emit("showDialog", false);
    },
  },
};
</script>
