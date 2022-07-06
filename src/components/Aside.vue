<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="2"
        class="el-menu-vertical-demo"
    >
<!--   一级菜单使用el-menu-item，二级菜单则在el-menu-item内使用el-sub-menu -->
        <el-menu-item index="1-4">
          <template #title>item four</template>
          <el-sub-menu index="1-4-1">item one</el-sub-menu>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
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