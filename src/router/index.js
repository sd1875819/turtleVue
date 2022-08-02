import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',  /*表示如果访问http://localhost:8081/就会跳转到layout.vue界面*/
    name: 'Layout',
    component: Layout,   /*指定访问path配置的地址时对应打开的页面是哪个，如果访问/则打开的是Layout布局文件，只有头部跟侧边栏的页面*/
    redirect: "/home",  /*路由重定向，当访问/时，会自动重定向到/home地址上，这样就实现了项目启动后自动打开/home的页面，避免了上一步的只访问Layout布局文件*/
    /*children里放嵌套路由*/
    children: [  /*嵌套路由就是访问上一层里的path+children里的path就可以访问children里component指定的页面嵌套到上一层的component页面里的总页面了，即包含了头部、侧边栏即主体的页面*/
        {
          path: 'home',   /*这样就可以通过/home访问HomeView页面了*/
          name: 'Home',
          component: () => import("@/views/HomeView"),  /*，该处是导入页面的另外一种方式，将HomeView界面进行二次路由导入*/
        }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

/*
路由文件：配置各页面与对应访问地址的映射
*/
