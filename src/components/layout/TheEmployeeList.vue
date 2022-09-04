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
        <button class="action-multiple" @click="btnDeleteMultiple">Thực hiện hàng loạt</button>
        <div class="main-header-right">
           <input v-model="txtSearch" @keyup.enter="btnSearch" ref="txtsearch" class="icon-search" type="text"
          :placeholder="infoEmployee.search" />
        <div title="lấy lại dữ liệu" id="refresh" @click="filterEmployee" class="icon-refresh">
          <span id="" class="icon-refresh"> </span>
        </div>
        <div title="xuất ra excel" id="excel" @click="getExcel" class="icon-excel">
          <span id="" :myData="filterEmployee"  class="icon-excel" > </span>
        </div>
        </div>
       
      </div>

      <div id="m-table" class="m-table">
        <DropFunction v-show="isShowMenu" :empDeleteCode="emplyeeCode"
          @closeDrop="hideDropMenu"   :employeeDetails="employeeSelected" :employeeDeleteId="employeeId"
          :emplyeeCode="employeeCode" :loadData="filterEmployee" :newEmployeeCode="newCode"></DropFunction>

        <table id="tbEmployee" class="table">
          <thead>
            <tr >
              <th class="sticky-left-top checkbox" colspan="1" style="min-width: 30px !important; text-align: center">
                <input @click="checkAll" ref="checkall" type="checkBox" class="check-all" style="width: 18px; height: 18px" />
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
              <th colspan="4" style="min-width: 151px; text-align: center">
                <div class="th-item">
                  <span class="table-text text-align-center">{{
                      infoEmployee.dob.toUpperCase()
                  }}</span>
                </div>
              </th>
              <th colspan="5" style="min-width: 126px">
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
            <tr ref="row" v-for="employee in employees" @dblclick="editOnclick(employee)" :key="employee.EmployeeId"
              @click="rowOnclick(employee)">
              <td ref="rowCheck" class="checkbox sticky-left"  style="text-align: center" colspan="1">
                <input @click="check(employee)" ref="check" class="check-item" type="checkbox" style="width: 18px; height: 18px" />
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
              <td ref="func" class="td-item-final td-func sticky-right"  style="position: sticky; right: 0; background-color: #fff"
                colspan="12">
                <div @click="editOnclick(employee)" class="edit-text">
                  {{ btn.editBtn }}
                </div>
                <div ref="btnMenu" class="btnMenu" @click="showMenu" >
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
              <div class="icon-dropup" @click="btnDropUp" ></div>
              <div class="item-up" v-show="isShow" v-clickoutside="hidePaging">
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
  <MsgDelete v-show="isShowMsgDelete" @noDelete="showMsgDelete" @delete="deleteMultipleEmployee"></MsgDelete>
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
import MsgDelete from "../Base/BaseMsgDelete.vue";
import { useToast } from "vue-toastification";

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
 
  components: {
    EmployeeDetail,
    LoadData,
    DropFunction,
    Paginate,
    MsgDelete
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
      isShowMsgDelete: false,
      empCode: [],
      listEmployeeID: [],
      arrGender:[],
      gender:"",
      isSuccess:false 
  
      
    };
  },
  /**
   * lấy dữ liệu hiện lên bảng
   * AUTHOR: HTTHOA(20/08/2022)
   */
  created() {
    
    this.filterEmployee();
    
   
  },
  mounted(){
    /**
     * click ra ngoài đóng menu function
     * AUTHOR: HTTHOA(1/09/2022)
     */
    let me = this;
    $(window).click(function (e) {
      if($(e.target).attr("class") !== "btnMenu" && $(e.target).attr("class")!=="item-func"){
           me.clickOutsideMenu()
        }
        
    })
  },

  watch: {
     /**
     * theo dõi khi chọn bản ghi trên 1 trang  thì lấy lại dữ liệu
     * AUTHOR: HTTHOA(20/08/2022)
     */
    pageDefault: function () {
      this.filterEmployee();
    },
     /**
     * theo dõi ô input khi người dùng nhập keyword
     * AUTHOR: HTTHOA(20/08/2022)
     */
    txtSearch: function(){
     console.log(this.txtSearch)
     if(this.txtSearch==""){
      this.filterEmployee();
     }
      }
  },
  methods: {
    /**
     * tìm kiếm
     * AUTHOR: HTTHOA (19/08/2022)
     */
    btnSearch() {
      this.filterEmployee();
    },
     /**
     * hàm ẩn menu 
     * AUTHOR: HTTHOA(1/09/2022)
     */
    clickOutsideMenu() {
    this.isShowMenu=false
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
      var btnMenu= this.$refs.btnMenu;
       let position = $(e.target)[0].getBoundingClientRect();
      var top = position.top;
      var left = position.left;
      $(".listFunction").css("top", top - 20 + "px");
      $(".listFunction").css("left", left - 270 + "px");
       
        
          if (!this.isShowMenu ) {
          this.showDropMenu(true)
        }
     
      else {
        this.showDropMenu(false)
  
    }  
    },
    

    /**
     * hiển thị chức năng nhân bản, xóa,...
     * AUTHOR: HTTHOA(11/08/2022)
     *
     */
    showDropMenu(value) {
      this.isShowMenu = value;
      
    },
     /**
     * hàm ẩn drop menu
     * AUTHOR: HTTHOA(1/09/2022)
     */
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
      this.employeeSelected = employee;
     
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
     /**
     * show confirm xóa
     * AUTHOR: HTTHOA(2/09/2022)
     */
    showMsgDelete(value){
    this.isShowMsgDelete=value
   },
    /**
     * nhấn nút thực hiện hàng loạt để hiện msg confirm xóa
     * AUTHOR: HTTHOA(2/09/2022)
     */
   btnDeleteMultiple(){
    if(this.listEmployeeID.length >0){
      this.showMsgDelete(true)
    }

   },
    /**
     * hàm api xóa hàng loạt employee
     * AUTHOR: HTTHOA (2/09/2022)
     */
     deleteMultipleEmployee() {
      const toast = useToast();
      var me= this;
        axios
        .put("http://localhost:3131/api/v1/Employees/Multiple?ListId=",this.listEmployeeID)
       
        .then(function(){
          me.showMsgDelete(false)
          toast.warning("Xóa nhân viên thành công", { timeout: 2000 });
          me.filterEmployee()
        })
        .catch(function () {});     
        
    },
    /**
     * xử lý check từng hàng khi tích vào ô check box 
     * AUTHOR: HTTHOA(30/08/2022)
     */
    check() {
      this.listEmployeeID = [];
      var listCheck=this.$refs.check;
      var rowCheck= this.$refs.row;
      var funcCheck = this.$refs.func;
      var check= this.$refs.rowCheck;
      var listEmp=[];
      for (var emp of this.employees) {
       listEmp.push(emp.employeeID)
      
      }
      console.log(funcCheck.length)
      for(var i=0; i < listCheck.length; i++ ){
         this.listEmployeeID.unshift(listEmp[i]); 
        if (listCheck[i].checked==true) {      
          rowCheck[i].classList.add("row-active")
          check[i].classList.add("row-active")
          funcCheck[i].classList.add("row-active")
         
        
     }else{
      this.listEmployeeID.splice(listEmp[i],1)
        rowCheck[i].classList.remove("row-active")
          check[i].classList.remove("row-active")
          funcCheck[i].classList.remove("row-active")
     }

      }
      console.log(this.listEmployeeID);
    },
   
  
    /**
     * xử lý check tất cả các hàng khi tích vào ô check box đầu tiên
     * AUTHOR: HTTHOA(30/08/2022)
     */
    checkAll() {
      var rowCheck= this.$refs.row;
      var funcCheck = this.$refs.func;
      var check= this.$refs.rowCheck;
      this.listEmployeeID = [];
      var listCheck=this.$refs.check;
      if (this.$refs.checkall.checked) { 
        for(let i=0; i< listCheck.length; i++){
          listCheck[i].checked=true
          rowCheck[i].classList.add("row-active")
          check[i].classList.add("row-active")
          funcCheck[i].classList.add("row-active")
        }     
        for (var emp of this.employees) {
               
          this.listEmployeeID.push(emp.employeeID);        
        }
      } else {
        for(let i=0; i< listCheck.length; i++){
          listCheck[i].checked=false
          rowCheck[i].classList.remove("row-active")
          check[i].classList.remove("row-active")
          funcCheck[i].classList.remove("row-active")
        }   
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
    hidePaging(){
      this.isShow=false
      $(".icon-dropup").removeClass("iconrotate");
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
     * mở file excel trong tab mới để tải
     * AUTHOR: HTTHOA(1/09/2022)
     */
    getExcel(){
      window.open("http://localhost:3131/api/v1/Employees/exportExcel","Xuất file excel")

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
     * show biểu tượng loading 
     * AUTHOR: HTTHOA(06/08/2022)
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
      $(".icon-dropup").removeClass("iconrotate");
     
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
        let month = Dob.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = Dob.getFullYear();
        Dob =  `${year}-${month}-${date}`;
        
      } else {
        Dob = "";
      }
      return Dob;
    },
    /**
     * hiển thị giới tính từ 0,1,2 sang nam, nữ, khác trên bảng
     * AUTHOR: HTTHOA(20/08/2022)
     */
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
        })
        .then(function () {
          me.showLoading(false);
        })
        .catch(function () {});
    },
  },
};
</script>
