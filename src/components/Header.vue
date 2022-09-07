<template>
<!--设置头部的样式：高度设置height: 50px; line-height: 50px;下边框设置border-bottom: 1px solid #ccc; 设置布局display: flex"-->
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
<!--将顶部设置成左中右三个区域：-->
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">后台管理</div>
    <div style="flex:  1"></div>
    <div style="width: 100px">
        <el-dropdown>
          <span class="el-dropdown-link" style="margin: 20px">
            <el-avatar :size="30" style="position: relative; top: 10px"></el-avatar>  <!--头部显示用户登陆后的昵称-->
           {{ userInfo.nickName }}
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
import request from "@/assets/utils/request";

export default {
    name: "Header",
    data() {
      return {
        user: {},
        userInfo: {}
      }
    },
    created() { /*从浏览器缓存的用户信息的json串获取用户信息*/
      const userInfo = sessionStorage.getItem("user")

        try {
          this.userInfo = JSON.parse(userInfo)
        } catch (e) {
          this.userInfo = {}
        }
      console.log("...........................")
    },
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
