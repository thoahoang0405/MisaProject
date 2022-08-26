<template>
    <div id="dl-code-exist">
        <div class="dialog-code-exist">
            <div class="tille-exist">
                <div class="icon-exist"></div>
                <div class="text-exist ">Mã nhân
                    viên {{ MsgExist }} đã tồn tại trong hệ thống vui lòng kiểm tra lại.</div>
            </div>

            <div class="footer-exist">
                <button @click="closeMsg" class="btn-close-exist">{{ btn.btnAgr }}</button>
            </div>
        </div>
    </div>

</template>


<style >
@import url('../../css/form/dialog.css');

.icon-exist {
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -598px -463px;
    width: 60px;
    height: 37px;

    margin-left: 20px;
    margin-top: 10px;
}

.footer-exist {
    display: flex;
    justify-content: flex-end;
}

hr {
    margin: 10px 20px;
}

.btn-close-exist {
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #2f9d22;
    min-width: 90px;
    border: none;
    padding: 10px;
   
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}

.btn-close-exist:hover {
    background-color: #35bf22;

}

#dl-code-exist {

    width: 100%;
    /* left: -1200px; */

    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-code-exist {
    width: 444px;
    height: auto;
    background-color: #fff;
    color: #000;
    /* margin-left: -100px; */
    /* margin-top: -300px; */
    /* transform: translate(-50%, -50%); */
     margin: auto;
    z-index: 9;
    padding: 32px;


}

.tille-exist {
    display: flex;
    width: 100%;
    position: relative;
    padding: 20px 0px;

}

.text-exist {

    width: 100%;
    margin: 10px 10px;


}
</style>
<script>
import btn from "../../Locale/LocaleButton"
import msg from "../../Locale/LocaleMsg"
export default {
    watch: {
        Msg: function (value) {
            this.MsgExist = value
        }
    },
    props: ['Msg'],
    data() {
        return {
            btn: btn,
            msg: msg,
            MsgExist: '',
        }
    },
    methods: {
        closeMsg() {
            this.$emit('closeMsg', false)
        }
    }

}

</script>