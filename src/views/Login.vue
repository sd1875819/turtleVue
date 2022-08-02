<template>
  <!--设置整个登陆页面的宽度是100%， 高度是100pv,页面背景色,overflow: hidden是避免页面顶部留白-->
  <div style="width: 100%; height: 100vh; background-color: dodgerblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">  <!--设置登陆框的位置：宽度width是400px，居中设置上下是150px，左右是auto自适应-->
        <div style="color: #cccccc; font-size: 30px; text-align: center">欢迎登陆</div>   <!--text-align: center设置字体居中-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>