<template>
  <div style="padding: 10px"> <!--padding: 10px  //设置组件/内容 与外边框之间的距离-->
<!--    功能区域-->
    <div style="margin: 10px 0"> <!--margin: 10px 0  //设置组件间距，上下10px，左右0-->
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
<!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button><!-- type="primary"设置组件颜色为蓝色，style="margin-left: 5px"设置距左组件的距离-->
    </div>
    <el-table :data="tableData" border stripe style="width: 100%"> <!-- 定义表格的数据变量源及整体样式-->
      <el-table-column prop="id" label="ID" sortable width="80" /> <!-- 定义表格每一列的属性prop，列名label和样式width-->
      <el-table-column prop="userName" label="用户名" width="100" />
      <el-table-column prop="nickName" label="昵称" width="100"/>
      <el-table-column prop="age" label="年龄" width="100"/>
      <el-table-column prop="sex" label="性别" width="100"/>
      <el-table-column prop="address" label="地址" width="400"/>
      <el-table-column fixed="right" label="Operations" width="160">
        <template #default>
          <el-button link type="primary" @click="handleEdit">编辑</el-button>
          <el-popconfirm title="你确定删除吗?">
            <template #reference>
              <el-button type="text">删除</el-button> <!-- type="text"将该按钮以文本的形式展示，danger按钮的形式展示-->
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize"
          :page-sizes="[10, 30, 50, 80]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
<!--新增用户信息的弹窗功能，放到最外层div中，同时需要在data中定义引入并使用该组件时对应的变量dialogVisible-->
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <el-form :model="form" label-width="120px">  <!-- :model="form"表示定义新增用户信息弹窗里的表格的数据变量form，form与弹窗中的各个属性进行绑定-->
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width: 80%"/> <!--当在弹窗的输入框输入内容，就会将内容值绑定到form里面-->
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" style="width: 80%"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="未知">未知</el-radio>
        </el-form-item>
        <el-form-item label="地址">  <!--type="textarea"将地址框改成文本域-->
          <el-input type="textarea" v-model="form.address" style="width: 80%"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>  <!--点击时对应调用save方法-->
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import request from "@/assets/utils/request";

export default {
  name: 'HomeView',
  components: {

  },
/*  data()中定义template里各个view里用到的所有的数据变量*/
  data() {
    return {
      dialogVisible: false, /*表示新增用户的弹窗是默认关闭的状态*/
      form: {},  /*定义新增用户弹窗表格里的数据变量form,该处的form是一个json对象，里面可包含多个属性*/
      search:'',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [

      ]
    }
  },
  created() { /*页面刷新加载时自动调用load()方法获取查询数据*/
    this.load()
  },
  /*  methods中定义tableData里调用到的函数方法*/
  methods: {
    load() {
      request.get("/api/user", { /*请求后端数据用get请求*/
        params: { /*get请求不能像post请求一样直接传参数对象，需要用params包裹后传给接口进行请求*/
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records  //将从服务端查询的用户数据传给前端用户展示列表里的数据源变量tableData，用于在列表展示数据
        this.total = res.data.total

      })
    },
    add() {
      this.dialogVisible = true;  /*点击触发add方法时，将新增用户的弹窗打开*/
      this.form = {}  /*当打开新增用户信息弹窗时，清空表单域的数据，否则会显示上一个新增用户信息*/
    },
    save() {  /*对应新增用户里的确认按钮调用的方法，该方法将form参数对象直接传给后台*/
      //该处直接调用封装的axios里的request请求与后台进行数据交互，向后端传数据用post方法
      // form是在弹窗里与各个属性进行了绑定，作为请求参数传给后台;
      // .then()表示前一步的执行后将返回结果放到.then里.
      //请求里的/api 根据跨域配置的拦截器设置，会自动转换为target的值
      request.post("/user/userInfo/submit", this.form).then(res => {
        console.log(res)
      })
    },
    handleEdit() {

    }
  }
}
</script>

<!--
在main.js中引入element-plus后，该处可通过<el-button>标签直接使用按钮组件
-->

