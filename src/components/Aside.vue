<template>
  <div>
    <!--
      1、<el-menu>是菜单标签，里面可以包括：<el-submenu>和<el-menu-item>。
      2、<el-submenu>是子菜单标签，里面可以包括：<el-menu-item>。
      3、<el-menu-item>是最低级的菜单项，可以被前两者包含。
    -->
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="path"
        router
        class="el-menu-vertical-demo" >
      <!--default-active表示设置默认打开哪个index值的导航栏对应的页面-->
      <!--该处加一个router属性，即可给侧边栏添加对应的路由-->
        <el-sub-menu index="1">  <!--当有子导航栏时，父类导航栏用el-sub-menu，子导航栏用el-menu-item-->
          <template #title> <!-- template 标签是用来控制submenu对应的一级导航栏内容的显示-->
            <i class="el-icon-location"></i>  <!--<i>里放置导航栏的图标-->
            <span>系统管理</span> <!--<span>是一级导航栏里导航栏标题的展示-->
          </template>
          <el-menu-item index="/user">用户管理</el-menu-item>   <!--index是用来区分el-menu-item 的索引，类似每个导航栏的id。:route是用来绑定跳转页面的,上面统一添加了router属性，该处就不用route了-->
        </el-sub-menu>
      <el-menu-item index="/book">书籍管理</el-menu-item> <!--没有子菜单的一级菜单，直接用el-menu-item,该处的index就是路由，与index里的path对应-->
    </el-menu>
  </div>

</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      path: this.$route.path  /*设置默认高亮的菜单*/
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
