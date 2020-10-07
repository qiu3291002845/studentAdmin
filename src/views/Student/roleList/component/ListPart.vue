<template>
  <el-table
    class="box"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    :header-row-class-name="headerStyle"
    border
    style="width: 100%"
  >
    <!-- 头像 -->
    <el-table-column
      prop="img"
      label="头像"
      width="120"
      align="center"
      class="header-index"
    >
      <!--头像图片 -->
      <template class="Avatar">
        <el-image
          :src="src"
          width="40px"
          height="40px"
          style="border-radius: 100%"
          :preview-src-list="[src]"
        />
      </template>
    </el-table-column>
    <!-- 姓名 -->
    <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <!-- 类型 -->
    <el-table-column prop="type" label="类型" width="120">
      <el-row slot-scope="scope">
        <!-- 判断type的值 如果是0 是学生 如果是1则石老师 -->
        <span v-if="scope.row.type == 0">学生</span>
        <span v-else>老师</span>
      </el-row>
    </el-table-column>
    <!-- 日期 -->
    <el-table-column prop="time" label="日期" width="180"> </el-table-column>
    <!-- 描述 -->
    <el-table-column label="描述" width="180">
      <!-- 判断描述是否为空 如果有就等于暂无成绩 -->
      <!-- <el-row slot-scope="scope">
        <span v-if="scope.row.description.length == 0">
          {{ "暂无成绩" }}
        </span> -->
      <!-- 否则 -->
      <!-- <span v-else class="anonymous">
          {{ scope.row.description }}
        </span>
      </el-row> -->
      <div class="anonymous" slot-scope="scope">
        {{ scope.row.description }}
      </div>
    </el-table-column>
    <!-- 权限按钮 -->
    <el-table-column prop="purview" label="权限" width="300">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          class="Authoritybotton"
          @click="information(scope.row._id)"
          >新建</el-button
        >
        <el-button
          size="mini"
          type="info"
          class="Authoritybotton"
          @click="edit(scope.row._id)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          class="Authoritybotton"
          @click="dele(scope.row._id)"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      src: "http://wx1.sinaimg.cn/mw690/6a04b428ly1g19al1td90g209q08sq4i.gif",
      // src: "http://wx2.sinaimg.cn/mw690/6a04b428ly1g19akufoa6g209q08amy7.gif",
      tableData: [
        {
          name: " ",
          purview: [0, 0, 0],
          type: 0,
          time: 0,
          description: "",
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
    headerStyle({ column, columnIndex }) {
      console.log(column);
      console.log(columnIndex);
      return "table-rowIndex";
    },
    //跳转新建页面
    information(id) {
      if (this.$store.state.userInfo.role.purview[0] === 0) {
        this.$message.info("你没有");
      } else {
        //将获取到的edit数据id push到路由中
        this.loading = true;
        //当点击编辑的时候出现加载
        //等1秒后跳转
        setTimeout(() => {
          this.$router.push(`/RoleEdit/${id}`);
        }, 1000);
      }
    },
    // 跳转编辑页面
    edit(id) {
      //向学生成绩编辑页面传递id
      this.loading = true;
      setTimeout(() => {
        this.$router.push(`/RoleEdit/${id}`);
      }, 1000);
      console.log();
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
          console.log(111);
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
  margin-top: 60px !important;
}
/* 权限按钮 */
.Authoritybotton {
  width: 80px;
  height: 40px;
}
/* 描述出的溢出隐藏 */
.anonymous {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 首行样式 */
.table-rowIndex {
  font-size: 24px;
}
.Avatar {
  width: 40px;
  height: 40px;
}
.el-image__inner,
.el-image__placeholder,
.el-image__error {
  width: 50%;
  height: 50%;
}
</style>
