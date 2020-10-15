<template>
    <div>
        <!-- 搜索框与新建 -->
        <el-row>
            <el-button icon="el-icon-circle-plus-outline" style="float: left;" type="primary" @click="newUser" :disabled="$store.state.userInfo.role.purview[0] ==0 ?true:false">新建用户</el-button>
            <!-- 搜索功能 -->
            <el-input style="width: 200px;float: right;" v-model="search" @input="inputSearch" class="Search" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
        </el-row>
        <!-- 列表框 -->
        <el-table ref="filterTable" border :data="tableData" class="table-back" v-loading="loading">

            <!-- 头像 -->
            <el-table-column fixed  align="center" prop="avatar" style="text-align: center;" label="头像" width="120">
                <template slot-scope="scope">
                    <el-image :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                </template>
            </el-table-column>
            <!-- 循环用户名-昵称-邮箱-注册时间 -->
            <el-table-column fixed align="center" v-for="item in list" :key="item.index" :property="item.key" :label="item.lable">
            </el-table-column>
            <!-- 角色 -->
            <el-table-column fixed align="center" label="角色" width="100">
              <template slot-scope="scope">
                {{scope.row.role == null ?  "暂无角色" : scope.row.role.name}}
              </template>
            </el-table-column>
            <!-- 操作选项 -->
           <div>
                <el-table-column align="center" label="操作选项">
                <template slot-scope="scope">
                    <div>
                        <el-button
                        :disabled="$store.state.userInfo.role.purview[0] == 0 ? true:false"
                         icon="el-icon-edit-outline" type="primary" @click="editUser(scope.row._id)"></el-button>
                        <el-button
                        :disabled="$store.state.userInfo.role.purview[0] ==0 ?true:false"
                         icon="el-icon-delete" type="danger" @click="deleteUser(scope.row._id)"></el-button>
                    </div>
                </template>
            </el-table-column>
           </div>
        </el-table>
        <!-- 分页 -->
        <el-pagination 
        background 
        style="margin-top: 15px;" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="current" 
        :page-sizes="PageBar" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="totaldata"
        :hide-on-single-page="Val"
        >
        </el-pagination>
        <el-switch v-model="Val" class="Val">
        </el-switch>
    </div>
</template>
<script>
import UserList from '.././js/userList'
export default {
    data() {
        return {
            Val:true,
            search: "",//搜索框
            loading: true, //拼命加载中
            pageSize: 5, //默认页面信息数据为5个一页
            totaldata: 0, //分页总数
            count: 1, //计数 页码
            PageBar: [1,3,5,10,20], //页条
            current: 1, //当前页数
            tableData: [{
                avatar: "", //头像
                time: "", //日期
                name: '', //昵称
                role: "", //角色
                username: "", //用户名
                email: "", //邮箱
            }],
            list:UserList, //循环昵称-用户名-邮箱-注册时间
        }
    },
    methods: {
        newUser() { //新建用户的方法
            this.$router.push('/useredit');
        },
        deleteUser(id) { //删除用户的方法
            this.$confirm("确定删除该用户吗？, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$http.delete(`/user/${id}`);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.FindUsers();
                this.findTotal();
            }).catch(()=>{
                this.$message({
                    message: '取消删除',
                    center: true
                });
            })
        },
        editUser(id) { //传递id给编辑页面
            this.$router.push(`/useredit/${id}`);
        },
        async inputSearch() { //input关键词搜索
            if (this.search == "") {
                this.FindUsers();
                this.handleCurrentChange();
                this.count = 1;
                this.changtime();//时间转换
                this.findTotal();
            } else {
                this.count = 1; //否则用户输入的情况下页码跳转到第一页
                const { data } = await this.$http.get(
                    `/user/search?keyword=${this.search}&count=${this.count}&pageSize=${this.pageSize}`
                );
                const res = await this.$http.get(
                    `/user/search?keyword=${this.search}`
                    //重新获取数据
                );
                this.tableData = data.data;
                this.totaldata = res.data.total;
                this.changtime();
            }
        },
        handleSizeChange(e) { //点击每页几条时触发
            this.pageSize = e; //每页显示几条 
            this.FindUsers();
            this.changtime(); //接收数据以后进行时间戳转换成时间格式
        },
        async handleCurrentChange(e) { //点击当前页的时候触发
            this.count = e;
            if (this.search === "") {
                //判断search是否为空
                const { data } = await this.$http.get(
                    `/user?count=${e}&pageSize=${this.pageSize}`
                ); //如果是空则重新请求数据并且解构
                this.tableData = data.data;
                this.changtime();
            } else {
                const { data } = await this.$http.get(
                    `/user/search?keyword=${this.search}&count=${e}&pageSize=${this.pageSize}`
                );
                this.tableData = data.data;
                this.changtime();
            }
        },
        async findTotal() { //异步函数请求数据方法
            const { data } = await this.$http.get(`/user`);
            if(data ==null){
                this.$router.push("./")
            }else {
                this.loading = false;
                //请求数据 data对象解构
                this.totaldata = data.data.length;       
                //把请求数据的数据赋值给自己的数组，然后进行渲染 请求数据长度显示有多少条
            }
            
        }, //数据库请求数据渲染页面

        async FindUsers() {
            const { data } = await this.$http.get(
                //请求数据
                // count     页码
                // pageSize  页大小
                `/user?count=${this.count}&pageSize=${this.pageSize}`
            );
            if(data == null){
                this.$router.push("./")
            }else {
                this.loading = false;
                this.tableData = data.data;
                this.changtime(); //接收数据以后进行时间戳转换成时间格式
            }
            
        }, //数据库请求页码和页大小并进行渲染

        //将时间戳转换成时间格式
        changtime() {
            //将数组的每一个时间戳转换为当前日期格式 并赋值
            for (let i = 0; i < this.tableData.length; i++) { //首先循环把每个
                var day = new Date(this.tableData[i].time * 1); //秒数要转为毫秒数
                var time = day.toLocaleString();
                this.tableData[i].time = time;
            }
        },

    },
    created() {
        //在实例创建完立即调用
        this.findTotal();
        this.FindUsers();
    }
}
</script>
<!-- <style scoped lang="scss">
@import ".././css/index.css";
</style> -->
<!---会污染别的样式，但是这样也是可以引入使用的---->
<style src=".././css/index.css" scoped></style>
<style scoped>

</style>
