import {createApp }from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import OverView from './components/layout/TheOverView.vue'
import EmployeeList from './components/layout/TheEmployeeList.vue'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vClickOutside from 'v-click-outside'




const routes = [
    { path: '/overview', component: OverView },
    { path: '/cash', component: EmployeeList },
  
  ]
  library.add(faHatWizard);
  createApp(App).component('font-awesome-icon', FontAwesomeIcon)
  const router = createRouter({
    
    history:createWebHistory(),
    routes, 
    linkActiveClass:'active',
    
  })
 

  createApp(App).use(vClickOutside)
  createApp(App).use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    icon: true,
    position: "top-center",
  });

 
 
createApp(App).use(router).mount('#app')
