<template>
  <!--从-->
  <div style="width: 100%; height: 100vh; background-color: dodgerblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">  <!--设置登陆框的位置：宽度width是400px，居中设置上下是150px，左右是auto自适应-->
        <div style="color: #cccccc; font-size: 30px; text-align: center">欢迎注册</div>   <!--text-align: center设置字体居中,padding: 30px 0设置与下面输入框的间距-->
        <el-form ref="form" :model="form" size="normal" :rules="rules"> <!--引入el-form输入框组件，:rules="rules"是表示给该表单增加检验规则,注意前面一定要带着冒号：，否则不生效-->
          <el-form-item prop="username">  <!--该处表示该输入框组件的数据接收参数是username，与rules里面的username一一对应。-->
            <el-input  v-model="form.username" prefix-icon="el-icon-user-solid"></el-input> <!--prefix-icon设置输入框的icon-->
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-user-lock" show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirm">
            <el-input v-model="form.confirm" prefix-icon="el-icon-user-lock" show-password></el-input> <!--密码确认-->
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="register">注册</el-button> <!--style="width: 100%" 设置登陆按钮长度与输入框一样，type="primary"设置按钮颜色-->
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/assets/utils/request";

export default {
  name: "Register",
  data() {
    return {
      form: {},  /*定义注册用户弹窗表格里的数据参数对象form,是一个json对象，里面可包含多个属性*/
      rules: { //该处是rules="rules"表单增加校验规则对应的规则内容，需要在data中定义rules规则参数
        username: [  //该处是对应的要校验的参数是username，即校验注册时的用户名
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        confirm: [
          {required: true, message: '确认密码', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    register() {
      if (this.form.password !== this.form.confirm) { /*先判断两次输入的密码是否一样*/
        this.$message({  /*两次输入的密码不一致时给出弹窗提示*/
          type: "error",
          message: "2次密码输入不一致"
        })
        return  //当两次密码不一致时返回return，不让往下继续执行了
      }

      this.$refs['form'].validate((valid) => { /*该处的逻辑是Form表单里的示例，表示验证规则合法，才会去发送登陆请求。*/
        if (valid) {  /*如果上面对form对象里的参数校验通过，则下面发送登陆请求*/
          request.post("/user/register", this.form).then(res => {
            if (res.code === '0') {
              this.$message({  /*执行注册成功后给一个弹窗提示*/
                type: "success",
                message: "注册成功"
              })
              this.$router.push("/login") /*注册成功后自动进行页面跳转到登陆页面*/
            } else {
              this.$message({  /*执行注册成功后给一个弹窗提示*/
                type: "error",
                message: res.msg   /*将注册失败时的错误信息显示出来*/
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