<template>
  <div>
    <el-table :data="tableData" border lazy style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
            <el-form-item label="姓名:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="年龄:">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="系别:">
              <span>{{ props.row.system }}</span>
            </el-form-item>
            <el-form-item label="班级:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="身份证号:">
              <span>{{ props.row.idCard }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

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
      <el-table-column label="是否删除">
        <template slot-scope="scope">
          <div class="dele">
            <el-button type="danger" icon="el-icon-delete" @click="dele(scope.row._id)"></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right" width="170">
        <template slot="header" slot-scope="scope">
          <span v-if="false">{{scope}}</span>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @input="handleSearch" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="totalInfo"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="currentChange"
      :current-page="count"
      class="mt-4"
      background
      layout="sizes,prev, pager, next"
      :page-sizes="[1, 2, 3, 4]"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总数据个数
      totalInfo: 10,
      // 页 大小
      pageSize: 3,
      tableData: [],
      loading: true,
      // 搜索框数据双向绑定
      search: "",
      count: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.findStudent();
      this.handleSearch();
    },
    // 搜索
    async handleSearch() {
      if (this.search === "") {
        this.findStudent();
        this.findTotal();
        this.count = 1;
      } else {
        this.count = 1;
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${this.count}&pageSize=${this.pageSize}`
        );
        const res = await this.$http.get(
          `/student/search?keyword=${this.search}`
        );
        this.tableData = data.data;
        this.totalInfo = res.data.total;
      }
    },
    async findTotal() {
      const { data } = await this.$http.get("/student");
      this.totalInfo = data.total;
    },
    async currentChange(e) {
      this.count = e;
      if (this.search === "") {
        this.findStudent();
      } else {
        const { data } = await this.$http.get(
          `/student/search?keyword=${this.search}&count=${e}&pageSize=${this.pageSize}`
        );
        this.tableData = data.data;
      }
    },
    async findStudent() {
      const { data } = await this.$http.get(
        `/student?count=${this.count}&pageSize=${this.pageSize}`
      );
      this.tableData = data.data;
    },
    information(id) {
      this.$router.push(`/edit/${id}`);
    },
    info(id) {
      this.$router.push(`/scoreEdit/${id}`);
    },
    //删除此人信息
    dele(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          await this.$http.delete(`/student/${id}`);
          this.findStudent();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
</style>