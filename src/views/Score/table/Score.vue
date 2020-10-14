<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      v-loading="loading"
    >
      <!--头部渲染标题部分-->
      <el-table-column
        style="text-align: center"
        type="index"
        label="编号"
        width="60"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="90"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60"></el-table-column>
      <el-table-column prop="system" label="系别" width="100"></el-table-column>
      <el-table-column prop="class" label="班级" width="100"></el-table-column>
      <el-table-column label="本学期平时成绩评价 " width="200">
        <!-----头部渲染标题部分结束----->

        <!----判断成绩是否等于0 如果等于就输出暂时无成绩---->
        <el-row slot-scope="scope">
          <div v-if="scope.row.usallyScore.length == 0">
            {{ "暂时无成绩!!!" }}
          </div>
          <!-----否则则输出评价-------->
          <el-tooltip
            class="item"
            effect="light"
            :content="scope.row.usallyScore[0][0].description"
            placement="top"
            v-else
          >
            <div class="shenglue">
              {{ scope.row.usallyScore[0][0].description }}
            </div>
          </el-tooltip>
        </el-row>
      </el-table-column>
      <el-table-column label="本学期专业成绩">
        <el-row slot-scope="scope">
          <div v-if="scope.row.professionScore.length == 0">
            {{ "您里面没有东西!!!" }}
          </div>
          <div v-else>
            {{ "专业成绩：" + scope.row.professionScore[0][0].quality }}
          </div>
        </el-row>
      </el-table-column>
      <el-table-column prop="name" label="编辑/个人信息" width="200">
        <el-row slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="进入编辑信息"
            placement="top"
          >
            <el-button @click="edit(scope.row._id)">编辑</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="个人详情"
            placement="top"
          >
            <el-button @click="information(scope.row._id)">个人信息</el-button>
          </el-tooltip>
        </el-row>
      </el-table-column>
      <!--搜索框-->
      <el-table-column label style="width: 100px">
        <template slot="header" slot-scope="scope">
          <span v-if="false">{{ scope }}</span>
          <el-input
            style="font-size: 6px"
            v-model="search"
            @input="inputpsousuo"
            placeholder="输入关键字搜索"
            prefix-icon="el-icon-search"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="mt-4"
      background
      @size-change="handleSizeChange"
      :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8]"
      layout="total,sizes,prev, pager, next,jumper"
      @current-change="currentChange"
      :page-size="pageSize"
      :total="totaldata"
      :current-page="count"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      input: "", //input双向数据绑定
      search: "", //搜索
      // value: "",
      pagedata: 30, //页
      count: 1, //计数 页码
      totaldata: 10, //总数
      pageSize: 5, //默认页面信息数据为5个一页
      // inputpsousuo: "",
      tableData: [], //表数据
      options: [
        //分页
        {
          value: "分页1",
          label: 1,
        },
        {
          value: "选项2",
          label: 2,
        },
        {
          value: "选项3",
          label: 3,
        },
        {
          value: "选项4",
          label: "4",
        },
        {
          value: "选项5",
          label: "5",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(e) {
      //分页事件
      this.pageSize = e;
      this.findStudent();
    },
    edit(id) {
      if (this.$store.state.userInfo.role.purview[1] === 0) {
        this.$message.info("你没有访问该任务的权限");
      } else {
        this.$router.push(`/ScoreEdit/${id}`);
      }
      //向学生成绩编辑页面传递id
    },
    information(id) {
      //向个人信息页面传递id
      this.$router.push(`/details/${id}`);
    },
    async inputpsousuo() {
      //输入关键字搜索  @input 事件
      if (this.search === "") {
        //if判断input输入的内容是否绝对等于空
        this.findStudent(); //如果等于空执行查找学生的方法
        this.findTotal(); //把请求的数据赋值给this.totaldata 把请求数
        this.count = 1; //页码等于1
      } else {
        this.count = 1; //否则用户输入的情况下页码跳转到第一页
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${this.count}&pageSize=${this.pageSize}`
        );
        const res = await this.$http.get(
          `/student/search?keyword=${this.search}`
          //重新获取数据
        );
        this.tableData = data.data;
        this.totaldata = res.data.total;
      }
    },
    async findTotal() {
      //异步函数方法
      const { data } = await this.$http.get(`/student`);
      //请求数据 data对象解构
      this.totaldata = data.total;
      //把请求数据 解构data.total 赋值给 this.totaldata
    },
    async findStudent() {
      //查找学生的方法 异步函数
      //异步函数实现异步等待 获取
      const { data } = await this.$http.get(
        //请求数据
        `/student?count=${this.count}&pageSize=${this.pageSize}`
      );
      this.loading = false;
      this.tableData = data.data;
      //获取到的数据赋值到数组
    },
    async currentChange(e) {
      //当表格的当前行发生变化的时候触发这个方法
      this.count = e;
      if (this.search === "") {
        //判断search是否为空
        const { data } = await this.$http.get(
          `/student?count=${e}&pageSize=${this.pageSize}`
        ); //如果是空则重新请求数据并且解构
        this.tableData = data.data;
      } else {
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${e}&pageSize=${this.pageSize}`
        );
        this.tableData = data.data;
      }
    },
  },
  created() {
    this.findStudent();
    this.findTotal();
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
.shenglue {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.asss {
  width: 300px;
}
</style>
