<template>
  <div>
    <div>
      <el-form
        :model="studentInfo"
        label-width="100px"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名" required>
          <el-input
            v-model="studentInfo.name"
            :disabled="!id"
            placeholder="请输入你的姓名"
          ></el-input>
        </el-form-item>
        <!--性别  -->
        <el-form-item label="性别" required>
          <el-radio-group
            v-model="studentInfo.sex"
            :disabled="!id"
            class="Department"
          >
            <el-radio label="男" value="男"></el-radio>
            <el-radio label="女" value="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄" required>
          <el-select
            class="Department"
            v-model="studentInfo.age"
            placeholder="请输入你的年龄"
            :disabled="!id"
            style="width:20%"
          >
            <el-option
              :label="age"
              :value="age"
              v-for="(age, id) in ageList"
              :key="id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--出生日期  -->
        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="studentInfo.birthday"
                value-format="timestamp"
                style="width:50%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!--邮箱-->
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="studentInfo.email" :disabled="!id"></el-input>
        </el-form-item>
        <!-- 民族 -->
        <el-form-item label="民族" required>
          <el-select
            class="Department"
            v-model="studentInfo.nation"
            placeholder="请选择民族"
            :disabled="!id"
            style="width:20%"
          >
            <el-option
              :label="nation"
              v-for="(nation, id) in nationList"
              :key="id"
              :value="id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- phone -->
        <el-form-item label="电话号码" required>
          <el-input
            v-model="studentInfo.phone"
            value="phone"
            :disabled="!id"
          ></el-input>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item label="身份证号" required>
          <el-input v-model="studentInfo.idCard" :disabled="!id"></el-input>
        </el-form-item>
        <!--政治面貌-->
        <el-form-item label="团关系" required>
          <el-select
            v-model="studentInfo.political"
            placeholder="请选择您的关系"
            class="Department"
            style="width:20%"
            :disabled="!id"
          >
            <el-option
              :label="political"
              v-for="(political, id) in politicalList"
              :key="id"
              :value="id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 班级系部 -->
        <el-form-item label="选择班系" required>
          <!-- 班级 -->
          <el-select
            v-model="studentInfo.system"
            placeholder="请选择系部"
            class="Department"
            style="width:20%"
            :disabled="!id"
          >
            <el-option
              :label="item"
              v-for="(item, id) in list"
              :key="id"
              :value="id"
            ></el-option>
          </el-select>
          <!-- 系部 -->
          <el-select
            v-model="studentInfo.class"
            placeholder="请选择班级"
            class="Departmentone"
            style="width:20%"
            :disabled="!id"
          >
            <el-option
              :label="List"
              v-for="(List, id) in classList"
              :value="List"
              :key="id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 平时成绩加减分部分 -->
        <div class="demo-input-suffix  usuallybox">
          <!-- 平时成绩加减分情况 -->
          <h1 class="h1">平时成绩加减分情况</h1>
          <div class="page">
            <el-form-item label="加分减分" class="fractionOne">
              <el-radio-group v-model="usally[0].type">
                <el-radio :label="1" value="jiafen">加分</el-radio>
                <el-radio :label="0" value="jianfen">减分</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="加减分数" class="fractionTwo">
              <el-input-number
                :min="1"
                :max="10"
                label="描述文字"
                placeholder="请选择分值"
                v-model="usally[0].fraction"
                @change="handleChange"
                :value="usally[0].fraction"
              ></el-input-number>
            </el-form-item>
            <!--加减分详情  -->
            <el-form-item label="加减分详情" class="fractionFour">
              <el-input
                type="textarea"
                style="width:65%"
                v-model="usally[0].description"
                placeholder="请输入缘由"
              ></el-input>
            </el-form-item>
            <el-button
              type="success"
              @click="addusally"
              plain
              class="bottonClas"
              >添加平时成绩</el-button
            >
          </div>
        </div>
        <!-- 专业部分 -->
        <div class="demo-input-suffix  professionbox">
          <h1 class="h1">专业成绩分数详情</h1>
          <div class=" page  ">
            <div class="one">
              <el-form-item label="学期成绩">
                <!-- 班级 -->
                <el-select
                  placeholder="请选择第几学期"
                  style="width:20%"
                  :disabled="!id"
                  v-model="same"
                >
                  <el-option
                    :label="seme"
                    v-for="(seme, id) in semester"
                    :key="id"
                    :value="seme"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="oneCopy">
              <el-form-item label="专业成绩">
                <el-input
                  placeholder="请填入全栈成绩"
                  v-model="studentInfo.professionScore[sames][0].fullStack"
                  :disabled="!id"
                  class="selectionperiodCopy"
                  :rules="[
                    { required: true, message: '年龄不能为空' },
                    { type: 'number', message: '年龄必须为数字值' },
                  ]"
                >
                </el-input>
                <el-input
                  placeholder="请填入素质成绩"
                  v-model="studentInfo.professionScore[sames][0].quality"
                  :disabled="!id"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- 修改 -->
        <el-form-item class="Button">
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>
        <!--  -->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      same: "",
      sames: 0,
      studentInfo: {
        time: "",
        usallyScore: [
          {
            type: 1,
            time: "",
            fraction: 0,
            description: " ",
          },
        ],
        professionScore: [
          [
            {
              quality: 0,
              fullStack: 0,
            },
          ],
          [
            {
              quality: 0,
              fullStack: 0,
            },
          ],
          [
            {
              quality: 0,
              fullStack: 0,
            },
          ],
          [
            {
              quality: 0,
              fullStack: 0,
            },
          ],
        ],
        name: "0",
        sex: "男",
        age: "0",
        birthday: "2000-01-01",
        idCard: "0",
        homeAddress: "0",
        class: "0",
        system: "0",
        email: "0",
        political: "0",
        phone: "0",
        nation: "汉族",
      },
      usally: [
        {
          type: 1,
          time: 0,
          fraction: 1,
          description: " ",
        },
      ],
      list: ["信息工程", "学前教育", "经济管理", "机械信息工程", "小学教育"],
      ageList: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      politicalList: [
        "中共党员",
        "中共预备党员",
        "共青团员",
        "民革党员",
        "民盟盟员",
        "民建会员",
        "民进会员",
        "农工党党员",
        "致公党党员",
        "九三学社社员",
        "台盟盟员",
        "无党派人士",
        "群众",
      ],
      classList: [
        "1901",
        "1902",
        "1903",
        "1904",
        "1905",
        "1906",
        "1907",
        "1908",
        "1909",
        "1910",
      ],
      semester: ["第一学期", "第二学期", "第三学期", "第四学期"],
      nationList: [
        "汉族",
        "藏族",
        "苗族",
        "满族",
        "汉族",
        "满族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "侗族",
        "瑶",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
      ],
      usallyScore: [],
    };
  },
  methods: {
    async addusally() {
      this.usally[0].time = Number(new Date());
      this.studentInfo.usallyScore.splice(0, 1, this.usally);
      await this.$http.put(`/student/${this.id}`, this.studentInfo);
    },
    inputshuru(val) {
      console.log(val);
    },
    onSubmit() {
      this.$http.put(`/student/${this.id}`, this.studentInfo);
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success",
      });
    },
    handleChange(value) {
      console.log(value);
    },
    async findStudent() {
      const { data } = await this.$http.get(`student/${this.id}`);
      this.studentInfo = data.data;
      if (data.data === null) {
        this.$router.go(-1);
      }
    },
  },

  watch: {
    same(n) {
      if (n === "第一学期") {
        this.sames = 0;
        console.log(this.sames);
        console.log(this.value);
      } else if (n === "第二学期") {
        this.sames = 1;
        console.log(this.sames);
      } else if (n === "第三学期") {
        this.sames = 2;
        console.log(this.sames);
      } else if (n === "第四学期") {
        this.sames = 3;
        console.log(this.sames);
      } else {
        this.sames = 0;
        console.log(this.sames);
      }
    },
  },
  created() {
    this.findStudent();
  },
};
</script>
<style scoped>
.el-input {
  width: 300px;
  margin: 0 10px 0 10px;
}
/* 班级系部 */
.Department {
  margin-left: 1%;
}
/* 班级系部 */
.Departmentone {
  margin-left: 2%;
}
.h1 {
  text-indent: 25px;
}
.usuallybox {
  margin-top: 5%;
}
.usuallybox .page {
  margin-left: 8%;
}

.fractionOne,
.fractionTwo,
.fractionThree,
.fractionFour,
.fractionFive,
.fractionSix {
  margin-top: 3%;
}
.professionbox {
  margin-top: 5%;
}
.professionbox .page {
  margin-left: 8%;
}
.professionbox .one {
  margin-top: 3%;
}
.professionbox .oneCopy {
  margin-left: 0.5%;
}
.professionbox .input {
  margin-left: 2.5%;
}
.selectionperiod {
  margin-left: -0.1%;
}
.selectionperiodCopy {
  margin-left: -0.5%;
}
.Button {
  margin-top: 5%;
}
.bottonClas {
  float: right;
  margin-right: 31.5%;
}
</style>
