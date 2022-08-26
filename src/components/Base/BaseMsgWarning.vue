<template>
     <div id="dl-store-warning">
            <div class="dialog-store-warning">
                <div class="tille-exist">
                    <div class="icon-wanring"></div>
                    <div class="text-exist">{{msg.msgSave}}</div>
                </div>
                <div class="footer-warning">
                    <button @click="btnClickCancel" class="btn-cancel-warning">{{btn.btnCancel}}</button>
                    <div>
                        <button @click="btnClickNo" class="btn-no-warning">{{btn.btnNo}}</button>
                        <button @click="btnClickYes" class="btn-yes-warning">{{btn.btnYes}}</button>
                    </div>
                </div>
            </div>
        </div>
       
</template>

<script>
import btn from "../../Locale/LocaleButton"
import msg from "../../Locale/LocaleMsg"
export default {
    data(){
        return {
            btn: btn,
            msg:msg
        }
    },
    methods: {
        btnClickNo(){
            this.$emit('closeMsgWarn',false)
        },
         btnClickCancel(){
            this.$emit('cancelMsgWarn',false)
        },
        btnClickYes(){
             this.$emit('MsgWarn',false)

        }
    }

}

</script>
<style >



.dialog-store-warning{
    width: 444px;
    height: auto;
    background-color: #fff;
    color: #000;
    margin: auto;
    z-index: 9;
    padding: 32px;
}

#dl-store-warning
{
    width: 100%;
    /* left: -1200px; */
    
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.tille-exist {
    display: flex;
    width: 100%;
    position: relative;
    padding: 20px 0px;
    border-bottom: 2px solid #cccc;

}

.text-exist {

    width: 100%;
    margin: 4px 10px;
    padding-top: 2px;
   
}



.btn-cancel-warning:hover,
.btn-no-warning:hover
{
    background-color: #ccc;
    /* border: none; */
}
.icon-wanring{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -832px -462px;
    
	width: 48px;
	height: 48px;
    margin-right: 10px;
    margin-left: 12px;
}
.footer-warning{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.btn-cancel-warning{
    background-color: #fff;
    border: 1px solid #bbb;
    min-width: 70px;
    padding: 10px;
    border-radius: 4px;
    
    cursor: pointer;
    height: 34px;
    font-weight: bold;
}
.btn-no-warning{
    background-color: #fff;
    border: 1px solid #bbb;
    min-width: 90px;
    padding: 10px;
    border-radius: 4px;
    margin-left: 24px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 10px;
    height: 34px;
}
.btn-yes-warning{
    background-color: #2f9d22;
    min-width: 70px;
    padding: 10px;
    border: none;
    border-radius: 4px;
   
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    height: 34px;
}
.btn-yes-warning:hover {
    background-color: #35bf22;
}
</style>