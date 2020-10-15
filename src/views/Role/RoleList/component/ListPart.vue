<template>
  <div>
    <!-- 跳转新建页面 -->
    <el-row class="box">
      <el-button type="primary" @click="information">新建</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-row-class-name="headerStyle"
      border
      style="width: 100%"
      class="tablebox"
    >
      <!-- 循环form表单每项 -->
      <el-table-column
        v-for="info in rightHeader"
        :key="info.key"
        :property="info.key"
        :label="info.label"
        class="anonymous"
        align="center"
      >
      </el-table-column>
      <!-- 权限按钮 -->
      <el-table-column prop="purview" label="操作选项" width="255">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            class="Authoritybotton"
            @click="edit(scope.row._id)"
            :disabled="$store.state.userInfo.role.purview[1] == 0"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            class="Authoritybotton"
            @click="dele(scope.row._id)"
            :disabled="$store.state.userInfo.role.purview[2] == 0"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      rightHeader: [
        {
          label: "类型",
          key: "name",
        },
        {
          label: "注册时间",
          key: "time",
        },
        {
          label: "描述",
          key: "description",
        },
      ],
      tableData: [
        {
          name: " ",
          purview: [0, 0, 0],
          type: 0,
          time: 0,
          description: " ",
        },
      ],
    };
  },
  methods: {
    //请求role的id 并且赋值给tableData 然后执行改变时间的函数
    async findStudent() {
      const { data } = await this.$http.get(`/role`);
      this.loading = false;
      this.tableData = data.data;
      this.changtime();
      if (data.data === null) {
        this.$router.go(-1);
      }
    },
    //将时间戳格式的时间改变成当前日期格式
    changtime() {
      //将数组的各位转换成当前日期格式  并且赋值
      for (let i = 0; i < this.tableData.length; i++) {
        var day = new Date(this.tableData[i].time * 1); //秒数要转为毫秒数
        var time = day.toLocaleString();
        this.tableData[i].time = time;
      }
    },
    // 设置表头样式
    headerStyle() {
      return "table-rowIndex";
    },

    //跳转新建页面
    information() {
      //将新建页面的路由 push到路由中
      this.loading = true;
      //当点击编辑的时候出现加载
      //等1秒后跳转
      setTimeout(() => {
        this.$router.push(`/RoleEdit`);
      }, 500);
    },
    // 跳转编辑页面
    edit(id) {
      //向学生成绩编辑页面传递id
      this.loading = true;
      setTimeout(() => {
        this.$router.push(`/RoleEdit/${id}`);
      }, 500);
    },
    //删除数据
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
          await this.$http.delete(`/role/${id}`);
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
    this.findStudent();
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.box {
  margin: 30px 0 30px 0 !important ;
}
/* 权限按钮 */
.Authoritybotton {
  width: 110px;
  height: 40px;
  font-size: 14px;
}
/* 描述出的溢出隐藏 */
.anonymous {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 首行样式 */
.table-rowIndex {
  font-size: 18px;
}
</style>
