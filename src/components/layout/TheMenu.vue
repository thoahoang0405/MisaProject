<template>
    <div class="menu">
        <div class="menu-header">
            <div class="menu-header-sidebar"></div>
            <div class="menu-header-logo"></div>

        </div>
        <div class="menu-body">
            <router-link to="/overview" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-overview"></div>
                <div class="menu-item-text">{{menuItem.overview}}</div>
            </router-link>
            <router-link to="/cash" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-cash"></div>
                <div class="menu-item-text">{{menuItem.cash}}</div>
            </router-link>
           <router-link to="/deposit" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-deposit"></div>
                <div class="menu-item-text">{{menuItem.deposit}}</div>
           </router-link>
           <router-link to="/order" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-order"></div>
                <div class="menu-item-text">{{menuItem.order}}</div>
           </router-link>
           <router-link to="/cart" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-cart"></div>
                <div class="menu-item-text">{{menuItem.cart}}</div>
           </router-link>
           <router-link to="/bill" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-bill"></div>
                <div class="menu-item-text">{{menuItem.bill}}</div>
           </router-link>
           <router-link to="/store" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-store"></div>
                <div class="menu-item-text">{{menuItem.store}}</div>
           </router-link>
           <router-link to="/tool" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-tool"></div>
                <div class="menu-item-text">{{menuItem.tool}}</div>
           </router-link>
           <router-link to="/asset" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-asset"></div>
                <div class="menu-item-text">{{menuItem.asset}}</div>
           </router-link>
           <router-link to="/tax" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-tax"></div>
                <div class="menu-item-text">{{menuItem.tax}}</div>
           </router-link>
           <router-link to="/price" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-price"></div>
                <div class="menu-item-text">{{menuItem.price}}</div>
           </router-link>
           <router-link to="/total" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-total"></div>
                <div class="menu-item-text">{{menuItem.total}}</div>
           </router-link>
           <router-link to="/budget" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-budget"></div>
                <div class="menu-item-text">{{menuItem.budget}}</div>
           </router-link>
           <router-link to="/report" class="menu-body-item nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-report"></div>
                <div class="menu-item-text">{{menuItem.report}}</div>
           </router-link>
            <router-link to="/fina" class="menu-body-item mr-bottom nav-link" 
                style=" text-decoration: none !important;">
                <div class="menu-item-fina"></div>
                <div class="menu-item-text">{{menuItem.fina}}</div>
            </router-link>
        </div>
    </div>
  
</template>
<style >
@font-face {
    font-family: misa_font bold;
    src: url(../../assets/fonts/notosans-bold.3ede5aff.woff2);
}
a.active{
     border-left: 5px solid #2f9d22 ;
    background-color: rgba(104, 102, 102, 0.5);
    color: #fff;
    font-family: misa_font bold;

}
 a.active .menu-item-overview{
     background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -33px -1587px;
	width: 18px;
	height: 20px;

}


@import url('../../css/base/menu.css');

</style>
<script>
import $ from 'jquery'
import MenuItem  from "../../Locale/LocaleMenu.js";



export default {  
    data() {
        return {
           
          menuItem:MenuItem,
            activeId:0
        }
    },
    methods: {
       
        
    }
}
</script>