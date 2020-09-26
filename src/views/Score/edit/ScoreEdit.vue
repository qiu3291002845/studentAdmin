<template>
  <div>
    <span @click="returns" class="returns">
      <span class="iconfont icon-fanhui1"></span>
      返回
    </span>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <!-- 姓名 -->
      <el-form-item style="width: 40%" label="学生姓名" prop="name">
        <el-input
          prefix-icon="el-icon-user"
          placeholder="请输入姓名"
          maxlength="8"
          show-word-limit
          clearable
          v-model="form.name"
        ></el-input>
      </el-form-item>

      <!-- 年龄 -->
      <el-form-item label="年龄" prop="age">
        <el-select
          v-model="form.age"
          filterable
          clearable
          placeholder="请输入选择年龄"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in optionData.age"
            :key="index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 出生日期 -->
      <el-form-item label="出生日期" style="width: 60%" prop="birthday">
        <el-col :span="11">
          <el-date-picker
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            placeholder="选择出生年月日"
            v-model="form.birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2"></el-col>
      </el-form-item>

      <!-- 所在系部 -->
      <el-form-item label="所在系部" prop="system">
        <el-select
          style="float: left"
          v-model="form.system"
          filterable
          clearable
          placeholder="请选择所在系部"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in optionData.list"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
        <el-form-item label="所在班级" prop="class" style="float: left">
          <el-select
            prop="class"
            v-model="form.class"
            filterable
            clearable
            placeholder="请选择所在班级"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="item in optionData.classList"
              :key="item.index"
              >{{ item }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form-item>

      <!-- 省份证 -->
      <el-form-item label="身份证号码" style="width: 40%" prop="idCard">
        <el-input
          prefix-icon="el-icon-postcard"
          placeholder="请输入你的身份证号码"
          maxlength="18"
          show-word-limit
          v-model="form.idCard"
        ></el-input>
      </el-form-item>
      <!-- 手机号码 -->
      <el-form-item
        style="width: 40%"
        maxlength="11"
        show-word-limit
        label="手机号码"
        prop="phone"
      >
        <el-input
          prefix-icon="el-icon-phone-outline"
          placeholder="请输入你的手机号码"
          maxlength="11"
          show-word-limit
          v-model="form.phone"
        ></el-input>
      </el-form-item>

      <!-- 政治面貌 -->
      <el-form-item label="政治面貌" prop="political">
        <el-select
          v-model="form.political"
          filterable
          clearable
          placeholder="请选择政治面貌"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in optionData.politicalList"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" style="width: 40%" prop="email">
        <el-input
          prefix-icon="el-icon-message"
          placeholder="请输入你的邮箱"
          v-model="form.email"
        ></el-input>
      </el-form-item>
      <!-- 民族 -->
      <el-form-item label="民族" style="width: 40%" prop="nation">
        <el-select
          v-model="form.nation"
          filterable
          clearable
          placeholder="请选择民族"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in optionData.nationList"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- 家庭住址 -->
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-cascader
          filterable
          clearable
          :options="optionData.homeAddress"
          @change="handleChange"
          v-model="homeAddress"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <!-- 加减分区域 -->
    <h3>平时成绩加减分区域</h3>
    <el-form ref="scoreForm" :model="scoreForm" label-width="100px">
      <el-form-item label="加减分情况">
        <el-radio-group v-model="scoreForm.type">
          <el-radio :label="1" value="1">加分</el-radio>
          <el-radio :label="0" value="0">减分</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="加减分分值">
        <el-input
          v-model="optionData.fraction"
          class="w300"
          type="number"
          @change="chengjifra"
          min="1"
          max="100"
        ></el-input>
      </el-form-item>
      <el-form-item label="加减分说明">
        <el-input
          class="w500"
          type="textarea"
          v-model="scoreForm.description"
          placeholder="请输入加减成绩说明"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即加分/减分</el-button>
      </el-form-item>
    </el-form>

    <h3>专业成绩加减区域</h3>
    <el-form class="demo-form-inline" label-width="100px">
      <el-form-item label="学期成绩">
        <el-select
          v-model="optionData.prodessions"
          @change="professionsns"
          placeholder="第一学期"
        >
          <el-option
            v-for="(item, index) in form.professionScore"
            :label="optionData.professionarr[index]"
            :key="index"
            :value="optionData.professionarr[index]"
            >{{ optionData.professionarr[index] }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="专业成绩">
        <el-input
          v-model="form.professionScore[optionData.profession][0].fullStack"
          placeholder="请输入专业成绩"
          value="fullstack"
          type="number"
          class="w300"
          min="0"
          max="100"
          @change="chegnjif"
        ></el-input>
      </el-form-item>
      <el-form-item label="素质成绩">
        <el-input
          v-model="form.professionScore[optionData.profession][0].quality"
          placeholder="请输入素质成绩"
          value="quality"
          type="number"
          class="w300"
          @change="chegnjiq"
          min="0"
          max="100"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button class="sbmit" type="primary" @click="sbmit">立即修改</el-button>
  </div>
</template>
<script>
import "./iconfont.css";
import shuju from "./jtzz.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      homeAddress: [],
      form: {
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
              quality: 52,
              fullStack: 95,
            },
          ],
          [
            {
              quality: 45,
              fullStack: 78,
            },
          ],
          [
            {
              quality: 56,
              fullStack: 67,
            },
          ],
          [
            {
              quality: 58,
              fullStack: 74,
            },
          ],
        ],
        name: "0",
        sex: "男",
        age: "1",
        birthday: "2000-01-01",
        idCard: "0",
        homeAddress: "河北-邯郸-丛台区",
        class: "0",
        system: "0",
        email: "0",
        political: "0",
        phone: "0",
        nation: "汉族",
      },
      scoreForm: {
        type: 1,
        time: "",
        fraction: 1,
        description: " ",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur",
          },
        ],
        birthday: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请选择年龄",
            trigger: "change",
          },
        ],
        system: [
          {
            required: true,
            message: "请选择所在系部",
            trigger: "change",
          },
        ],
        class: [
          {
            required: true,
            message: "请选择所在班级",
            trigger: "change",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        nation: [
          {
            required: true,
            message: "请选择民族",
            trigger: "change",
          },
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: "blur",
          },
          {
            min: 18,
            max: 18,
            message: "身份证号码不正确",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
          {
            min: 11,
            max: 11,
            message: "不是正确的手机号码",
            trigger: "blur",
          },
        ],
        political: [
          {
            required: true,
            message: "请选择政治面貌",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        homeAddress: [
          {
            required: true,
            message: "请选择家庭住址",
            trigger: "change",
          },
        ],
      },
      optionData: {
        homeAddress: shuju,
        age: [],
        list: ["信息工程", "学前教育", "经济管理", "机械信息工程", "小学教育"],
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
        ],
        nationList: ["汉族", "藏族", "苗族", "满族"],
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
        fraction: "1",
        profession: 0,
        prodessions: "第一学期",
        professionarr: ["第一学期", "第二学期", "第三学期", "第四学期"],
      },
    };
  },
  methods: {
    handleChange(e) {
      this.homeAddress = e;
      this.form.homeAddress = e.join("-");
    },
    returns() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.scoreForm.fraction = Number(this.optionData.fraction);
      let time = Number(new Date());
      this.scoreForm.time = time;
      this.form.usallyScore.push([this.scoreForm]);
      this.$message({
        message: "学生个人平时成绩添加成功",
        type: "success",
      });
    },
    chegnjif(val) {
      if (val < 0) {
        this.form.professionScore[this.optionData.profession][0].fullStack = 1;
      } else if (val > 100) {
        this.form.professionScore[
          this.optionData.profession
        ][0].fullStack = 100;
      }
    },
    chegnjiq(val) {
      if (val < 0) {
        this.form.professionScore[this.optionData.profession][0].quality = 1;
      } else if (val > 100) {
        this.form.professionScore[this.optionData.profession][0].quality = 100;
      }
    },

    chengjifra(val) {
      if (val < 0) {
        this.optionData.fraction = 1;
      } else if (val > 100) {
        this.optionData.fraction = 100;
      }
    },
    initAge() {
      for (let i = 1; i < 80; i++) {
        this.optionData.age[i] = i;
      }
    },
    async findStudent() {
      const { data } = await this.$http.get(`/student/${this.id}`);
      this.form = data.data;
      console.log(data.data);
    },
    professionsns() {
      if (this.optionData.prodessions === "第一学期") {
        this.optionData.profession = 0;
      } else if (this.optionData.prodessions === "第二学期") {
        this.optionData.profession = 1;
      } else if (this.optionData.prodessions === "第三学期") {
        this.optionData.profession = 2;
      } else if (this.optionData.prodessions === "第四学期") {
        this.optionData.profession = 3;
      } else {
        this.optionData.profession = 0;
      }
    },
    inithomeAdders() {
      this.homeAddress = this.form.homeAddress.split("-");
    },
    sbmit() {
      this.$http.put(`/student/${this.id}`, this.form);
      this.$message({
        message: "学生信息修改成功过，正在跳转个人信息页面",
        type: "success",
      });
      this.$router.push(`/details/${this.id}`);
    },
  },
  created() {
    this.initAge();
    this.findStudent();
    this.inithomeAdders();
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
h3 {
  margin: 50px 0 30px 20px;
  font-weight: bold;
}
.w300 {
  width: 300px;
}
.w500 {
  width: 500px;
}
.sbmit {
  text-align: center;
  margin-left: 30%;
}
.returns {
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 5px;
  margin: 0 0 50px 30px;
  padding: 0 0 50px 0;
}
.el-form {
  margin-top: 30px;
}
</style>