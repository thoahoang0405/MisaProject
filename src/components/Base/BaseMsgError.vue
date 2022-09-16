<template>
  <div id="dl-store-error">
    <div class="dialog-store-error" @keyup.enter="btnCloseError">
      <div class="title-error" v-for="(msg, index) in Msg" :key="index">
        <div class="icon-error"></div>

        <div class="text-error">{{ msg }}</div>
      </div>
      <br />

      <hr style="margin: 20px 20px" />
      <div class="footer-error">
        <button @click="btnCloseError" class="btn-close-error">
          {{ btn.btnClose }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import btn from "../../locales/LocaleButton";
export default {
  props: ["nameRequired", "Msg"],
  data() {
    return {
      btn: btn,
    };
  },
  methods: {
    btnCloseError() {
      this.$emit("closeMsgError", false);
    },
  },
};
</script>
<style>
@import url("../../assets/css/form/dialog.css");

.dialog-store-error {
  width: 444px;
  height: auto;
  background-color: #fff;
  color: #000;
  padding: 32px;
  font-size: 13px;
  margin: auto;
}

#dl-store-error {
  width: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-error {
  display: flex;
  width: 100%;
  position: relative;
  padding-top: 10px;
}

.icon-error {
  background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -32px -962px;
  width: 32px;
  height: 32px;
  margin-left: 20px;
}

.text-error {
  margin-left: 15px;
  margin-top: 8px;
}

.footer-error {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.btn-close-error {
  background-color: #2f9d22;
  border: none;
  padding: 10px;
  min-width: 70px;
  height: 35px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn-close-error:hover {
  background-color: #35bf22;
}

.input-error {
  border: 1px solid red !important;
}
</style>
