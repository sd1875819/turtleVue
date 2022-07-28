import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',  /*该处的'/'就是主页,表示启动时展示的页面地址*/
    name: 'home',
    component: HomeView   /*指定访问path配置的地址时对应打开的页面是哪个，如果path配置为'/home'，则后台启动后需要访问localhost:8081/home地址才能访问到该页面*/
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

/*
路由文件：配置各页面与对应访问地址的映射
*/
