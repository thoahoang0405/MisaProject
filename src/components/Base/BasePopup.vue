<template>

   <div class="toast" id="toast">
        <p class="toast__icon--done ">
            <span class="icon__done ">
               
                </span>
        </p>
        <p class="toast__text">
           {{msg}} !
        </p>
        <p id="icon__close--done" @click ="closePop" class="icon__close--done">
             
        
        </p>
     
       
    </div> 

 
</template>
<script>
export default{
    
    components: {

    },
data(){
    return {
        msg:'',
    }

    },
    props: ["msgPopup"],
    watch : {
        msgPopup :function(value){
            this.msg=value
        }
        
    },
    methods: {
        closePop(){
            this.$emit("closePopup", false)
        }

    }

}
</script>
<style>
/* #dl-store-warning
{
    width: 100%;
    /* left: -1200px; */
    
    /* z-index: 10;
    background-color: transparent;
    position: fixed;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center; */
/* }  */

.toast{
    height: 70px;
    border-radius: 4px;
    width: 400px;
    background-color: #fff;
    /* opacity:  16%; */
    position: absolute;
   margin-top: 42%;
   margin-left: 70%;
    z-index: 20;
   box-shadow: 4px 4px 5px  green;
    
  
}

.icon__done{
   


}
.toast__icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ee8888;
    position: absolute;
    margin-left: 16px;
   
    
}
.toast__icon--error {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #f7ce6e;
    position: absolute;
    margin-left: 16px;
    
   
    
}
.toast__icon--done {
    
    border-radius: 50%;
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -990px -462px;
	width: 36px;
	height: 36px;
    position: absolute;
    margin-left: 16px;
   margin-top: 16px;
    
   
    
}
.toast__icon--info {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #3982d6;
    position: absolute;
    margin-left: 16px;
    
   
    
}
.toast__text{
position: absolute;
   margin-left: 60px;
   padding-top: 24px;
   color: #000;
   font-size: 18px;
}
/* .icon__close{
    
    position: absolute;
    color:#ee8888;
    right: 8px;
}
.icon__close--error{
    
    position: absolute;
    color:#f7ce6e;
    right: 8px;
} */
.icon__close--done{
    background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -147px -147px;
	width: 18px;
	height: 18px;
    position: absolute;
   
    right: 20px;
    margin-top: 24px;

}

/* .icon__close--info{
    
    position: absolute;
    color:#3982d6;
    right: 8px;
} */
</style>
