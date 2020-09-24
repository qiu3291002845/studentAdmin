<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!--点击小箭头内部东西-->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="系别">
              <span>{{ props.row.system }}</span>
            </el-form-item>
            <el-form-item label="班级">
              <span>{{ props.row.class }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.idCard }}</span>
            </el-form-item>

            <el-form-item>
              <el-form-item v-if="props.row.professionScore == 0">
                <p class="asss">{{ "专业成绩" + " " + "您现在还没有成绩" }}</p>
              </el-form-item>
              <el-form-item
                v-else
                v-for="(item, index) in props.row.professionScore"
                :key="index"
                class="paaa"
              >
                <p class="asss">
                  {{
                    `平时成绩${index + 1}学期` + " " + item[0].fullStack + "分"
                  }}
                </p>
              </el-form-item>
            </el-form-item>

            <el-form-item>
              <el-form-item v-if="props.row.professionScore == 0">
                <p class="asss">{{ "平时成绩" + " " + "您现在还没有成绩" }}</p>
              </el-form-item>
              <el-form-item
                v-else
                v-for="(items, index) in props.row.professionScore"
                :key="index"
                class="pass"
              >
                <p class="asss">
                  {{
                    `专业成绩${index + 1}学期` + " " + items[0].quality + "分"
                  }}
                </p>
              </el-form-item>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!--点击小箭头内部东西 结束-->
      <el-table-column type="index" label="编号" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60"></el-table-column>
      <el-table-column prop="system" label="系别" width="100"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column label="本学期平时成绩评价">
        <el-row slot-scope="scope">
          <!-- <span>{{scope}}</span> -->

          <div v-if="scope.row.usallyScore.length == 0">
            {{ "暂时无成绩!!!" }}
          </div>
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
      <el-table-column prop="name" label="编辑/个人信息" width="230">
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
      <el-table-column label>
        <template slot="header" slot-scope="scope">
          <span v-if="false">{{ scope }}</span>
          <el-input
            v-model="search"
            @input="inputpsousuo"
            placeholder="输入关键字搜索"
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
      input: "",
      search: "",
      // value: "",
      pagedata: 30,
      count: 1,
      totaldata: 10,
      pageSize: 5,
      // inputpsousuo: "",
      tableData: [],
      options: [
        {
          value: "选项1",
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
      this.pageSize = e;
      this.findStudent();
    },
    edit(id) {
      this.$router.push(`/ScoreEdit/${id}`);
    },
    information(id) {
      this.$router.push(`/details/${id}`);
    },
    async inputpsousuo() {
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
        this.totaldata = res.data.total;
        console.log(this.tableData);
        console.log(this.totaldata);
      }
    },
    async findTotal() {
      const { data } = await this.$http.get(`/student`);
      this.totaldata = data.total;
    },
    async findStudent() {
      const { data } = await this.$http.get(
        `/student?count=${this.count}&pageSize=${this.pageSize}`
      );
      this.tableData = data.data;
    },
    async currentChange(e) {
      this.count = e;
      if (this.search === "") {
        const { data } = await this.$http.get(
          `/student?count=${e}&pageSize=${this.pageSize}`
        );
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
