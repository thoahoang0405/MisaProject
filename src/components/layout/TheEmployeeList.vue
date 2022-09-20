<template>
  <div>
    <div class="main" id="main">
      <div class="main-header">
        <h1 class="Emp-title">{{ infoEmployee.info }}</h1>
        <button id="btn-add" @click="btnAddOnClick" class="btn-add">
          {{ btn.btnAdd }}
        </button>
      </div>
      <div class="main-table">
        <div class="main-table-header">
          <div>
            <button @click="btnDeleteMultiple" class="action-multiple">
              <p>Thực hiện hàng loạt </p>
              <div ref="iconDrop" class="icon-drop" v-bind="iconDrop"></div>
            </button>
            <button v-show="isShowBtnDelete" @click="btnDelete" class="delete-multiple">Xóa</button>
            <div class="noti" v-show="isShowMsgDL">Bạn cần chọn bản ghi trước</div>
          </div>
          <div class="main-header-right">
            <input v-model="txtSearch" @keyup.enter="btnSearch" ref="txtsearch" type="text"
              :placeholder="infoEmployee.search" />
            <div class="icon-search"></div>
            <div data-title="lấy lại dữ liệu" id="refresh" @click="filterEmployee" class="icon-refresh">
              <span id="" class="icon-refresh"> </span>
            </div>
            <a data-title="Xuất ra Excel" id="excel"
              :href="`http://localhost:3131/api/v1/Employees/ExportExcel?keyword=${this.txtSearch}`" class="icon-excel"
              download>
              <span id="" :myData="filterEmployee" class="icon-excel"> </span>
            </a>
          </div>
        </div>
        <div id="m-table" class="m-table">
          <DropFunction v-show="isShowMenu" :empDeleteCode="employeeCode" @closeDrop="hideDropMenu"
            :employeeDeleteId="employeeId" :employeeDetails="employeeRepli" :emplyeeCode="employeeCode"
            :loadData="filterEmployee" :newEmployeeCode="getNewEmployeeCode"></DropFunction>
          <table id="tbEmployee" class="table">
            <thead>
              <tr>
                <th class="sticky-left-top checkbox" colspan="1" style="min-width: 30px !important; text-align: center">
                  <input @click="checkAll" ref="checkall" type="checkBox" class="check-all"
                    style="width: 18px; height: 18px" />
                </th>
                <th colspan="2" style="min-width: 144px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{ infoEmployee.empCode.toUpperCase() }}
                    </span>
                  </div>
                </th>
                <th colspan="3" style="min-width: 155px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.empName.toUpperCase()
                    }}</span>
                  </div>
                </th>
                <th colspan="4" style="min-width: 126px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.gender.toUpperCase()
                    }}</span>
                  </div>
                </th>
                <th colspan="5" style="min-width: 151px; text-align: center">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.dob.toUpperCase()
                    }}</span>
                  </div>
                </th>

                <th class="iden-tool" colspan="6" style="min-width: 150px" title="Số chứng minh nhân dân">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.idenNumber.toUpperCase()
                    }}</span>
                  </div>
                </th>
                <th colspan="7" style="min-width: 150px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.positionName.toUpperCase()
                    }}</span>
                  </div>
                </th>
                <th colspan="8" style="min-width: 200px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{
                    infoEmployee.department.toUpperCase()
                    }}</span>
                  </div>
                </th>
                <th colspan="9" style="min-width: 144px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{ infoEmployee.bankAccount.toUpperCase() }}
                    </span>
                  </div>
                </th>
                <th colspan="10" style="min-width: 181px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{ infoEmployee.bankName.toUpperCase() }}
                    </span>
                  </div>
                </th>
                <th colspan="11" style="min-width: 180px">
                  <div class="th-item">
                    <span class="table-text text-align-center">{{ infoEmployee.bankBranch.toUpperCase() }}
                    </span>
                  </div>
                </th>
                <th class="th-item-final sticky-right-top" colspan="12" style="min-width: 100px; text-align: center">
                  <div class="th-item">
                    <span class="table-text">{{ infoEmployee.func.toUpperCase() }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr ref="row" v-for="employee in employees" @dblclick="editOnclick(employee)" :key="employee.EmployeeID"
                @click="rowOnclick(employee)">
                <td ref="rowCheck" class="checkbox sticky-left" style="text-align: center" colspan="1">
                  <input @click="check" ref="check" class="check-item" type="checkbox"
                    style="width: 18px; height: 18px" />
                </td>
                <td colspan="2">
                  <div class="td-item">
                    <span class="table-text text-align-center" >{{
                    employee.EmployeeCode
                    }}</span>
                  </div>
                </td>
                <td colspan="3">
                  <div class="td-item">
                    <span class="table-text" :title=" employee.EmployeeName">{{ employee.EmployeeName }}</span>
                  </div>
                </td>
                <td colspan="4">
                  <div class="td-item">
                    <span class="table-text">{{formatGender(employee.Gender) }}</span>
                  </div>
                </td>
                <td colspan="5" style="text-align: center">
                  <div class="td-item">
                    <span class="table-text text-align-center">{{
                    formatDate(employee.DateOfBirth)
                    }}</span>
                  </div>
                </td>

                <td colspan="6">
                  <div class="td-item">
                    <span class="table-text">{{ employee.IdentityNumber }}</span>
                  </div>
                </td>
                <td colspan="7">
                  <div class="td-item">
                    <span class="table-text"  :title="employee.PositionName">{{ employee.PositionName }}</span>
                  </div>
                </td>
                <td colspan="8">
                  <div class="td-item">
                    <span class="table-text">{{ employee.DepartmentName }}</span>
                  </div>
                </td>
                <td colspan="9">
                  <div class="td-item">
                    <span class="table-text">{{employee.BankAccount}}</span>
                  </div>
                </td>
                <td colspan="10">
                  <div class="td-item">
                    <span class="table-text">{{employee.BankName}}</span>
                  </div>
                </td>
                <td colspan="11">
                  <div class="td-item">
                    <span class="table-text">{{employee.BankBranch}} </span>
                  </div>
                </td>
                <td ref="func" class="td-item-final td-func sticky-right"
                  style="position: sticky; right: 0; background-color: #fff" colspan="12">
                  <div @click="editOnclick(employee)" class="edit-text">
                    {{ btn.editBtn }}
                  </div>
                  <button ref="btnMenu" id="btnMenu" @click="showMenu($event)">
                    <div class="icon-down"></div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="paging">
          <div class="paging-left">
            {{ infoEmployee.total }}:
            <strong>{{ totalRecord }}</strong>
            {{ infoEmployee.record }}
          </div>
          <div class="paging-right">
            <div class="page">
              <div class="content-page">
                {{ pageDefault }} {{ infoEmployee.pageSize }}
              </div>
              <div class="dropup-page">
                <div class="icon-dropup" @click="btnDropUp"></div>
                <div class="item-up" v-show="isShow">
                  <div class="item-dropup" :class="{act: isActive == '10'}" pageSize="10" :value="pageDefault"
                    @click="getPageDefault">
                    10 {{ infoEmployee.pageSize }}
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='20'}" pageSize="20" @click="getPageDefault">
                    20 {{ infoEmployee.pageSize }}
                  </div>
                  <div class="item-dropup" :class="{act: isActive =='30'}" pageSize="30" @click="getPageDefault">
                    30 {{ infoEmployee.pageSize }}
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='50'}" pageSize="50" @click="getPageDefault">
                    50 {{ infoEmployee.pageSize }}
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='100'}" pageSize="100" @click="getPageDefault">
                    100 {{ infoEmployee.pageSize }}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="1"
                :click-handler="clickCallback" :prev-text="'Trước'" :next-text="'Sau'" :container-class="'pagination'"
                :page-class="'page-item'">
              </Paginate>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadData v-show="loading"> </LoadData>
  </div>
  <EmployeeDetail v-show="isShowEmployeeDetail" :showDialog="isShowEmployeeDetail" @showDialog="hideFormDetail"
    :employeeDetail="employeeSelected" :employeeSelectedId="employeeId" :newEmployeeCode="newCode"
    :formMode="formModeDetail" :employeeCode="employeeCode" :loadData="filterEmployee" />
  <MsgDelete :message="message" v-show="isShowMsgDelete" @noDelete="showMsgDelete" @delete="deleteMultipleEmployee">
  </MsgDelete>
</template>
<style>
@import url("../../assets/css/base/main.css");

.pagination {
  margin-left: 20px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #111;
  font-size: 13px;
}

.act {
  background-color: green;
  color: #fff;
}

.BorderActive {
  border: 1px solid #0075c0 !important;
}

.page-item:first-child {
  margin-right: 15px;
}

.page-item {
  margin-left: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 0;
}

.page-item.disabled {
  color: #ccc;
}

.page-item.active {
  border: 1px solid #ccc;
  font-weight: 700;
  text-align: center;
}

.page-item.active a {
  width: 24px;
  text-align: center;
}

.opacity-icon {
  opacity: 0.5;
}
</style>
<script>
import Paginate from "vuejs-paginate-next";
import info from "../../locales/LocaleTableEmployee";
import btn from "../../locales/LocaleButton";
import EmployeeDetail from "./TheEmployeeDetail.vue";
import LoadData from "../../components/base/BaseLoading.vue";
import DropFunction from "../base/BaseFuncDrop.vue";
import $ from "jquery";
import axios from "axios";
import MsgDelete from "../base/BaseMsgDelete.vue";
import { useToast } from "vue-toastification";
import Msg from "../../utils/common";

import { employeeApi } from "../../store/api";
import { FormMode } from "../../utils/enumeration"
export default {
  components: {
    EmployeeDetail,
    LoadData,
    DropFunction,
    Paginate,
    MsgDelete,

  },
  data() {
    return {
      isShowBtnDelete: false,
      isActive: "10",
      pageNumber: 1,
      page: 1,
      totalPage: 0,
      totalRecord: 0,
      isBorderActive: "",
      btn: btn,
      Msg: Msg,
      isShowMsgDL: false,
      infoEmployee: info,
      employeeDelete: {},
      isShowMenu: false,
      txtSearch: "",
      loading: false,
      formModeDetail: FormMode.Add,
      employeeId: null,
      isShowDrop: false,
      isShow: false,
      newCode: null,
      isShowEmployeeDetail: false,
      employeeSelected: {},
      date: null,
      employees: [],
      pageDefault: 20,
      employeeCode: "",
      isShowMsgDelete: false,
      empCode: [],
      listEmployeeID: [],
      arrGender: [],
      gender: "",
      message: "",
      employeeRepli: {}
    };
  },
  /**
   * lấy dữ liệu hiện lên bảng
   * AUTHOR: HTTHOA(20/08/2022)
   */
  created() {
    this.filterEmployee();
  },
  mounted() {
    let me = this;
    $(window).click(function (e) {
      /**
    * click ra ngoài đóng btn xóa
    * AUTHOR: HTTHOA(1/09/2022)
    */
      if ($(e.target).attr("class") !== "delete-multiple" && $(e.target).attr("class") !== "action-multiple") {
        me.hideBtnDelete()
      }
      /**
       * click ra ngoài đóng dropdown paging
       * AUTHOR: HTTHOA(1/09/2022)
       */
      if ($(e.target).attr("class") !== "page" && !$(".page").has(e.target).length) {
        me.hidePaging()
      }
      if ($(e.target).attr("id") !== "btnMenu" && $(e.target).attr("class") !== "item-func" && !$(".dialog").has(e.target).length && $(e.target).attr("class") !== "edit-text") {
        me.clickOutSideDropMenu()
      }
    })
    /**
     * click ra ngoài đóng dropmenu chức năng
     * AUTHOR: HTTHOA(7/09/2022)
     */




    /**
    * thay đổi màu của icon nút thực hiện hàng loạt khi không chọn dữ liệu
    * AUTHOR: HTTHOA(7/09/2022)
    */
    var opacity = this.$refs.iconDrop;
    opacity.classList.add("opacity-icon")
    

  },
  watch: {
    /**
    * theo dõi khi chọn bản ghi trên 1 trang  thì lấy lại dữ liệu
    * AUTHOR: HTTHOA(20/08/2022)
    */
    pageDefault: function () {
      this.filterEmployee();
    },
    listEmployeeID: function () {
      if (this.listEmployeeID.length > 0) {
        this.isShowMsgDL = false
      }
    },

    /**
    * theo dõi ô input khi người dùng nhập keyword
    * AUTHOR: HTTHOA(20/08/2022)
    */
    txtSearch: function () {
      if (this.txtSearch == "") {
        this.filterEmployee();
      }
    }
  },
  methods: {
    /**
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/08/2022)
     */
    filterEmployee() {
      try {
        const toast = useToast();
        var me = this;
        this.showLoading(true);
        axios
          .get(`${employeeApi}Filter?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`)
          .then(function (res) {
            me.totalPage = res.data.TotalPages;
            me.totalRecord = res.data.TotalRecords;
            me.employees = res.data.Data;
            for (var emp of res.data.Data) {
              me.arrGender.push(emp.Gender)
            }
          })
          .then(function () {
            me.showLoading(false);
          })
          .catch(function (res) {

            if (res.response.status == 404) {
              toast.error(Msg.ErrorNotFound, { timeout: 4000 });
            } else {

              toast.error(Msg.Error500, { timeout: 4000 });

            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * format Date sang dạng dd/mm/yyyy
     * AUTHOR: HTTHOA(05/08/2022)
     */
    formatDate(Dob) {
      if (Dob) {
        Dob = new Date(Dob);
        let date = Dob.getDate();
        date = date < 10 ? `0${date}` : date;
        let month = Dob.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = Dob.getFullYear();
        Dob = `${date}-${month}-${year}`;
      } else {
        Dob = "";
      }
      return Dob;
    },
    /**
     * hiển thị giới tính từ 0,1,2 sang nam, nữ, khác trên bảng
     * AUTHOR: HTTHOA(20/08/2022)
     */
    formatGender(gender) {
      switch (gender) {
        case 0:
          gender = "Nam";
          break;
        case 1:
          gender = "Nữ";
          break;
        case 2:
          gender = "Khác";
          break;
        default:
          gender = "";
      }
      return gender;
    },
    /**
     *
     * show biểu tượng loading 
     * AUTHOR: HTTHOA(06/08/2022)
     */
    showLoading(value) {
      this.loading = value;
    },
    /**
   * xử lý sự kiện button add
   * AUTHOR: HTTHOA(05/08/2022)
   */
    btnAddOnClick() {
      this.formModeDetail = FormMode.Add;
      this.employeeSelected = {};
      this.employeeId = null;
      this.functionShowDialog(true);
      this.newCode = {};
      this.getNewEmployeeCode();
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
            me.newCode = res.data;
          })
          .catch(function (res) {
            if (res.response.status == 404) {
              toast.error(Msg.ErrorNotFound, { timeout: 4000 });
            } else {

              toast.error(Msg.Error500, { timeout: 4000 });

            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *
     * Hiển thị form chi tiết
     * AUTHOR: HTTHOA(05/08/2022)
     */
    functionShowDialog(value) {
      this.isShowEmployeeDetail = value;
      this.filterEmployee();
    },
    /**
     *
     * hiển thị,đóng form chi tiết 
     *  Authors: HTTHOA(05/08/2022)
     *
     */
   
    hideFormDetail(value) {
      this.isShowEmployeeDetail = value;
    
    
      this.filterEmployee();
      
    },
    /**
     * tìm kiếm
     * AUTHOR: HTTHOA (19/08/2022)
     */
    btnSearch() {
      this.filterEmployee();
    },
    /**
    * mở file excel trong tab mới để tải
    * AUTHOR: HTTHOA(1/09/2022)
    */
    getExcel() {
      try {
        const toast = useToast();
        axios
          .get(`${employeeApi}ExportExcel?keyword=${this.txtSearch}`)
          .then(function (res) {
          })
          .catch(function (res) {
            if (res.response.statuss == 400) {

              toast.error(Msg.ErrorClient, { timeout: 4000 });


            } else {

              toast.error(Msg.Error500, { timeout: 4000 });

            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     *
     * hiển thị vị trí dropdown chức năng xóa
     * AUTHOR: HTTHOA (11/08/2022)
     */
    showMenu(e) {

      let position = $(e.target)[0].getBoundingClientRect();
      var top = position.top;
      var left = position.left;
      $(".listFunction").css("top", top - 28 + "px");
      $(".listFunction").css("left", left - 270 + "px");
      this.isShowMenu = true;

    },
    /**
    * hàm ẩn drop menu
    * AUTHOR: HTTHOA(1/09/2022)
    */
    hideDropMenu(value) {
      this.isShowMenu = value;
      this.filterEmployee(value)
    },
    /**
     * click ra ngoài ẩn menu chức năng
     * AUTHOR: HTTHOA(7/09/2022)
     */
    clickOutSideDropMenu() {
      this.isShowMenu = false
    },
    /**
     *
     * lấy dữ liệu khi click vào hàng
     * AUTHOR: HTTHOA(11/08/2022)
     */
    rowOnclick(employee) {
      this.employeeDelete = employee;
      this.employeeId = employee.EmployeeID;
      this.employeeCode = employee.EmployeeCode;
      this.employeeRepli = employee;

    },
    /**
     * hiển thị dữ liệu khi click vào sửa
     * AUTHOR: HTTHOA(08/08/2022)
     */
    editOnclick(employee) {
     
      this.formModeDetail = FormMode.Edit;
      this.functionShowDialog(true);
      this.employeeSelected = employee;
      this.employeeId = employee.EmployeeID;
      this.filterEmployee()
    },
    /**
  * xử lý check từng hàng khi tích vào ô check box 
  * AUTHOR: HTTHOA(30/08/2022)
  */
    check() {
      this.listEmployeeID = [];
      var listCheck = this.$refs.check;
      var rowCheck = this.$refs.row;
      var funcCheck = this.$refs.func;
      var check = this.$refs.rowCheck;
      var listEmp = [];
      for (var emp of this.employees) {
        listEmp.push(emp.EmployeeID)
      }
      for (var i = 0; i < listCheck.length; i++) {
        this.listEmployeeID.unshift(listEmp[i]);
        if (listCheck[i].checked == true) {
          rowCheck[i].classList.add("row-active")
          check[i].classList.add("row-active")
          funcCheck[i].classList.add("row-active")
        } else {
          this.listEmployeeID.splice(listEmp[i], 1)
          rowCheck[i].classList.remove("row-active")
          check[i].classList.remove("row-active")
          funcCheck[i].classList.remove("row-active")
        }
      }
      this.iconDropDelete()
    },
    /**
     * thay đổi màu của icon thực hiện hàng loạt
     * AUTHOR: HTTHOA(6/09/2022)
     */
    iconDropDelete() {
      var opacity = this.$refs.iconDrop;
      if (this.listEmployeeID.length > 0) {
        opacity.classList.remove("opacity-icon")
      } else {
        opacity.classList.add("opacity-icon")
      }
    },

    /**
     * xử lý check tất cả các hàng khi tích vào ô check box đầu tiên
     * AUTHOR: HTTHOA(30/08/2022)
     */
    checkAll() {
      var rowCheck = this.$refs.row;
      var funcCheck = this.$refs.func;
      var check = this.$refs.rowCheck;
      this.listEmployeeID = [];
      var listCheck = this.$refs.check;
      if (this.$refs.checkall.checked) {
        for (var emp of this.employees) {
          for (let i = 0; i < listCheck.length; i++) {
            listCheck[i].checked = true
            rowCheck[i].classList.add("row-active")
            check[i].classList.add("row-active")
            funcCheck[i].classList.add("row-active")
          }
          this.listEmployeeID.push(emp.EmployeeID);
        }
      } else {
        for (let i = 0; i < listCheck.length; i++) {
          listCheck[i].checked = false
          rowCheck[i].classList.remove("row-active")
          check[i].classList.remove("row-active")
          funcCheck[i].classList.remove("row-active")
        }
        this.listEmployeeID = [];
      }
      console.log(this.listEmployeeID)
      this.iconDropDelete()
    },
    /**
     * nhấn nút thực hiện hàng loạt để hiện nút thực hiện hàng loạt
     * AUTHOR: HTTHOA(2/09/2022)
     */
    btnDeleteMultiple() {
      if (this.listEmployeeID.length > 0) {
        this.isShowBtnDelete = true
        this.isShowMsgDL = false
      } else {
        this.isShowMsgDL = !this.isShowMsgDL
      }
    },
    /**
      * show confirm xóa
      * AUTHOR: HTTHOA(2/09/2022)
      */
    showMsgDelete(value) {
      this.isShowMsgDelete = value
    },
    /**
     * ấn nút xóa khi đã chọn hàng => hiện confirm xóa
     *  AUTHOR: HTTHOA(2/09/2022)
     */
    btnDelete() {
      this.showMsgDelete(true);
      this.message = Msg.MsgDelete
    },
    /**
     *
     * đóng btn xóa
     *  Authors: HTTHOA(09/09/2022)
     *
     */
    hideBtnDelete() {
      this.isShowBtnDelete = false
    },
    /**
     * hàm api xóa hàng loạt employee
     * AUTHOR: HTTHOA (2/09/2022)
     */
    deleteMultipleEmployee() {
      try {
        const toast = useToast();
        var me = this;
        axios
          .put(`${employeeApi}Multiple?ListId=`, me.listEmployeeID)
          .then(function () {
            me.showMsgDelete(false);
            toast.warning(Msg.DeleteSuccess, { timeout: 2000 });
            me.getEmployeeAfterDelete();
          })
          .catch(function (res) {
            if (res.response.status == 400) {
              toast.error(Msg.ErrorClient, { timeout: 4000 });
            } else {
              toast.error(Msg.Error500, { timeout: 4000 });

            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * load lại dữ liệu khi xóa xong
     * AUTHOR: HTTHOA(05/09/2022)
     */
    getEmployeeAfterDelete() {
      this.filterEmployee();
      this.listEmployeeID = [];
      var listCheck = this.$refs.check;
      var rowCheck = this.$refs.row;
      var funcCheck = this.$refs.func;
      var checkAll = this.$refs.checkall;
      var check = this.$refs.rowCheck;
      checkAll.checked = false
      for (var i = 0; i < listCheck.length; i++) {
        listCheck[i].checked = false
        rowCheck[i].classList.remove("row-active")
        check[i].classList.remove("row-active")
        funcCheck[i].classList.remove("row-active")
      }
    },
    /**
     *
     * hiển thị paging
     *  AUTHOR: HTTHOA(05/08/2022)
     */
    showPage(is) {
      this.isShow = is;
    },
    /**
     * hàm hiện dropup
     * AUTHOR: HTTHOA(06/08/2022)
     */
    btnDropUp() {
      $(".icon-dropup").toggleClass("iconrotate");
      if (!this.isShow) {
        this.showPage(true);
        $(".icon-dropup").addClass("iconrotate");
      } else {
        this.showPage(false);
        $(".icon-dropup").removeClass("iconrotate");
      }
    },
    /**
    * ẩn combobox paging
    * AUTHOR: HTTHOA(1/09/2022)
    */
    hidePaging() {
      this.isShow = false
      $(".icon-dropup").removeClass("iconrotate");
    },
    /**
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      $(".icon-dropup").removeClass("iconrotate");
      this.filterEmployee();
      if (this.pageDefault > this.totalRecord) {
        this.pageDefault = this.totalRecord;
      }
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.filterEmployee();
    },
  },
};
</script>
