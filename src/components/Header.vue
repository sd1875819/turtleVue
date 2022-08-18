<template>
<!--设置头部的样式：高度设置height: 50px; line-height: 50px;下边框设置border-bottom: 1px solid #ccc; 设置布局display: flex"-->
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
<!--将顶部设置成左中右三个区域：-->
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">后台管理</div>
    <div style="flex:  1"></div>
    <div style="width: 100px">
        <el-dropdown>
          <span class="el-dropdown-link" style="margin: 20px">张三
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click="exit">退出系统</el-dropdown-item> <!--点击退出系统时，直接调用$router.push()方法让页面跳转到登陆界面，如果时正式系统还需要清理浏览器的用户信息缓存-->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>

</template>

<script>
export default {
    name: "Header",
    methods: {
        exit() {
            this.$router.push('/login')  /*点击退出登陆时直接跳转到登陆页面*/
            sessionStorage.removeItem("user")  /*退出登陆后清理浏览器里保存的登陆时的用户信息，避免退出登陆后绕过登陆页直接读取缓存用户信息进入后台页面*/
        }
    }
}
</script>

<style scoped>

</style>
