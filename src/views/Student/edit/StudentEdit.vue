<template>
  <div>
    <span @click="returns" class="returns">
      <span class="iconfont icon-fanhui1"></span>
      返回
    </span>
    <h3 class="mt-4" style="margin-bottom: 1.75rem">
      {{ id ? "编辑" : "创建" }}学生
    </h3>
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="100px"
    >
      <el-form-item style="width: 40%" label="学生姓名" prop="name">
        <el-input
          prefix-icon="el-icon-user"
          placeholder="请输入姓名"
          maxlength="6"
          show-word-limit
          clearable
          v-model="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-select
          v-model="ruleForm.age"
          filterable
          clearable
          placeholder="请输入选择年龄"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in ageList"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" style="width: 60%" prop="birthday">
        <el-col :span="11">
          <el-date-picker
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            placeholder="选择出生年月日"
            v-model="ruleForm.birthday"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2"></el-col>
      </el-form-item>

      <el-form-item label="所在系部" prop="system">
        <el-select
          style="float: left"
          v-model="ruleForm.system"
          filterable
          clearable
          placeholder="请选择所在系部"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in list"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
        &nbsp;&nbsp;
        <el-form-item label="所在班级" prop="class" style="float: left">
          <el-select
            prop="class"
            v-model="ruleForm.class"
            filterable
            clearable
            placeholder="请选择所在班级"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="item in classList"
              :key="item.index"
              >{{ item }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item label="身份证号码" style="width: 40%" prop="idCard">
        <el-input
          prefix-icon="el-icon-postcard"
          placeholder="请输入你的身份证号码"
          maxlength="18"
          show-word-limit
          v-model="ruleForm.idCard"
        ></el-input>
      </el-form-item>
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
          v-model="ruleForm.phone"
        ></el-input>
      </el-form-item>

      <el-form-item label="政治面貌" prop="political">
        <el-select
          v-model="ruleForm.political"
          filterable
          clearable
          placeholder="请选择政治面貌"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in politicalList"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" style="width: 40%" prop="email">
        <el-input
          prefix-icon="el-icon-message"
          placeholder="请输入你的邮箱"
          v-model="ruleForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="民族" style="width: 40%" prop="nation">
        <el-select
          v-model="ruleForm.nation"
          filterable
          clearable
          placeholder="请选择民族"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in nationList"
            :key="item.index"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-cascader
          filterable
          clearable
          :options="options"
          @change="handleChange"
          v-model="homeAddress"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!id" type="primary" @click="submitForm('ruleForm')"
          ><i class="el-icon-thumb"></i>&nbsp;立即创建
        </el-button>
        <el-button v-else type="primary" @click="updateForm('ruleForm')"
          >立即修改</el-button
        >
        <el-button @click="resetForm('ruleForm')"
          ><i class="el-icon-refresh-right"></i>&nbsp;重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-button
      style="background: none; border: none"
      plain
      @click="open4"
    ></el-button>
  </div>
</template>

<script>
import shuju from "./jtzz.js";
export default {
  name: "StudentEdit",
  watch: {
    $route: function (e) {
      if (e.path == "/edit") {
        this.ruleForm = {};
        this.$refs["ruleForm"].resetFields();
      }
    },
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      homeAddress: "",
      name: "",
      ruleForm: {
        name: "", //姓名
        sex: "", //性别
        age: "", //年龄
        birthday: "", //出生日期
        idCard: "", //身份证号码
        homeAddress: "", //家庭住址
        class: "", //班级
        system: "", //系部
        email: "", //邮箱
        political: "", //政治面貌
        phone: "", //手机
        nation: "", //民族
        usallyScore: [],
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
      },

      //规则验证
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
      value: [],
      options: shuju,
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
      nationList: ["汉族", "藏族", "苗族", "满族"],
    };
  },
  methods: {
    handleChange(e) {
      const home = e;
      this.ruleForm.homeAddress = home.join("-");
    },
    async onLoad() {
      try {
        const { data } = await this.$http.get(`/student/${this.id}`);
        this.homeAddress = data.data.homeAddress.split("-");
        this.ruleForm = data.data;
        try {
          this.ruleForm = data.data;
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    },
    returns() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.post("/student", this.ruleForm);
            this.$message.success("创建成功");
            this.homeAddress = "";
            this.$refs[formName].resetFields();
            this.$router.push("/");
          } catch (err) {
            console.log(err);
          }
        } else {
          return false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$http.put(`/student/${this.id}`, this.ruleForm);
            this.$message.success("修改成功");
            this.homeAddress = "";
            this.$refs[formName].resetFields();
            this.$router.push("/");
          } catch (err) {
            console.log(err);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.homeAddress = "";
    },
    async open4() {
      try {
        const { data } = await this.$http.get(`/student/${this.id}`);
        this.name = data.data.name;
        this.$notify({
          title: this.name + " 你好啊",
          message: "欢迎来到属于你自己的编辑页面",
          position: "top-right",
        });
      } catch (error) {
        this.$router.push("/");
        this.$message.info("请传递正确的ID值");
      }
    },
  },
  // 进入组件时执行
  created() {
    if (this.id) {
      this.onLoad();
      try {
        this.open4();
      } catch (err) {
        console.log(err);
      }
    } else {
      this.$notify({
        title: "欢迎来到创建用户的界面",
        message: "在这里你可以尽情的书写你的信息",
        position: "top-right",
      });
    }
  },
};
</script>

<style>
.returns {
  margin-right: 30px;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  cursor: pointer;
}
</style>
