import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',  /*'/'符号表示根目录，path里带该符号的都是直接拼接到http://localhost:8081后面使用的*/
    redirect: "/home",  /*redirect是路由重定向，表示当访问带'/'根目录前台地址时，会自动重定向到/home地址上，这样就实现了项目启动后自动打开路由配置为/home里component指定的页面*/
  },
  {
    path: '/home',
    name: 'HomeView',
    component: Layout,
    /*children里放嵌套路由，即将chileren里component指定的HomeView页面嵌套到上一层路由/home里的component指定的Layout框架页面里，
    即Layout是布局好了头部、侧边栏并且给主页面预留了位置(见Layout.vue文件备注)，该处嵌套的意识就是把主页面放到Layout框架页里的预留位置处进行统一展示*/
    children: [  /*嵌套路由就是访问上一层里的path+children里的path就可以访问children里component指定的页面嵌套到上一层的component页面里的总页面了，即包含了头部、侧边栏即主体的页面*/
      {
        /*注意，嵌套路由里不需要再加'/'，该处加上'/'后就变成根目录了，就跟上一层的/home平级，
        该处我们是需要将HomeView页面嵌套到上一层路由/home指定的Layout框架页中：通过http://localhost:8081/home/homeView访问页面
        但是该处有个疑问，该处写成path: '/homeView'后，通过访问http://localhost:8081/homeView也是可以将homeView嵌套到Layout框架页中正常显示*/
        path: 'homeView',
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
