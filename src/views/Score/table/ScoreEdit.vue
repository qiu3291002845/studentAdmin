<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
            <el-form-item
              :label="`平时成绩${index+1}学期`"
              v-for="(item,index) in props.row.professionScore"
              :key="index"
              v-bind="frofess"
            >
              <span>{{ item.profession + "分"}}</span>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-form-item
              :label="`专业成绩${index+1}学期`"
              v-for="(items,index) in props.row.professionScore"
              :key="index"
            >
              <span>{{ items.quality + "分" }}</span>
            </el-form-item>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column type="index" label="编号" width="60"></el-table-column>
    <el-table-column prop="name" label="姓名" width="80"></el-table-column>
    <el-table-column prop="sex" label="性别" width="60"></el-table-column>
    <el-table-column prop="system" label="系别" width="100"></el-table-column>
    <el-table-column prop="class" label="班级" width="80"></el-table-column>
    <el-table-column label="本学期平时成绩">
      <el-row slot-scope="scope">
        <!-- <span>{{scope}}</span> -->

        <div v-if="scope.row.usallyScore == 0">{{'您里面没有东西!!!'}}</div>
        <el-tooltip
          class="item"
          effect="light"
          :content="scope.row.usallyScore[0].description"
          placement="top"
          v-else
        >
          <div class="shenglue">{{scope.row.usallyScore[0].description}}</div>
        </el-tooltip>
      </el-row>
    </el-table-column>
    <el-table-column label="本学期专业成绩">
      <el-row slot-scope="scope">
        <div v-if="scope.row.professionScore == 0">{{'您里面没有东西!!!'}}</div>
        <div v-else>{{"专业成绩：" + scope.row.professionScore[0].quality}}</div>
      </el-row>
    </el-table-column>
    <el-table-column prop="name" label="编辑/个人信息" width="230">
      <el-row slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="进入编辑信息" placement="top">
          <el-button @click="edit(scope.row._id)">编辑</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="个人详情" placement="top">
          <el-button @click="information(scope.row._id)">个人信息</el-button>
        </el-tooltip>
      </el-row>
    </el-table-column>
    <el-table-column label="搜索">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-table-column>
    <!--删除-->
    <!-- <el-table-column
      prop="delete"
      label="是否删除">
      <div class="dele">
        <el-button type="danger" icon="el-icon-delete" @click="delet(index)"></el-button>
      </div>
    </el-table-column>-->
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      input: "",
      tableData: [
        {
          _id: 100001,
          name: "张小宁",
          sex: "女",
          age: "19",
          birthday: "2000-01-01",
          idCard: "1304212000XXXXXXXX",
          homeAddress: "河北省邯郸市丛台区",
          class: "1903",
          system: "信息工程系",
          email: "xxxxx@qq.com",
          political: "群众",
          phone: "15100404109",
          nation: "汉族",
          usallyScore: [
            {
              time: "", /// 时间
              type: 0, // 0是减分  // 1 是加分
              score: 3, // 加减分的数值
              description: "sdasd111111111111111111111111111111111111110", // 加减分的说明
            },
          ],
          professionScore: [
            // {
            //   profession: 15,
            //   quality: 30,
            // },
            // {
            //   profession: 85,
            //   quality: 62,
            // },
            // {
            //   profession: 74,
            //   quality: 41,
            // },
          ],
        },
      ],
    };
  },
  methods: {
    edit(id) {
      this.$router.push(`/awdwa/${id}`);
    },
    information(id) {
      this.$router.push(`/details/${id}`);
    },

    async findStudent() {
      const { data } = await this.$http.get("/student");
      console.log(data.data);
      this.tableData = data.data;
    },
  },
  created() {
    this.findStudent();
  },
  watch: {},
  computed: {},
  //过滤
  filters: {},
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
</style>
