<template>
<!--设置头部的样式：高度设置height: 50px; line-height: 50px;下边框设置border-bottom: 1px solid #ccc; 设置布局display: flex"-->
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
<!--将顶部设置成左中右三个区域：-->
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">后台管理</div>
    <div style="flex:  1"></div>
    <div style="width: 100px">
        <el-dropdown>
    <span class="el-dropdown-link">
      <i class="el-icon-arrow-down el-icon--right"></i>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>