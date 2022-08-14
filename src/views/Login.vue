<template>
  <!--设置整个登陆页面的宽度是100%， 高度是100pv,页面背景色,overflow: hidden是避免页面顶部留白-->
  <div style="width: 100%; height: 100vh; background-color: dodgerblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">  <!--设置登陆框的位置：宽度width是400px，居中设置上下是150px，左右是auto自适应-->
        <div style="color: #cccccc; font-size: 30px; text-align: center;  margin: 20px">欢迎登陆</div>   <!--text-align: center设置字体居中,padding: 30px 0设置与下面输入框的间距-->
        <el-form ref="form" :model="form" size="normal" :rules="rules"> <!--引入el-form输入框组件，rules="rules"是表示给该表单增加检验规则,注意前面一定要带着冒号：，否则不生效-->
          <el-form-item prop="username">
            <el-input  v-model="form.username" prefix-icon="el-icon-user-solid"></el-input> <!--prefix-icon设置输入框的icon-->
          </el-form-item>
          <el-form-item prop="password">
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
      rules: { //该处是rules="rules"表单增加校验规则对应的规则内容，需要在data中定义rules规则参数
        username: [  //该处是对应的要校验的参数是username，即校验注册时的用户名
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['form'].validate((valid) => { /*该处的逻辑是Form表单里的示例，表示验证规则合法，才会去发送登陆请求。*/
        if (valid) {  /*如果上面对form对象里的参数校验通过，则下面发送登陆请求*/
          request.post("/user/login", this.form).then(res => {
            if (res.code === '0') {
              this.$message({  /*执行新增成功后给一个弹窗提示*/
                type: "success",
                message: "登陆成功"
              })
              sessionStorage.setItem("user", JSON.stringify(res.data))  /*用户登陆成功后缓存用户信息,该缓存信息可供其他页面查询获取，比如News里可从该处直接获取发帖人的用户名*/
              this.$router.push("/") /*登陆成功后自动进行页面跳转到指定页面，this.$router.push()是vue里的页面自动跳转实现方法*/
            } else {
              this.$message({  /*执行新增成功后给一个弹窗提示*/
                type: "error",
                message: res.msg   /*将登陆失败时的错误信息显示出来*/
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
