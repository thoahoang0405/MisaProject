import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import OverView from './components/layout/TheOverView.vue'
import EmployeeList from './components/layout/TheEmployeeList.vue'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";






const routes = [
  { path: '/overview', component: OverView },
  { path: '/cash', component: EmployeeList },

]

const router = createRouter({

  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',

})
createApp(App).use(elementPlus)
createApp(App).use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  icon: true,
  position: "top-center",
});



createApp(App).use(router).mount('#app')
