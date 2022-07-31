<template>
  <div style="padding: 10px"> <!--padding: 10px  //设置组件/内容 与外边框之间的距离，-->
    <!--padding是控件的内容相对控件的边缘的边距．margin是控件边缘相对父空间的边距。-->
<!--页面功能区域-->
    <div style="margin: 10px 0"> <!--style中设置div这个组件的样式，间距为上下10px，左右0-->
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
<!--页面搜索区域-->
    <div style="margin: 10px 0">
      <!--其中v-model里面的参数都要放到return里面定义才可以,否则页面会报错,放到进去之后也方便我们更好的去取值，
      通过this.xxx就能获取到输入的值，或者给该参数赋值，return中的参数通过this.xxx调用-->
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/> <!--clearable为输入框添加删除按钮，当有内容输入时显示-->
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button><!-- type="primary"设置组件颜色为蓝色，style="margin-left: 5px"设置距左组件的距离-->
    </div>
<!--数据表格展示区域-->
    <el-table :data="tableData" border stripe style="width: 100%"> <!-- 定义表格的数据变量源:data="tableData"，及整体样式-->
      <el-table-column prop="id" label="ID" sortable width="80" /> <!-- 定义表格每一列的属性prop，即属性的key，列名label和宽度width-->
      <el-table-column prop="username" label="用户名" width="100" />
      <el-table-column prop="nickName" label="昵称" width="100"/>
      <el-table-column prop="age" label="年龄" width="100"/>
      <el-table-column prop="sex" label="性别" width="100"/>
      <el-table-column prop="address" label="地址" width="400"/>
      <el-table-column fixed="right" label="Operations" width="160">
        <template #default>
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>  <!--在编辑方法里传入参数scope.row-->
          <el-popconfirm title="你确定删除吗?">
            <template #reference>
              <el-button type="text">删除</el-button> <!-- type="text"将该按钮以文本的形式展示，danger按钮的形式展示-->
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
<!--分页展示的底部页数及每页条数的组件区域-->
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
<!--新增用户信息的弹窗功能，放到最外层div中即可，作为一个独立的组件进行调用，通过参数dialogVisible为ture或者false控制弹窗的展示及隐藏-->
<!--因为该组件使用到了参数dialogVisible，所以需要在data(){}中定义该参数-->
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <el-form :model="form" label-width="120px">  <!-- :model="form"表示定义新增用户信息弹窗里的表格的数据对象form，form与弹窗中的各个参数进行绑定，各参数值直接保存到form中-->
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
      dialogVisible: false, /*表示新增用户的弹窗，默认是关闭的状态*/
      form: {},  /*定义新增用户弹窗表格里的数据参数对象form,是一个json对象，里面可包含多个属性*/
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
      /*发送网络请求可直接调用封装的axios里的request里的get或者post方法*/
      /*request.xxx(发送接口请求).then(对接口返回的数据进行处理)*/
      request.get("/user", { /*请求后端数据用get请求*/
        params: { /*get请求不能像post请求一样直接传参数对象，需要用params对象将参数值包裹后传给接口进行请求*/
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {  //res里是接口返回的json数据对象
        console.log(res)
        this.tableData = res.data.records  //将从服务端查询的用户数据传给前端用户展示列表里的数据源变量tableData，用于在列表展示数据
        this.total = res.data.total

      })
    },
    add() {
      this.dialogVisible = true;  /*点击触发add方法时，将新增用户的弹窗打开*/
      this.form = {}  /*当打开新增用户信息弹窗时，清空表单域的数据，否则会显示上一个新增用户信息*/
    },
    /*点击新增用户里的确认按钮时调用save()方法，该方法将form参数对象直接传给后台*/
    save() {
      //向后端传数据进行保存用post方法
      //form对象是在新增用户弹窗里与各个属性进行了绑定，将新增用户信息弹窗中选择的用户信息参数值包装成form对象直接传给后台;
      if (this.form.id) {  /*新增跟编辑操作都会点击确认，调用save方法。如果form对象里有id，表示此时在执行编辑更新操作。*/
        request.put("/user/update", this.form).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.$message({  /*执行编辑更新成功后给一个弹窗提示*/
              type: "success",
              message: "更新成功"
            })
          }
          this.load()  //更新成功后自动刷新表格数据
          this.dialogVisible = false
        })
      } else { /*form对象里没有id表示是新增操作*/
        request.post("/user/submit", this.form).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.$message({  /*执行新增成功后给一个弹窗提示*/
              type: "success",
              message: "新增成功"
            })
          }
        })
      }
    },
    handleEdit(row) {  /*编辑方法需要弹窗，同时将行数据赋给弹窗的表单*/
      /*因为表单里的数据是跟form对象绑定的，所以直接给form对象赋值即可。在输入完点击取消，为了避免数据发生变化的拷贝问题，
      可以通过JSON.parse(JSON.stringify())对对象进行深拷贝，这样该处的from就是一个独立对象，跟之前表格里是隔离开了，避免浅拷贝问题*/
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true /*打开弹窗*/
    }
  }
}
</script>

<!--
在main.js中引入element-plus后，该处可通过<el-button>标签直接使用按钮组件
-->

