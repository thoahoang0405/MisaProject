<template>
<div>
  <div class="main">
    <div class="main-header">
      <h1 class="Emp-title">{{ infoEmployee.info }}</h1>
      <button id="btn-add" @keyup.enter="btnAddOnClick" @click="btnAddOnClick" class="btn-add">
        {{ btn.btnAdd }}
      </button>
    </div>
    <div class="main-table">
      <div class="main-table-header">
        <input v-model="txtSearch" @keyup.enter="btnSearch" ref="txtsearch" class="icon-search" type="text"
          :placeholder="infoEmployee.search" />
        <div title="lấy lại dữ liệu" id="refresh" @click="filterEmployee" class="icon-refresh">
          <span id="" class="icon-refresh"> </span>
        </div>
      </div>

      <div id="m-table" class="m-table">
        <DropFunction v-show="isShowMenu" :empDeleteCode="emplyeeCode"
          @closeDrop="hideDropMenu" :employeeDelete="employeeDelete" :employeeDeleteId="employeeId"
          :emplyeeCode="employeeCode" :loadData="filterEmployee" popupShow="{this.popup}"></DropFunction>

        <table id="tbEmployee" class="table">
          <thead>
            <tr>
              <th class="sticky-left-top checkbox" colspan="1" style="min-width: 30px !important; text-align: center">
                <input @click="checkAll" type="checkBox" class="check-all" style="width: 18px; height: 18px" />
              </th>
              <th colspan="2" style="min-width: 110px">
                <div class="th-item">
                  <span class="table-text text-align-center">{{ infoEmployee.empCode.toUpperCase() }}
                  </span>
                </div>
              </th>
              <th colspan="3" style="min-width: 150px">
                <div class="th-item">
                  <span class="table-text text-align-center">{{
                      infoEmployee.empName.toUpperCase()
                  }}</span>
                </div>
              </th>
              <th colspan="4" style="min-width: 110px; text-align: center">
                <div class="th-item">
                  <span class="table-text text-align-center">{{
                      infoEmployee.dob.toUpperCase()
                  }}</span>
                </div>
              </th>
              <th colspan="5" style="min-width: 90px">
                <div class="th-item">
                  <span class="table-text text-align-center">{{
                      infoEmployee.gender.toUpperCase()
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
              <th colspan="8" style="min-width: 150px">
                <div class="th-item">
                  <span class="table-text text-align-center">{{
                      infoEmployee.department.toUpperCase()
                  }}</span>
                </div>
              </th>
              <th colspan="9" style="min-width: 100px">
                <div class="th-item">
                  <span class="table-text text-align-center">{{ infoEmployee.bankAccount.toUpperCase() }}
                  </span>
                </div>
              </th>
              <th colspan="10" style="min-width: 150px">
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
            <tr v-for="employee in employees" @dblclick="editOnclick(employee)" :key="employee.EmployeeId"
              @click="rowOnclick(employee)">
              <td class="checkbox sticky-left" style="text-align: center" colspan="1">
                <input @click="check(employee)" class="check-item" type="checkbox" style="width: 18px; height: 18px" />
              </td>
              <td colspan="2">
                <div class="td-item">
                  <span class="table-text text-align-center">{{
                      employee.employeeCode
                  }}</span>
                </div>
              </td>
              <td colspan="3">
                <div class="td-item">
                  <span class="table-text">{{ employee.employeeName }}</span>
                </div>
              </td>
              <td colspan="4" style="text-align: center">
                <div class="td-item">
                  <span class="table-text text-align-center">{{
                      formatDate(employee.dateOfBirth)
                  }}</span>
                </div>
              </td>
              <td colspan="5">
                <div class="td-item">
                  <span class="table-text">{{formatGender(employee.gender)  }}</span>
                </div>
              </td>
              <td colspan="6">
                <div class="td-item">
                  <span class="table-text">{{ employee.identityNumber }}</span>
                </div>
              </td>
              <td colspan="7">
                <div class="td-item">
                  <span class="table-text">{{ employee.positionName }}</span>
                </div>
              </td>
              <td colspan="8">
                <div class="td-item">
                  <span class="table-text">{{ employee.departmentName }}</span>
                </div>
              </td>
              <td colspan="9">
                <div class="td-item">
                  <span class="table-text">{{employee.bankAccount}}</span>
                </div>
              </td>
              <td colspan="10">
                <div class="td-item">
                  <span class="table-text">{{employee.bankName}}</span>
                </div>
              </td>
              <td colspan="11">
                <div class="td-item">
                  <span class="table-text">{{employee.bankBranch}} </span>
                </div>
              </td>
              <td class="td-item-final td-func sticky-right" style="position: sticky; right: 0; background-color: #fff"
                colspan="12">
                <div @click="editOnclick(employee)" class="edit-text">
                  {{ btn.editBtn }}
                </div>
                <div class="btnMenu" @click="showMenu" id="btnMenu" ref="btnMenu">
                  <div class="icon-down" style="border: none; z-index: -1"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="paging">
        <div class="paging-left">
          {{ infoEmployee.total }}:
          <strong>{{ pageDefault }}/{{ totalRecord }}</strong>
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
                <div class="item-dropup" :class="{act: isActive=== '10'}"  pageSize="10" :value="pageDefault" @click="getPageDefault">
                  10 {{ infoEmployee.pageSize }}
                </div>
                <div class="item-dropup" :class="{act: isActive=='20'}" pageSize="20" @click="getPageDefault">
                  20 {{ infoEmployee.pageSize }}
                </div>
                <div class="item-dropup" :class="{act: isActive=='30'}" pageSize="30" @click="getPageDefault">
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
  <EmployeeDetail v-show="isShowEmployeeDetail" :showDialog="isShowEmployeeDetail" @showDialog="functionShowDialog"
    :employeeDetail="employeeSelected" :employeeSelectedId="employeeId" :newEmployeeCode="newCode"
    :formMode="formModeDetail"  :code="empCode" :employeeCode="employeeCode"
    :addOnclick="btnAddOnClick" :loadData="filterEmployee" />
  
  <popup v-show="isShowPopup"></popup>
</template>
<style>
@import url("../../css/base/main.css");

.pagination {
  margin-left: 20px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #111;
  font-size: 13px;
}
.act{
  background-color: green;
  color:#fff;
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
</style>
<script>

import Paginate from "vuejs-paginate-next";
import info from "../../Locale/LocaleTableEmployee";
import btn from "../../Locale/LocaleButton";
import EmployeeDetail from "./TheEmployeeDetail.vue";
import LoadData from "../../components/Base/BaseLoading.vue";
import DropFunction from "../Base/BaseFuncDrop.vue";
import $ from "jquery";
import axios from "axios";
import popup from "../Base/BasePopup.vue";



export default {
  components: {
    EmployeeDetail,
    LoadData,
    DropFunction,
    Paginate,
    popup,
  },

  data() {
    return {
      isActive: "10",
      pageNumber: 1,
      page: 1,
      totalPage: 0,
      totalRecord: 0,
      btn: btn,
      infoEmployee: info,
      employeeDelete: {},
      btnEdit: "",
      isShowMenu: false,
      txtSearch: "",
      loading: false,
      formModeDetail: 1,
      employeeId: null,
      isShowDrop: false,
      isShow: false,
      newCode: null,
      isShowEmployeeDetail: false,
      employeeSelected: {},
      date: null,
      employees: [],
      pageDefault: 10,
      emplyeeCode: "",
      isShowPopup: false,
      empCode: [],
      listEmployeeID: [],
      arrGender:[],
      gender:"",
      
    };
  },
  /**
   * lấy dữ liệu hiện lên bảng
   */
  created() {
    
    this.filterEmployee();
    // $(window).click(function (e) {
    //   const btnMenuList = document.getElementsByClassName('btnMenu')
    //   btnMenuList.forEach(item=>{
    //     if(!item.contains((e.target))){
    //        me.clickOutsideMenu()
    //     }
    //   })

    // })
    
      
    
 
  },

  watch: {
    pageDefault: function () {
      this.filterEmployee();
    },
    
  },
  


  methods: {
   
    popup() {
      this.showPopup(true);
      setTimeout(() => {
        this.showPopup(false);
      }, 3000);
    },
    showPopup(value) {
      this.isShowPopup = value;
    },
   
    /**
     * tìm kiếm
     * AUTHOR: HTTHOA (19/08/2022)
     */
    btnSearch() {
      this.$refs.txtSearch.focus();
      this.filterEmployee();
    },

    clickOutsideMenu() {
      this.showDropMenu(false);
      this.showPopup(true);
    },
    
    

    /**
     *
     * @param {hiển thị vị trí dropdown chức năng xóa} e
     * AUTHOR: HTTHOA (11/08/2022)
     */
    showMenu(e) {
      // if (this.btnEdit !== "" || this.showDropMenu(false)) {
      //   this.btnEdit.classList.toggle("border-blue");
      // }
      // this.btnEdit = e.target;
      // this.btnEdit.classList.add("border-blue");
       let position = $(e.target)[0].getBoundingClientRect();
      console.log(position);
      var top = position.top;
      var left = position.left;
      $(".listFunction").css("top", top - 20 + "px");
      $(".listFunction").css("left", left - 270 + "px");
     
     this.showDropMenu(true)
      
    },
    

    /**
     * hiển thị chức năng nhân bản, xóa,...
     * AUTHOR: HTTHOA(11/08/2022)
     *
     */
    showDropMenu(value) {
      this.isShowMenu = value;
      
    },
    hideDropMenu(value){
    
      this.isShowMenu=value;
        this.filterEmployee(value)
    },
    
    /**
     * xử lý sự kiện button add
     * AUTHOR: HTTHOA(05/08/2022)
     */
    btnAddOnClick() {
      this.formModeDetail = 1;
      this.employeeSelected = {};
      this.employeeId = null;
      this.functionShowDialog(true);
    
      this.newCode = {};
      this.getNewEmployeeCode();
    },
    /**
     *
     * Hiển thị form chi tiết
     * AUTHOR: HTTHOA(05/08/2022)
     */
    functionShowDialog(value) {
      this.filterEmployee();
      this.isShowEmployeeDetail = value;
    },
    /**
     *
     * lấy dữ liệu khi click vào hàng
     * AUTHOR: HTTHOA(11/08/2022)
     */
    rowOnclick(employee) {
      this.employeeDelete = employee;
      this.employeeId = employee.employeeID;
      this.emplyeeCode = employee.employeeCode;
     
    },
    /**
     * hiển thị dữ liệu khi click vào sửa
     * AUTHOR: HTTHOA(08/08/2022)
     */
    editOnclick(employee) {
      this.formModeDetail = 0;
      this.functionShowDialog(true);
      this.employeeSelected = employee;
      this.employeeId = employee.employeeID;
      this.filterEmployee()
      
    },
    check(employee) {
      if ($(".check-item").is(":checked")) {
        this.employeeId = employee.employeeID;
        console.log(this.employeeId);
        this.listEmployeeID.push(employee.EmployeeId);
      }

      console.log(this.listEmployeeID);
    },

    checkAll() {
      this.listEmployeeID = [];
      if ($(".check-all").is(":checked")) {
        for (var emp of this.employees) {
          this.listEmployeeID.push(emp.EmployeeId);
          $(".check-item").is(":checked");
        }
      } else {
        this.listEmployeeID = [];
      }

      console.log(this.listEmployeeID);
    },
    /**
     * hàm hiện dropup
     * AUTHOR: HTTHOA(06/08/2022)
     */
    btnDropUp() {
      $(".icon-dropup").toggleClass("iconrotate");
      if (!this.isShow) {
        this.showPage(true);
      } else {
        this.showPage(false);
      }
    },
    /**
     *
     * @param {hiển thị paging} is
     *  AUTHOR: HTTHOA(05/08/2022)
     */
    showPage(is) {
      this.isShow = is;
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
          me.newCode = res.data;
          console.log(me.newCode);
        })
        .catch(function (response) {
          console.log(response);
        });
    },
    /**
     *
     * @param {show biểu tượng load} is
     */
    showLoading(value) {
      this.loading = value;
    },
    /**
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive=e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
   
      console.log(this.pageDefault);
      this.showPage(false);
     
      this.filterEmployee();
      if (this.pageDefault > this.totalRecord) {
        this.pageDefault = this.totalRecord;
      }
    },
    /**
     * format Date
     * AUTHOR: HTTHOA(05/08/2022)
     */
    formatDate(Dob) {
      if (Dob) {
        Dob = new Date(Dob);
        let date = Dob.getDate();
        date = date < 10 ? `0${date}` : date;
        let Month = Dob.getMonth() + 1;
        Month = Month < 10 ? `0${Month}` : Month;
        let year = Dob.getFullYear();
        Dob = `${date}/${Month}/${year}`;
      } else {
        Dob = "";
      }
      return Dob;
    },

     formatGender(gender){
      
      switch(gender){
        case 0:
          gender="Nam";
          break;
        case 1:
         gender="Nữ";
          break;
        case 2:
          gender="Khác";
          break;
         default:
         gender="";
      }
   return gender;

    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.filterEmployee();
    },
    /**
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/08/2022)
     */
    filterEmployee() {
     
      var me = this;

      this.showLoading(true);
      axios
        .get(`http://localhost:3131/api/v1/Employees/Filter?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`)
        .then(function (res) {
          me.totalPage = res.data.totalPages;
          me.totalRecord = res.data.totalRecords;
          me.employees = res.data.data;
         console.log(res.data.data)
        for(var emp of res.data.data){
          me.arrGender.push(emp.gender)
        }

  
       
        console.log(me.arrGender)
          
        })
        .then(function () {
          me.showLoading(false);
        })
        .catch(function () {});
    },
  },
};
</script>
