<template>
  <div>
    <!--页面头部-->
    <Header/>
    <!--页面主体-->
    <div style="display: flex">
      <!--页面主体的左侧菜边栏-->
      <Aside/>
      <!--页面主体的右侧页面内容-->
      <router-view style="flex: 1"></router-view>
    </div>
  </div>
</template>

<style>

</style>

<script>
  import Header from "@/components/Header";
  import Aside from "@/components/Aside";

  export default{
    name:"Layout",
    components:{
      Aside,
      Header
    }
  }
</script>

<!--<template>标签是在页面上对各组件进行布局-->
<!--<script>标签是将定义的组件Header导入到总布局文件APP.vue中-->
