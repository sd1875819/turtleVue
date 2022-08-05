<template>
  <!--设置整个登陆页面的宽度是100%， 高度是100pv,页面背景色,overflow: hidden是避免页面顶部留白-->
  <div style="width: 100%; height: 100vh; background-color: blue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">  <!--设置登陆框的位置：宽度width是400px，居中设置上下是150px，左右是auto自适应-->
        <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">欢迎登陆</div>   <!--text-align: center设置字体居中,padding: 30px 0设置与下面输入框的间距-->
        <el-form ref="form" :model="form" size="normal"> <!--引入el-form输入框组件-->
          <el-form-item>
            <el-input  v-model="form.name" prefix-icon="el-icon-user-solid"></el-input> <!--prefix-icon设置输入框的icon-->
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" prefix-icon="el-icon-user-lock" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="login">登陆</el-button> <!--style="width: 100%" 设置登陆按钮长度与输入框一样，type="primary"设置按钮样式，按钮有几种指定样式直接选择即可-->
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/assets/utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {},  /*定义新增用户弹窗表格里的数据参数对象form,是一个json对象，里面可包含多个属性*/
    }
  },
  methods: {
    login() {
      request.post("/user/login", this.form).then(res => {
        if (res.code === '0') {
          this.$message({  /*执行新增成功后给一个弹窗提示*/
            type: "success",
            message: "登陆成功"
          })
        } else {
          this.$message({  /*执行新增成功后给一个弹窗提示*/
            type: "error",
            message: res.msg   /*将登陆失败时的错误信息显示出来*/
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
