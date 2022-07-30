<template>
  <div>
    <!--
      1、<el-menu>是菜单标签，里面可以包括：<el-submenu>和<el-menu-item>。
      2、<el-submenu>是子菜单标签，里面可以包括：<el-menu-item>。
      3、<el-menu-item>是最低级的菜单项，可以被前两者包含。
    -->
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="2"
        class="el-menu-vertical-demo"
    >
        <el-sub-menu index="1">  <!--当有子导航栏时，父类导航栏用el-sub-menu，子导航栏用el-menu-item-->
          <template #title> <!-- template 标签是用来控制submenu对应的一级导航栏内容的显示-->
            <i class="el-icon-location"></i>  <!--<i>里放置导航栏的图标-->
            <span>导航一</span> <!--<span>是一级导航栏里导航栏标题的展示-->
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>导航二</template>
        </el-sub-menu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>