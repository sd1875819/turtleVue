<template>
  <div>
    <!--页面头部-->
    <Header/>
    <!--页面主体-->
    <div style="display: flex">
      <!--页面主体的左侧菜边栏-->
      <Aside/>

    </div>
  </div>

</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "Layout",
  components:{
    Aside,
    Header
  }
}
</script>

<style scoped>

</style>

<!--
该文件就是框架页面，即包含头部、侧边栏及页面主体(主体中就是各种页面的切换),
所以把之前App.vue里的头部、侧边栏及主体部分放到这里来，App.vue里只保留对后台所有页面访问的能力
-->
