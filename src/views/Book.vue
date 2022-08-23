<template>
    <div style="padding: 10px"> <!--padding: 10px  //设置组件/内容 与外边框之间的距离，-->
        <!--padding是控件的内容相对控件的边缘的边距．margin是控件边缘相对父空间的边距。-->
        <!--页面功能区域-->
        <div style="margin: 10px 0"> <!--style中设置div这个组件的样式，间距为上下10px，左右0-->
            <el-button type="primary" @click="add">新增</el-button>
            <el-popconfirm title="确认删除吗？" @confirm="deleteBatch">  <!--点击确认删除按钮时，调用deleteBatch函数-->
              <template #reference>
                <el-button type="danger">批量删除</el-button>
              </template>
            </el-popconfirm>
        </div>
        <!--页面搜索区域-->
        <div style="margin: 10px 0">
            <!--其中v-model里面的参数都要放到return里面定义才可以,否则页面会报错,放到进去之后也方便我们更好的去取值，
            通过this.xxx就能获取到输入的值，或者给该参数赋值，return中的参数通过this.xxx调用-->
            <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/> <!--clearable为输入框添加删除按钮，当有内容输入时显示-->
            <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button><!-- type="primary"设置组件颜色为蓝色，style="margin-left: 5px"设置距左组件的距离-->
        </div>
        <!--数据表格展示区域-->
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange"> <!-- 定义表格的数据变量源:data="tableData"，及整体样式-->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" sortable width="80" /> <!-- 定义表格每一列的属性prop，即属性的key，列名label和宽度width-->
            <el-table-column prop="name" label="名称" width="100" />
            <el-table-column prop="price" label="单价" width="100"/>
            <el-table-column prop="author" label="作者" width="100"/>
            <el-table-column prop="createTime" label="出版时间" width="100"/>
            <el-table-column label="封面" width="200">   <!--上传的文件图片的展示组件，注意写法-->
                <template #default="scope">    <!--#default="scope"用于获取行数据，因为如果直接在el-table-column组件里显示参数值，可直接定义prop参数，从:data获取值，但是该处是在el-table-column组件里需要再绘制一个子view，所以要先用templete包裹起来，然后通过#default="scope"获取行数据，然后子view从scop中获取值，而不能直接定义一个prop从data中获取值-->
                    <el-image
                            style="width: 50px; height: 50px"
                            :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">  <!--在操作栏内，使用默认template获取了表格的行内数据scope-->
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>  <!--向编辑方法传入行数据scope.row-->
                    <el-popconfirm title="你确定删除吗?" @confirm="handleDelete(scope.row.id)"> <!--删除是在二次确认按钮上执行的，根据Element plus上删除组件的使用方法，加一个confirm调用对应方法即可-->
                        <template #reference>
                            <el-button type="text">删除</el-button> <!-- type="text"将该按钮以文本的形式展示，danger是以按钮的形式展示。因为删除是根据组件删除，所以只需传入id即可-->
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--分页展示的底部页数及每页条数的组件区域-->
        <el-pagination
                v-model:currentPage="currentPage4"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
        <!--新增用户信息的弹窗功能，放到最外层div中即可，作为一个独立的组件进行调用，通过参数dialogVisible为ture或者false控制弹窗的展示及隐藏-->
        <!--因为该组件使用到了参数dialogVisible，所以需要在data(){}中定义该参数-->
        <el-dialog v-model="dialogVisible" title="提示" width="30%">
            <el-form :model="form" label-width="120px">  <!-- :model="form"表示定义新增用户信息弹窗里的表格的数据对象form，form与弹窗中的各个参数进行绑定，各参数值直接保存到form中-->
                <el-form-item label="名称">
                    <el-input v-model="form.name" style="width: 80%"/> <!--当在弹窗的输入框输入内容，就会将内容值绑定到form里面-->
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="form.price" style="width: 80%"/>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.author" style="width: 80%"/>
                </el-form-item>
                <el-form-item label="出版时间">
                    <el-date-picker v-model="form.createTime" value-format="YYYY-MM-DD" type="data" style="width: 80%" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="封面"><!--在弹窗里添加el-upload文件上传组件,只需要给action里是指定调用的后台接口即可上传，该处有默认上传文件大小限制，超出会上传失败，也可以指定大小。后台需要添加解决跨域的类CorsConfig-->
                    <el-upload ref="upload" action="http://localhost:8013/files/upload"  :on-success="filesUpladSuccess"> <!--filesUpladSuccess是文件上传成功后回调的方法，用于获取文件上传后的后台返回的文件地址,注意:on-success前面要有":"号，ref="upload"是打开弹窗时执行的方法-->
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button> <!--点击弹窗上的取消按钮时将弹窗是否显示的字段dialogVisible置为false即可-->
        <el-button type="primary" @click="save">确定</el-button>  <!--点击弹窗上的确认按钮时对应调用save方法-->
      </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>

    import request from "@/assets/utils/request";

    export default {
        name: 'Book',
        components: {

        },
        /*  data()中定义template里各个view里用到的所有的数据变量*/
        data() {
            return {
                dialogVisible: false, /*表示新增用户的弹窗，默认是关闭的状态*/
                form: {},  /*定义新增用户弹窗表格里的数据参数对象form,是一个json对象，里面可包含多个属性*/
                search:'',
                currentPage: 1, /*定义分页组件的参数当前页currentPage、每页显示条数pageSize及请求到的数据总条数total以及给定其默认值*/
                pageSize: 10,
                total: 0,
                tableData: [],
                ids: []  /*选择的需要删除的id的数组，可同时删除多行*/
            }
        },
        created() { /*页面刷新加载时自动调用load()方法获取查询数据*/
            this.load()
        },
        /*  methods中定义tableData里调用到的函数方法*/
        methods: {
            deleteBatch() {
              if (!this.ids.length) { /*先判断要删除的多行数据的id的集合参数ids的数组长度，既判断有没有选择至少一行要删除的内容*/
                this.$message.warning("请选择数据！") /*没有任何选择时，弹出提示信息*/
                return
              }
              request.post("/book/deleteBatch", this.ids).then(res => {  /*将要删除的ids数组直接一次性传给后台*/
                if (res.code === '0') {
                  this.$message.success("批量删除成功")
                  this.load()
                } else {
                  this.$message.error(res.msg)
                }
              })
            },
            handleSelectionChange(val) { /*val就是用户在进行批量删除时选中的所有的行对象，包含选中的每一行的所有的属性值*/
              this.ids = val.map(v => v.id)  /*因为批量删除是根据id删除的，所以该处从选中的行中取出每一行的id，注意该处使用的是map方法获取，map可以将对象变成单个属性的集合[{id,name,price},{id,name,price}] => [id,id],取出的id传给ids数组保存*/
            },
            filesUpladSuccess(res) {
                console.log(res)
                this.form.cover = res.data  /*给cover参数赋值，将cover值通过form对象传给后台进行存储*/
            },
            load() {
                /*发送网络请求可直接调用封装的axios里的request里的get或者post方法*/
                /*request.xxx(发送接口请求).then(对接口返回的数据进行处理)*/
                request.get("/book", { /*请求后端数据用get请求*/
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
              if (this.$refs['upload']) {  /*做一个判断，如果有this.$refs['upload']元素，再进行清除操作*/
                this.$refs['upload'].clearFiles()   /*清除弹窗里之前已经上传的历史文件*/
              }
            },
            /*点击新增用户里的确认按钮时调用save()方法，该方法将form参数对象直接传给后台*/
            save() {
                //向后端传数据进行保存用post方法
                //form对象是在新增用户弹窗里与各个属性进行了绑定，将新增用户信息弹窗中选择的用户信息参数值包装成form对象直接传给后台;
                if (this.form.id) {  /*新增跟编辑操作都会点击确认，调用save方法。如果form对象里有id，表示此时在执行编辑更新操作。*/
                    request.put("/book/update", this.form).then(res => {
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
                    request.post("/book/submit", this.form).then(res => {
                        console.log(res)
                        if (res.code == '0') {
                            this.$message({  /*执行新增成功后给一个弹窗提示*/
                                type: "success",
                                message: "新增成功"
                            })
                        } else {
                            this.$message({
                                type: "error",
                                message: res.msg
                            })
                        }
                        this.load()  //新增成功后自动刷新表格数据
                        this.dialogVisible = false
                    })
                }
            },
            handleEdit(row) {  /*编辑方法需要弹窗，同时将行数据赋给弹窗的表单*/
                /*因为表单里的数据是跟form对象绑定的，所以直接给form对象赋值即可。在输入完点击取消，为了避免数据发生变化的拷贝问题，
                可以通过JSON.parse(JSON.stringify())对对象进行深拷贝，这样该处的from就是一个独立对象，跟之前表格里是隔离开了，避免浅拷贝问题*/
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogVisible = true /*打开弹窗，编辑打开的弹窗跟新增使用同一个弹窗，所以弹窗上的取消跟确认方法也使用同一个，这样就需要在确认方法里判断是新增还是编辑信息*/
                this.$nextTick( () => {  /*在执行清除时会报错Cannot read property "clearFiles" of undefined，因为弹窗是异步加载，所以点击编辑按钮到弹窗弹出之前这个清理上传地址的this.$refs['upload']组件还是不存在的，获取不到这个组件所以报错，只有当弹窗弹出后这个清理上传地址的组件才有，所以该处需要给该组件包裹一个$nextTick，解决未来DOM不存在的问题，既解决调用时刻元素不存在发生的错误，正常是弹窗渲染时就检查组件是否存在，通过该方式就可以让弹窗弹出后再检查该组件是否存在*/
                     this.$refs['upload'].clearFiles()   /*清除弹窗里之前已经上传的历史文件*/
                })
            },
            handleDelete(id) { /*在删除方法中写个接口，把id传给后台执行删除操作*/
                console.log(id)
                request.delete("/book/" + id).then(res =>{  /*使用该方式，/后面的id会直接被映射到后台被delete的占位符参数获取到*/
                    if (res.code == '0') {
                        this.$message({  /*执行删除成功后给一个弹窗提示*/
                            type: "success",
                            message: "删除成功"
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })
                    }
                    this.load()  //删除一行数据后重新刷新并加载页面表格数据
                })
            },
            /*handleSizeChange和handleCurrentChange是分页的组件上的两个方法，一个控制每页展示几条，一个控制跳转到第几页，具体使用查看Element plus插件案例*/
            handleSizeChange(pageSize) {  /*改变当前每页的个数触发，pageSize值是从前端分页组件选择每页展示几条后传过来的*/
                this.pageSize = pageSize  /*在data中定义了pageSize及currentPage参数，并设置了默认值，在请求数据后，要重新给该参数赋值*/
                this.load()   /*选择分页后刷新页面，使改动生效*/
            },
            handleCurrentChange(pageNum) {  /*改变当前页码触发*/
                this.currentPage = pageNum
                this.load()
            }
        }
    }
</script>

<!--
在main.js中引入element-plus后，该处可通过<el-button>标签直接使用按钮组件
-->

