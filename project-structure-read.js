// 该文档主要用来说明该vue工程的结构及页面的实现方案的总结，每个文件内也有详细的总结，可跟该文档结合学习vue工程的实现：

/*
*（1）工程启动的环境配置：
* a、安装node.js(支持npm命令)——> 执行npm install -g @vue/cli 安装vue/cli插件，此时安装的是vue3.0版本，用来创建vue工程——>执行命令：vue create 工程名 (创建新的vue工程)
* b、在Configuration中，先配置scripts的值为serve(因为该工程使用的是vue3.0版本，所以配置为serve启动，如果是vue2.0版本则是run)
*   b1、如果是下载的已有工程，则运行时可能会报错：sh: vue-cli-service: command not found。则执行sudo rm -rf node_modules package-lock.json 删除node_modules
* c、然后执行npm install，如果会卡住，则先执行npm config set registry https://registry.npm.taobao.org，然后再执行npm install安装资源包。
* d、配置完以上内容就可以通过点击运行或者在Terminal中直接使用命令行npm run serve启动工程了
*
* (2)工程结构：
* a、assets文件夹中存放静态资源：css、工具js等， request.js封装了axios数据访问的插件，前端要发起get、post等请求时就可以直接调用request.xxx即可
* b、components文件夹中组件
* c、router文件夹中存放路由配置文件index.js（将路径跟页面做映射，通过路径访问页面）
* d、store文件夹中定义页面的变量，页面跳转携带的参数、临时存储数据等
* e、views文件夹中存放视图存储位置
* f、main.js文件是各种配置项的引入，类似java工程的pom文件
* g、vue.config.js文件是跨域文件，解决前端请求对应的服务端接口的跨域问题
* h、package.json文件是记录项目中所有依赖的组件，通过该文件下载引入。  "scripts": 中配置工程启动("vue-cli-service serve --open" 可自动打开浏览器页面)
*
*（3）工程实现结构：
* a、先安装Element-plus组件库，然后再main.js中引入该组件库即可在页面各个地方使用组件库里的各种组件
* b、在components中编辑页面的一些页面公共组件，比如顶部导航栏Header.vue、侧边栏Aside.vue。这两个组件在每个页面都会引用到所以抽离出来放在components中；
* c、在App.vue作为根节点，可以访问整个后台所有页面，包括登陆/注册、业务主页面
* d、在Loyout中设置业务主页面布局，用于访问主业务页面
* e、views中实现每个页面具体的布局
* f、然后在路由文件index.js中配置每个页面对应的访问地址
*
*（4）具体的页面实现，布局+数据
* (以User.vue页面为例，该页面实现了添加用户信息及分页查询展示用户信息，同时支持通过昵称搜索用户信息的功能):
*a、整个页面分几个组成部分：
*   <template>页面组件布局
*       <div>划分出一个行区域，<div>前后会自动设置换行符，div前后放置的组件会自动换行，不与div在同一行</div>
*   </template>
*   <script>各组件的js行为，包括数据、方法的的定义、
*       data() {定义页面各个组件使用到的所有数据变量及数据对象等},
*       created() {页面刷新时自动调用的方法},
*       methods: {定义并实现页面各个组件交互时调用的所有方法，包括发网络请求、给data中定义的数据变量对对象赋值等}
*   </script>
*
* b、User.vue是学习搭建的页面，Book页面完全copy的User页面，只是个别组件的使用不太一样而已
*
*
*（5）遗留问题：
* a、引用参数时的this是怎么用的；——已解决（return中定义的参数都使用this.xxx形式调用）
* b、跨域配置中的拦截器没有生效
* c、组件中的v-model双向绑定的原理，以及什么组件场景使用
* d、无子导航栏的一级导航栏实现、导航栏icon添加、导航栏与页面的关联——已解决
* e、重定向未生效，需要再学习
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* */


