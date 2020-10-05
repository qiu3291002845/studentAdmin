<template>
    <div>
        <el-table border :data="searchTable.length === 0 ? tableData : searchTable" style="width: 100%;margin-top: 20px;" v-loading="loading" width>
            <!-- 头像 -->
            <el-table-column align="center" prop="avatar" style="text-align: center;" label="头像" width="107">
                <template slot-scope="scope">
                    <el-image :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                </template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column align="center" prop="username" label="用户名" width="140">
            </el-table-column>
            <!-- 姓名 -->
            <el-table-column align="center" prop="name" label="昵称" width="140">
            </el-table-column>
            <!-- 地址 -->
            <el-table-column align="center" label="角色" width="130">
                <template slot-scope="scope">
                    <span>{{scope.row.role === null ?'未知':scope.row.role.name}}</span>
                </template>
            </el-table-column>
            <!-- 注册时间 -->
            <el-table-column align="center" prop="time" label="注册时间" width="210">
            </el-table-column>
            <!-- 邮箱 -->
            <el-table-column align="center" prop="email" label="邮箱" width="210">
            </el-table-column>
            <!-- 操作选项 -->
            <el-table-column align="center" label="操作选项" width="170">
                <template slot-scope="scope">
                    <div>
                        <span class="edit" @click="transfer(scope.row._id)">编辑</span>
                        <span class="delete" @click="del(scope.row._id)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background style="margin-top: 15px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current" :page-sizes="PageBar" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totaldata">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        searchTable: {
            type: Array
        },
        sousuo: {
            type: String
        }
    },
    data() {
        return {
            emailYz: true,
            loading: true, //拼命加载中
            pageSize: 5, //默认页面信息数据为5个一页
            totaldata: 0, //分页总数
            count: 1, //计数 页码
            PageBar: [1, 2, 3, 4, 5, 6, 7, 8], //页条
            current: 1, //当前页数
            tableData: [{
                avatar: "", //头像
                time: "", //日期
                name: '', //昵称
                numbering: "", //编号
                role: "", //角色
                username: "", //用户名
                email: "", //邮箱
                caozuo: ""
            }],
            dialogVisible: false, //弹框布尔
            emailInput: "", //邮箱验证
            buttonInput: "查看邮箱",
        }
    },
    compouted: {
        searchT() {
            if (this.$props.searchTable && this.$props.sousuo) {
                console.log(this.$props.searchTable && this.$props.sousuo)
                return this.$props.searchTable && this.$props.sousuo
            } else {
                return this.tableData
            }
        }
    },
    methods: {
        del(id) { //删除用户的方法
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$http.delete(`/user/${id}`);
                this.findTotal()
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.findTotal();
            })
        },
        transfer(id) { //传递id给编辑页面
            this.$router.push(`/userForm/${id}`);
        },
        handleSizeChange(e) { //点击每页几条时触发
            this.pageSize = e; //每页显示几条 
            this.FindUsers();
            this.changtime(); //接收数据以后进行时间戳转换成时间格式
        },
        async handleCurrentChange(e) { //点击当前页的时候触发
            this.count = e;
            const { data } = await this.$http.get(
                `/user?count=${e}&pageSize=${this.pageSize}`
            );
            this.tableData = data.data;
            this.changtime(); //接收数据以后进行时间戳转换成时间格式

        },
        async findTotal() { //异步函数请求数据方法
            const { data } = await this.$http.get(`/user`);
            this.loading = false;
            //请求数据 data对象解构
            this.totaldata = data.data.length;
            //把请求数据的数据赋值给自己的数组，然后进行渲染
        }, //数据库请求数据渲染页面

        async FindUsers() {
            const { data } = await this.$http.get(
                //请求数据
                // count     页码
                // pageSize  页大小
                `/user?count=${this.count}&pageSize=${this.pageSize}`
            );
            console.log(data.data);
            this.tableData = data.data;
            this.changtime(); //接收数据以后进行时间戳转换成时间格式
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
    },
}
</script>
<style>

.edit {
    color: blue;
    cursor: pointer;
    padding-right: 15px;
}

.delete {
    color: red;
    cursor: pointer;
}
.el-image__inner, .el-image__placeholder, .el-image__error {
    width: 60%;
    height: 60%;
    border-radius: 50%;
}
.el-table-column {
    border: none;
    color: red;
}
</style>