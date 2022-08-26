<template>
    <div class="header">
      
         <div class="header-left">
                <div class="menu-icon">
                </div>
                <div class="header-select">
                    <select name="" id="select-header">
                        <option value="">{{header.compName}}</option>
                        <option value="">{{header.compName}}</option>
                    </select>
                </div>
            </div>
            <div class="header-right">
                <div class="notice-icon"></div>
          
                <div class="avatar-icon"></div>
                <div class="name-user">{{header.userName}}</div>
                <div class="drop-icon"></div>
            </div>
        </div>
</template>
<style scoped>
@import url('../../css/base/header.css');
</style>
<script>
import header from "../../Locale/LocaleHeader"
export default{
    data(){
        return{
            header:header
        }
    }
}
</script>