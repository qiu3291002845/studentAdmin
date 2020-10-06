<template>
  <div>
    <!-- 新建学生按钮 -->
    <el-button class="mb-4" type="primary" @click="createStudent"
      >新建学生
    </el-button>
    <!--点击列表出现大概情况部分  -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <detali></detali>
      <!-- 学生列表各大项部分 -->
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="system" label="系别"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column label="编辑/个人信息" width="220">
        <el-row slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button @click="information(scope.row._id)">编辑</el-button>
          </el-tooltip>
          <el-tooltip class="item" content="个人信息" placement="top">
            <el-button @click="info(scope.row._id)">个人信息</el-button>
          </el-tooltip>
        </el-row>
      </el-table-column>
      <!--是否删除按钮部分  -->
      <el-table-column label="是否删除">
        <template slot-scope="scope">
          <div class="dele">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="dele(scope.row._id)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
      <!--搜索框部分  -->
      <el-table-column align="right" width="170">
        <template slot="header" slot-scope="scope">
          <span v-if="false">{{ scope }}</span>
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @input="handleSearch"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏部分  -->
    <el-pagination
      ation
      :total="totalInfo"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="currentChange"
      :current-page="count"
      class="mt-4"
      background
      layout="total,sizes,prev, pager, next,jumper"
      :page-sizes="[1, 2, 3, 4]"
    ></el-pagination>
  </div>
</template>

<script>
//引用组件
import detali from "./component/detali";

export default {
  loading: true,
  name: "Student",
  data() {
    return {
      // 总数据个数
      totalInfo: 10, //
      // 页 大小
      pageSize: 3,
      tableData: [],
      loading: true,
      // 搜索框数据双向绑定
      search: "", //搜索
      count: 1, //分页  第几页
    };
  },
  methods: {
    // 请求数据借口函数
    createStudent() {
      //将请求到的edit路径放到路由中
      this.$router.push("/edit");
    },
    //分页页数改变函数
    handleSizeChange(val) {
      //将分页栏的值赋值给页 大小（页面数据有几个）
      this.pageSize = val;
      //就执行异步请求student的页数=请求过来的页数与页的大小=请求过来的页数大小
      this.findStudent();
      //执行 判断search是否有值的函数
      this.handleSearch();
    },
    //
    async handleSearch() {
      //判断这个搜索框的数值是否为空 如果为空
      if (this.search === "") {
        //就执行异步请求student的页数=请求过来的页数与页的大小=请求过来的页数大小
        this.findStudent();
        //定义data = 异步请求student数据
        this.findTotal();
        //页数等于1
        this.count = 1;
      } else {
        //如果不等于0
        //则 页数=1 定义data=异步请求的student的搜索关键词=请求过来的搜索页数并且页大小=请求过来的页大小
        this.count = 1;
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${this.count}&pageSize=${this.pageSize}`
        );
        //定于res =异步请求过得的student的搜过关键词=请求过来的搜索
        const res = await this.$http.get(
          `/student/search?keyword=${this.search}`
        );
        //将 请求过来的data.data的值复制给tabaleData
        this.tableData = data.data;
        //将 定义的res.data.data的值复制给totalInfo
        this.totalInfo = res.data.total;
      }
    },
    async findTotal() {
      //定义data = 异步请求student数据
      const { data } = await this.$http.get("/student");
      //并将data中的total赋值给totalInfo
      this.totalInfo = data.total;
    },
    async currentChange(e) {
      this.count = e;
      //判断如果这个搜索的内容为空
      if (this.search === "") {
        //执行异步请求student的页数=请求过来的页数与页的大小=请求过来的页数大小
        this.findStudent();
      } else {
        //否则就 定义data = 异步请求到这个地址的student 搜索的关键词=请求过来的搜索页数并且页大小=请求过来的页大小
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${e}&pageSize=${this.pageSize}`
        );
        this.tableData = data.data;
      }
    },
    async findStudent() {
      // 当页面 加载的时候 请求
      const { data } = await this.$http.get(
        `/student?count=${this.count}&pageSize=${this.pageSize}`
      );
      // 将获取到的数据赋值给tableData
      this.tableData = data.data;
    },
    information(id) {
      //将获取到的edit数据id push到路由中
      this.loading = true;
      //当点击编辑的时候出现加载
      //等1秒后跳转
      setTimeout(() => {
        this.$router.push(`/edit/${id}`);
      }, 1000);
    },
    info(id) {
      //将获取的details 数据id push到路由中
      this.$router.push(`/details/${id}`);
    },
    //删除此人信息
    dele(id) {
      // 弹框 是否删除 一个确定 一个取消 类型：警告
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        //当删除成功的时候 异步等待删除请求过来这条数据的id
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          await this.$http.delete(`/student/${id}`);
          this.findStudent();
        })
        //当取消的时候  提示已经取消删除
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
      //执行异步请求student的页数=请求过来的页数与页的大小=请求过来的页大小
      this.findStudent();
      //执行异步请求student数据 并将data中的total赋值给totalInfo
      this.findTotal();
    }, 1000);
  },
  components: {
    detali,
  },
};
</script>

<style scoped>
.dele {
  text-align: center;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
