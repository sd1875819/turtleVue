import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

createApp(App).use(store).use(router).use(ElementPlus).use(ElementPlus, {locale: zhCn, size: 'mini'}).mount('#app')

/*main.js是工程入口文件,主要作用是初始化vue实例,并引入所需要的插件，类似java的Application文件。*/
/*初始化的方式是先import，然后再use一下即可*/
