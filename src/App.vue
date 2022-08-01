<template>
  <div>
    <!--<router-view>表示对后台全局根结点的访问，router-view里既可以是登陆的界面、注册界面也可以是后台主体(带头部导航栏的界面，即Layout里的界面)，根据路由展示对应界面，当访问主体时要进行二次嵌套路由-->
    <router-view></router-view>
  </div>
</template>

<style>

</style>

<script>
  import Header from "@/components/Header";
  import Aside from "@/components/Aside";

  export default{
    name:"app",
  }
</script>

<!--<template>标签是在页面上对各组件进行布局-->
<!--<script>标签是将定义的组件Header导入到总布局文件APP.vue中-->
<!--
App.vue页面在main.js中被引入后是作为creatApp的根结点使用的，所以App.vue是全局的根结点，用于承接整个后台内容的。
从而不适合作为后台框架使用，所以要把App.vue里涉及框架的内容挪到新建的Layout.vue中，App.vue负责访问所有的页面，而不仅仅是框架页面
-->
