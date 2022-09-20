<template>
  <div id="dialog" class="dialog">
    <div class="dialog-form" @keyup.esc="closeForm" @keyup.ctrl.f8="btnAddAndSave"
      @keyup.ctrl.f9="btnCloseOnclick" @keyup.enter="btnSave">
      <div class="form-header">
        <div class="form-header-left">
          <h1>{{ infoEmployee.infoEmployee }}</h1>
          <div class="form-header-checkbox">
            <input name="isCustomer" type="checkbox" />
            <p for="isCustomer">{{ infoEmployee.isCustomer }}</p>
          </div>
          <div class="form-header-checkbox">
            <input name="isCustomer" type="checkbox" />
            <p for="isCustomer">{{ infoEmployee.isSupp }}</p>
          </div>
        </div>
        <div class="form-header-right">
          <div @click="open2" class="icon-help"></div>
          <div @click="btnCloseOnclick" id="icon-close" title="Close (Esc)" class="icon-close"></div>
        </div>
      </div>
      <div class="form-content">
        <div class="m-rowFirst" style="display: flex:  !important;">
          <div class="item-left">
            <div class="m-row">
              <div class="input-content EmpCode">
                <label for="Code">{{ infoEmployee.empCode }}
                  <p style="color: red; margin-left: 4px">*</p>
                </label>
                <input class="Code" v-model="employee.EmployeeCode" @blur="blurInput" :placeholder=" infoEmployee.empCode"
                  type="text" ref="txtEmployeeCode"  :title="infoEmployee.titleCode" propname="EmployeeCode" id="Code" name="Mã" 
               />
              </div>
              <div class="input-content EmpName">
                <label for="Name">{{ infoEmployee.empName }}
                  <p style="color: red; margin-left: 4px">*</p>
                </label>
                <input type="text" @blur="blurInput" :placeholder=" infoEmployee.empName" ref="txtEmployeeName"
                  :title="infoEmployee.titleName" v-model="employee.EmployeeName" propname="FullName" id="Name"
                  name="Tên" class="Name" required="" />
              </div>
            </div>
            <div class="m-row">
              <div class=" EmpUnit input-content">
                <label for="Unit" class="label">{{ infoEmployee.department }}
                  <p style="color: red; margin-left: 4px">*</p>
                </label>

                <InputCombobox @newDepartmentName="newDepartmentName" @dpmId="dpmId"
                  :Department="employee.DepartmentName">
                </InputCombobox>
              </div>
            </div>
            <div class="m-row">
              <div class="input-content" :value="employee.PositionId">
                <label for="PosName">{{ infoEmployee.positionName }} </label>
                <input :placeholder="infoEmployee.positionName" v-model="employee.PositionName" type="text" id="PositionName"
                  propname="PositionName" class="PosName" />
              </div>
            </div>
          </div>
          <div class="item-right">
            <div class="m-row">
              <div class="">
                <label class="label" for="Dob">{{ infoEmployee.dob }}</label>

                <div class="block">
                  <el-date-picker
                    style=" width:160px !important ; font-size: 13px; font-weight:100; margin-right: 10px;"
                    v-model="employee.DateOfBirth" type="date" placeholder="dd/mm/yyyy" format="DD/MM/YYYY" />
                </div>
               
              </div>
              <div class="input-content">
                <label for="Gender">{{ infoEmployee.gender }}</label>
                <div class="radio-group">
                  <input propname="Render" style="margin-right: 8px" type="radio" :value="0" class="gender"
                    name="Gender" v-model="employee.Gender" />
                  <p>{{ infoEmployee.male }}</p>
                  <input style="margin-left: 16px" type="radio" :value="1" class="gender" name="Gender"
                    v-model="employee.Gender" />
                  <p>{{ infoEmployee.female }}</p>
                  <br />
                  <input style="margin-left: 16px" type="radio" :value="2" class="gender" name="Gender"
                    v-model="employee.Gender" />
                  <p>{{ infoEmployee.other }}</p>
                </div>
              </div>
            </div>
            <div class="m-row">
              <div class="input-content Iden">
                <label for="IdenNum" :title="infoEmployee.titleIdent">{{ infoEmployee.idenNumber }}</label>
                <input class="IdenNum" :title="infoEmployee.titleIdent" :placeholder="infoEmployee.idenNumber" type="text"
                  v-model="employee.IdentityNumber" />
              </div>
              <div class="">
                <label class="label" for="IdenDate">{{ infoEmployee.idenDate }}</label>
                <div class="block">
                  <el-date-picker style=" width:160px !important ; font-size: 13px; font-weight:100"
                    v-model="employee.IdentityDate" type="date" placeholder="dd/mm/yyyy" format="DD/MM/YYYY" />
                </div>

              </div>
            </div>
            <div class="m-row">
              <div class="input-content">
                <label for="IdenPlace">{{ infoEmployee.idenPlace }}</label>
                <input :placeholder="infoEmployee.idenPlace" type="text" v-model="employee.IdentityPlace" propname="IdentityPlace"
                  class="IdenPlace" />
              </div>
            </div>
          </div>
        </div>
        <div class="m-row">
          <div class="input-content">
            <label for="Address">{{ infoEmployee.address }}</label>
            <input :placeholder="infoEmployee.address" type="text" v-model="employee.Address" propname="Address" id="Address"
              class="Address" />
          </div>
        </div>
        <div class="m-row">
          <div class="input-content">
            <label for="mobile-phone" class="mobile-phone">{{ infoEmployee.mobilePhone }}</label>
            <input :placeholder="infoEmployee.mobilePhone" type="text" id="mobile-phone" v-model="employee.PhoneNumber"
              class="mobile-phone" />
          </div>
          <div class="input-content">
            <label for="phone" class="phone">{{ infoEmployee.lineLandPhone }}</label>
            <input :placeholder="infoEmployee.lineLandPhone" v-model="employee.LandlinePhone" type="text" id="phone"
              class="phone" />
          </div>
          <div class="input-content">
            <label for="Email" class="Email">{{ infoEmployee.email }}</label>
            <input :placeholder="infoEmployee.email" type="text" id="Email" @blur="validateEmail" class="Email"
              v-model="employee.Email" />
            <div class="red" style="margin-left: 8px">{{ emailError }}</div>
          </div>
        </div>
        <div class="m-row">
          <div class="input-content">
            <label for="BankName" class="BankName">{{ infoEmployee.bankName }}</label>
            <input :placeholder="infoEmployee.bankName" v-model="employee.BankName" type="text" id="BankName" class="BankName" />
          </div>
          <div class="input-content">
            <label for="BankPlace" class="BankPlace">{{ infoEmployee.bankBranch }}</label>
            <input :placeholder="infoEmployee.bankBranch" v-model="employee.BankBranch" type="text" id="BankPlace"
              class="BankPlace" />
          </div>
          <div class="input-content">
            <label for="BankNum" class="BankNum">{{ infoEmployee.bankAccount }}</label>
            <input :placeholder="infoEmployee.bankAccount" v-model="employee.BankAccount" type="text" id="BankNum" class="BankNum" />
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button @click="btnCloseOnclick" id="cancel" title="Hủy (Ctrl + F9)" class="cancel">
          {{ btn.btnCancel }}
        </button>
        <div class="btn-right">
          <button id="btn-store" title="Cất ( Enter )" @click="btnSave" class="btn-store">
            {{ btn.btnSave }}
          </button>
          <button id="btn-stor-add" @click="btnAddAndSave" title="Cất và thêm (Ctrl + F8)" class="btn-stor-add">
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
  </div>
</template>
<style>
@import url("../../assets/css/form/form.css");
@import url("../../assets/css/base/style.css");
</style>
<script>
import axios from "axios";
import MsgErrorRequired from "../base/BaseMsgError.vue";
import InputCombobox from "../base/BaseCbbInput.vue";
import info from "../../locales/LocaleTableEmployee";
import btn from "../../locales/LocaleButton";
import MsgExist from "../base/BaseMsgExist.vue";
import MsgWarning from "../base/BaseMsgWarning.vue";
import { useToast } from "vue-toastification";
import Msg from "../../utils/common";
import { employeeApi } from "../../store/api";
import $ from "jquery";
import { FormMode } from "../../utils/enumeration";
import {
  ElDatePicker,

} from "element-plus/dist/index.full.js";
import 'element-plus/es/components/message/style/css'
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/vi";


export default {
  components: {
    MsgErrorRequired,
    InputCombobox,
    MsgExist,
    MsgWarning,
    ElDatePicker,

  },
  data() {
    return {
      code: "",
      loading: false,
      btn: btn,
      infoEmployee: info,
      departmentName: "",
      isShowDropCbb: false,
      empCode: [],
      emailError: "",
      borderErr: false,
      email: "",
      employee: {
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
      arr: [],
      oldEmp: {},
      isValid: true,
      newEmpCode: "",
      formModeRepli: null,
      employees: {},
      departments: {},
    };
  },
  props: [
    "showDialog",
    "employeeDetail",
    "loadData",
    "employeeSelectedId",
    "newEmployeeCode",
    "formMode",
    "empNewCodeRepli",
    "employeeCode",
    "employeeDetailAdd",
    "formRepli"
  ],

  mounted() {
   
    document.getElementsByTagName("input")[0].focus()
   
  },
 
  watch: {
    /**
     *
     * hàm lấy dữ liệu từ bảng lên form
     *  Authors: HTTHOA(09/08/2022)
     *
     */
    employeeDetail: function (value) {
    
      this.employee = value
      this.employee.EmployeeCode= value.EmployeeCode
      this.$refs.txtEmployeeCode.focus();
      this.oldEmp = { ...value };
    },
    /**
     *
     * lấy formMode nhân bản
     *  Authors: HTTHOA(09/09/2022)
     *
     */
    formRepli: function (value) {
      this.formModeRepli = value
    },
    /**
     *
     * lấy độ dài
     *  Authors: HTTHOA(17/09/2022)
     *
     */
    validateMaxLength(value, propName) {
      if (this.property[propName].length > value) {
        this.message[propName] = `phải nhỏ hơn ${value} kí tự`
        return false;
      }
      this.message[propName] = "";
      return true;
    },
    /**
     *
     * hàm code mới
     *  Authors: HTTHOA(09/09/2022)
     *
     */
    empNewCodeRepli: function (value) {
      this.employee.EmployeeCode = value
      this.$refs.txtEmployeeCode.focus();
    },

    /**
     *
     * hàm lấy dữ liệu từ bảng lên form khi nhân bản
     *  Authors: HTTHOA(09/09/2022)
     *
     */
    employeeDetailAdd: function (value) {
      
      this.employee = value

    },
    /**
     *
     * lấy mã nhân viên mới
     * Authors: HTTHOA(09/08/2022)
     */
    newEmployeeCode: function (value) {
      this.newCode = value;
      this.employee.EmployeeCode = value;
      this.$refs.txtEmployeeCode.focus();
     
     
    },
  },
  methods: {

    /**
     * validate dữ liệu
     * AUTHOR: HTTHOA(10/08/2022)
     */

    validate() {
      this.message = [];
      if (!this.employee.EmployeeCode) {
        this.push.message(Msg.ErrorCode);
        this.showMsgRequired(true);
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      if (!this.employee.EmployeeName) {
        this.message.push(Msg.ErrorName);
        this.showMsgRequired(true);
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      if (!this.employee.DepartmentName) {
        this.message.push(Msg.ErrorDepartment);
        this.showMsgRequired(true);
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      if (this.employee.DateOfBirth) {
        this.employee.DateOfBirth = new Date(this.employee.DateOfBirth)
      }
      if (this.employee.DateOfBirth > new Date() && this.employee.DateOfBirth) {
        this.isValid = true;
        this.message.push(Msg.FormatDate);
        this.showMsgRequired(true);
      } else {
        this.isValid = false;
      }
    },
    /**
     * hiển thị message lỗi không được trống
     * AUTHOR: HTTHOA(10/08/2022)
     */
    showMsgRequired(value) {
      this.isMsgRequired = value;
      if (document.getElementsByClassName("input-error")) {
        document.getElementsByClassName("input-error")[0].focus()
      }
    },
    /**
     *
     * hiển thị message cảnh báo xóa
     * AUTHOR: HTTHOA(10/08/2022)
     */
    showMsgDelete(value) {
      this.isMsgDelete = value;
    },
    /**
     *
     * xử lý combobox lấy Id đơn vị}
     * AUTHOR: HTTHOA(10/08/2022)
     */
    dpmId(value) {
      this.employee.DepartmentID = value;
    },
    /**
     *
     * @param {Lấy tên đơn vị} e
     * AUTHOR: HTTHOA(10/08/2022)
     */
    newDepartmentName(value) {
      this.employee.DepartmentName = value;
    },
    /**
    * hiển thị combobox
    * AUTHOR: HTTHOA (13/08/2022)
    */
    functionShowCbb(value) {
      this.isShowDropCbb = value;
    },
    /**
     * hiển thị loading
     * AUTHOR: HTTHOA(13/08/2022)
     */
    showLoading(value) {
      this.loading = value;
    },
    /**
     * 
     *  kiểm tra mã nhân viên đã tồn tại
     Author: HTTHOA(15/8/2022)
    */
    getEmployeeExist() {
      try {
        const toast = useToast();
        if (this.formMode == FormMode.Add) {
          var me = this;
          axios
            .get(`${employeeApi}`)
            .then(function (response) {
              me.employees = response.data;
              for (const emp of response.data) {
                me.code = emp.EmployeeCode;
                me.arr.push(me.code);
                if (me.employee.EmployeeCode == me.code) {
                  me.showMsgExist(true);
                  me.isValid = true
                } else {
                  me.isValid = false
                }
              }
            })
            .catch(function (res) {
              if (res.response.status == 404) {
                toast.error(Msg.ErrorNotFound, { timeout: 4000 });
              } else {
                if (res.response.status == 500) {
                  toast.error(Msg.Error500, { timeout: 4000 });
                }
              }
            });
          me.MsgExist = me.employee.EmployeeCode;
        }
      } catch (error) {
        console.log(error);
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
      try {
        const toast = useToast();
        var me = this;
        //sau reset thì lấy nhân viên mới
        axios
          .get(`${employeeApi}NewCode`)
          .then(function (res) {
            me.newEmpCode = res.data;
            me.employee.EmployeeCode = res.data;
            this.$refs.txtEmployeeCode.focus()
          })
          .catch(function (res) {
            if (res.response.status == 404) {

              toast.error(Msg.ErrorNotFound, { timeout: 4000 });


            } else {
              if (res.response.status == 500) {
                toast.error(Msg.Error500, { timeout: 4000 });
              }
            }
          });
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * sự kiện blur vào input trống hiện border màu đỏ
     * AUTHOR: HTTHOA(10/08/2022)
     */
    blurInput(event) {
      var value = event.target.value;
      if (!value) {
        event.target.classList.add("input-error");
      } else {
        event.target.classList.remove("input-error");
      }


    },
    /**
    *
    * validate email
    * AUTHOR: HTTHOA (10/08/2022)
    */
    validateEmail(event) {
      console.log(this.employee.Email)
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.employee.Email) || this.employee.Email == undefined
        || this.employee.Email == ""
      ) {
        this.emailError = "";
        event.target.classList.remove("input-error");
      } else {
        this.emailError = Msg.ErrorEmail;
        event.target.classList.add("input-error");
      }
    },

    /**
     * thêm , sửa cho nút cất
     * Author: HTTHOA(6/8/2022)
     */
    saveData() {
      try {
        var me = this;
        me.getEmployeeExist();
        me.validate();
        if (me.isValid) {
          this.$emit("showDialog", true);
        }
        const toast = useToast();
        if (!this.isValid) {
          if (this.formMode == FormMode.Add) {
            axios
              .post(`${employeeApi}`, me.employee)
              .then(function () {
                if (me.formModeRepli == FormMode.Replication) {
                  toast.success(Msg.ReplicationSuccess, { timeout: 2000 });
                  me.$emit("showDialog", false);
                }
                else {
                  toast.success(Msg.InsertSuccess, { timeout: 2000 });
                  me.$emit("showDialog", false);
                  me.loadData()
                }
              })
              .catch(function (res) {
                if (res.response.status == 400) {
                  if (me.isValid == true) {
                    toast.error(Msg.ErrorClient, { timeout: 4000 });
                  }
                } else {
                  if (res.response.status == 500) {
                    toast.error(Msg.Error500, { timeout: 4000 });
                  }
                }

              });

          }
          else {
            
            me.getEmployeeExist();
            axios
              .put(
                `${employeeApi}${me.employee.EmployeeID}`,
                me.employee
              )
              .then(function () {
                toast.info(Msg.EditSuccess, { timeout: 2000 });
                me.$emit("showDialog", false);
                me.loadData()
              })
              .catch(function (res) {
                if (res.response.status == 400) {
                  if (me.isValid == true) {
                    toast.error(Msg.ErrorClient, { timeout: 4000 });
                  }
                } else {
                  if (res.response.status == 500) {
                    toast.error(Msg.Error500, { timeout: 4000 });
                  }
                }
              });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * thêm , sửa cho nút cất và thêm
     * Author: HTTHOA(16/8/2022)
     */
    saveAndAddData() {
      try {
        const toast = useToast();
        var me = this;
        me.validate();
        me.getEmployeeExist();
        if (!this.isValid) {
          if (this.formMode == FormMode.Add) {
            axios
              .post(`${employeeApi}`, me.employee)
              .then(function () {
                if (me.formModeRepli == FormMode.Replication) {
                  toast.success(Msg.ReplicationSuccess, { timeout: 2000 });
                } else {
                  toast.success(Msg.InsertSuccess, { timeout: 2000 });
                }
              })
              .then(function () {
                me.employee = {};
                me.getNewEmployeeCode();
                me.employee.EmployeeCode = me.newCode;
              
                me.loadData();
              })
              .catch(function (res) {
                if (res.response.status == 400) {
                  if (me.isValid == true) {
                    toast.error(Msg.ErrorClient, { timeout: 4000 });
                  }
                } else {
                  if (res.response.status == 500) {
                    toast.error(Msg.Error500, { timeout: 4000 });
                  }
                }
              });

          } else {
           
            axios
              .put(
                `${employeeApi}${me.employee.EmployeeID}`,
                me.employee
              )
              .then(function () {
                toast.info(Msg.EditSuccess, { timeout: 2000 });
                me.loadData()
              })
              .catch(function (res) {

                if (res.response.status == 400) {
                  if (me.isValid == true) {
                    toast.error(Msg.ErrorClient, { timeout: 4000 });
                  }
                } else {
                  if (res.response.status == 500) {
                    toast.error(Msg.Error500, { timeout: 4000 });
                  }
                }
              });
           
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
    * click nút cất
    * AUTHOR: HTTHOA(10/08/2022)
    */
    btnSave() {

      this.showLoading(true);
      this.saveData();
      this.showLoading(false);
    },
    /**
     *
     * Hàm nhấn nút cất và save để sửa và thêm nhân viên (formMofe==1: thêm, formMode=0: sửa)
     * Author: HTTHOA(6/8/2022)
     *
     */
    btnAddAndSave() {

      this.EmployeeCode = this.newCode
      this.saveAndAddData();
    },
    /**
     * đóng form chi tiết
     *  Authors: HTTHOA(09/08/2022)
     */
    btnCloseOnclick() {
      if (this.formModeRepli == FormMode.Replication) {
        this.$emit("showDialog", false);
        this.removeBorder();
      } else {
        let checkEmp =
          JSON.stringify(this.oldEmp) === JSON.stringify(this.employee);
        if (checkEmp) {
          this.$emit("showDialog", false);
          this.removeBorder();
        } else {
          this.isShowMsgWarning = true;
        }
      }
    },
    removeBorder(){
      $(".dialog").find("input.input-error").toArray().forEach(item =>{
      $(item).removeClass("input-error")
    });

    },
    /**
     *
     * đóng form chi tiết
     *  Authors: HTTHOA(09/08/2022)
     *
     */
    closeForm() {
      this.$emit("showDialog", false);
      this.removeBorder();
    },
    /**
     *
     * đóng msg cảnh báo khi ấn hủy (nút hủy)
     *AUTHOR: HTTHOA (17/08/2022)
     */
    hideWarnForm(value) {
      this.isShowMsgWarning = value;
      this.$emit("showDialog", false);
      this.removeBorder();
    },
    /**
     *
     * đóng msg cảnh báo khi ấn hủy (nút không) gán object hiện tại bằng object cũ
     *AUTHOR: HTTHOA (17/08/2022)
     */
    hideMsgWarning(value) {
      this.isShowMsgWarning = value;
      this.$emit("showDialog", true);
      let me = this;
      var names = Object.getOwnPropertyNames(this.oldEmp);
      names.filter(function (name) {
        me.employee[name] = me.oldEmp[name];
      });
    },
    /**
     *
     * đóng msg cảnh báo khi ấn hủy (nút có)
     *AUTHOR: HTTHOA (17/08/2022)
     */
    closeSave(value) {
      this.btnAddAndSave();
      this.isShowMsgWarning = value;
      this.$emit("showDialog", false);
      this.removeBorder();
    },
  },
};
</script>
