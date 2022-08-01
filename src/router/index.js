import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',  /*表示如果访问http://localhost:8081/就会跳转到layout.vue界面*/
    name: 'Layout',
    component: Layout,   /*指定访问path配置的地址时对应打开的页面是哪个，如果path配置为'/home'，则后台启动后需要访问localhost:8081/home地址才能访问到该页面*/
    /*children里放嵌套路由*/
    children: [

        {
          path: 'home',   /*这样就可以通过/home访问HomeView页面了*/
          name: 'Home',
          component: () => import("@/views/HomeView"),  /*，该处是导入页面的另外一种方式，将HomeView界面进行二次路由导入*/
        }
    ]
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
