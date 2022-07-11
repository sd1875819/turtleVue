// 跨域配置,解决跨域就是在浏览器里前端的端口无法直接访问后台的端口，需要处理一下跨域问题才行
module.exports = {
  devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
    port: 8080,    //前端端口，选填，可使用默认的8080
    proxy: {                 //设置代理，必须填
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:9999',     //代理的后台目标地址及接口，前端页面使用request的请求url里输入/api时，就会自动替换为target的值
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
          '^/api': ''                     //选择忽略拦截器里面的内容，拦截器的值替换为target的值后将拦截器里的值/api替换为空的字符串
        }
      }
    }
  }
}

