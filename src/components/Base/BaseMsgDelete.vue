<template>
  <div id="dl-delete" @keyup.enter="btnYes">
    <div class="dialog-delete">
      <div class="title-delete">
        <div class="icon-exist"></div>
        <div class="text-delete">
          {{this.message}}
        </div>
      </div>
      <div class="footer-delete">
        <button @click="btnNo" class="btn-no-delete">{{ btn.btnNo }}</button>
        <button @click="btnYes" ref="btnYes" class="btn-yes-delete">{{ btn.btnYes }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import btn from "../../locales/LocaleButton";
import msg from "../../locales/LocaleMsg";
export default {
  data() {
    return {
      btn: btn,
      msg: msg,
      empCode: "",
    };
  },
  watch: {
    employeeCode: function (value) {
      this.empCode = value;
  
      
    },
  },
  props: ["employeeCode", "message"],
  methods: {
    btnYes() {
      this.$emit("delete", true);
    },
    btnNo() {
      this.$emit("noDelete", false);
    },
  },
};
</script>
<style>
@import url("../../assets/css/form/dialog.css");

.dialog-delete {
  width: 444px;
  height: auto;
  background-color: #fff;
  color: #000;
  padding: 32px;
  font-size: 13px;
  margin: auto;
}

#dl-delete {
  width: 100%;
  top: -160px;
  left: 0px;
  z-index: 7;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-delete {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 10px;
}

.btn-no-delete {
  background-color: #fff;
  border: 1px solid #bbb;
  min-width: 80px;
  padding: 10px;
  border-radius: 4px;
  height: 34px;
  cursor: pointer;
}

.btn-yes-delete:hover {
  background-color: #35bf22;
}

.btn-no-delete:hover {
  background-color: #ccc;
}

.btn-yes-delete {
  background-color: #2f9d22;
  min-width: 70px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 34px;
}

.title-delete {
  display: flex;
  width: 100%;
  position: relative;
  padding: 20px 0px;
  border-bottom: 1px solid #bbb;
}

.text-delete {
  margin-top: 20px;
}
</style>
