<template>
  <div style="padding: 10px"> <!--padding: 10px  //设置组件/内容 与外边框之间的距离-->
<!--    功能区域-->
    <div style="margin: 10px 0"> <!--margin: 10px 0  //设置组件间距，上下10px，左右0-->
      <el-button type="primary">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
<!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%"/>
      <el-button type="primary" style="margin-left: 5px">查询</el-button><!-- type="primary"设置组件颜色为蓝色，style="margin-left: 5px"设置距左组件的距离-->
    </div>
    <el-table :data="tableData" border stripe style="width: 100%"> <!-- 定义表格的数据变量源及整体样式-->
      <el-table-column prop="date" label="Date" sortable width="160" /> <!-- 定义表格每一列的属性prop，列名label和样式width-->
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" width="400"/>
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
          v-model:page-size="pageSize4"
          :page-sizes="[10, 30, 50, 80]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {

  },
/*  data()中定义tableData里的变量数据*/
  data() {
    return {
      search:'',
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }
  },
  /*  methods中定义tableData里调用到的函数方法*/
  methods: {
    handleEdit() {

    }
  }
}
</script>

<!--
在main.js中引入element-plus后，该处可通过<el-button>标签直接使用按钮组件
-->

