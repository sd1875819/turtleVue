import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

createApp(App).use(store).use(router).use(ElementPlus).use(ElementPlus, {locale: zhCn, size: 'mini'}).mount('#app')

/*各种第三方组件的引入，类似java的pom文件。先import，然后再use一下即可*/
