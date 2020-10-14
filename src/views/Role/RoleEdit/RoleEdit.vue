<template>
  <div class="total">
    <p class="Navigation">
      <el-breadcrumb separator="|">
        <el-breadcrumb-item :to="{ path: '|' }">
          <span class="iconfont icon-ai207 iconsize"></span>
          <span @click="returns" class=""> 上一页 </span>
        </el-breadcrumb-item>
        <el-breadcrumb-item class="roleedit">角色编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <el-form
      :model="title"
      :rules="rules"
      ref="title"
      label-width="60px"
      class="demo-title"
    >
      <el-form-item label="" prop="name">
        <!-- 用户 -->
        <span class="iconfont icon-user user"></span>
        <el-input
          type="text"
          placeholder="角色名"
          v-model="title.name"
          class="name"
          maxlength="10"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <!-- 角色名称结束 -->
      <el-form-item label="" prop="description" class="Role">
        <span class="iconfont icon-jiaosejieshao jiaosejieshao"></span>
        <el-input
          type="textarea"
          placeholder="角色介绍"
          v-model="title.description"
          maxlength="30"
          show-word-limit
          class="Text-field"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="resource">
        <div class="Auth">
          <span class="iconfont icon-quanxian Authority">
            <p>权限管理</p>
          </span>
          <template class="Auth-radio" v-if="id">
            <el-checkbox-group v-model="purview" v-if="title.name !== ''">
              <!-- 绑定学生老师权限 -->
              <el-checkbox
                label="purviewCreate"
                v-model="purviewCreate"
                @change="changeCreate"
                :checked="purviewCreate == 1"
                >新建权限</el-checkbox
              >
              <el-checkbox
                label="purviewEdit"
                v-model="purviewEdit"
                @change="changeEdit"
                :checked="purviewEdit == 1"
                >编辑权限</el-checkbox
              >
              <el-checkbox
                label="purviewDelete"
                v-model="purviewDelete"
                @change="changeDelete"
                :checked="purviewDelete == 1"
                >删除权限</el-checkbox
              >
            </el-checkbox-group>
            <div v-else>暂时没有任何权限,请检测您的网速</div>
          </template>
          <template class="Auth-radio" v-else>
            <el-checkbox-group v-model="purview">
              <!-- 绑定学生老师权限 -->
              <el-checkbox
                label="purviewCreate"
                v-model="purviewCreate"
                @change="changeCreate(0)"
                >新建权限</el-checkbox
              >
              <el-checkbox
                label="purviewEdit"
                v-model="purviewEdit"
                @change="changeCreate(1)"
                >编辑权限</el-checkbox
              >
              <el-checkbox
                label="purviewDelete"
                v-model="purviewDelete"
                @change="changeCreate(2)"
                >删除权限</el-checkbox
              >
            </el-checkbox-group>
          </template>
        </div>
      </el-form-item>
      <el-button
        type="primary"
        @click="submitForm('title')"
        class="Submit"
        v-if="!id"
        >创建数据</el-button
      >
      <el-button
        type="primary"
        @click="Information('title')"
        class="Submit"
        v-else
        >修改信息</el-button
      >
    </el-form>
  </div>
</template>
<script>
import "./iconfont.css";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      isCreate: 0,
      purviewCreate: 0,
      purviewEdit: 0,
      purviewDelete: 0,
      text: "",
      textarea: "",
      purview: [],
      title: {
        type: 0,
        description: "",
        purview: [0, 0, 0],
        name: "",
        img: "",
      },
      rules: {
        name: [
          { required: true, message: "姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        description: [
          { required: true, message: "请填写活动形式", trigger: "blur" },
        ],
      },
      ruleForm: {
        name: "",
        resource: "",
        desc: "",
      },
      allStudent: [],
      totalType: 0,
    };
  },
  methods: {
    returns() {
      this.$router.go(-1);
    },
    // 修改数据
    async Information() {
      this.title.time = Number(new Date());
      await this.$http.put(`/role/${this.id}`, this.title);
      this.$router.push("/rolelist");
    },
    // 接收id
    findStudent() {
      this.$http.get(`/role/${this.id}`).then((res) => {
        this.title = res.data.data;
        this.purviewCreate = this.title.purview[0];
        this.purviewEdit = this.title.purview[1];
        this.purviewDelete = this.title.purview[2];
      });
    },
    changeCreate(e) {
      for (let i = 0; i < 4; i++) {
        if (e === i) {
          if (this.title.purview[i] == 1) {
            this.purviewCreate = 0;
            this.title.purview[i] = this.purviewCreate;
          } else {
            this.purviewCreate = 1;
            this.title.purview[i] = this.purviewCreate;
          }
        }
      }
    },
    //创建
    submitForm(title) {
      this.$refs[title].validate(async (valid) => {
        if (valid) {
          this.title.time = Number(new Date());
          //上传信息
          await this.$http.post("/role", this.title);
          this.$router.push("/RoleList");
        } else {
          return false;
        }
      });
    },

    resetForm(title) {
      this.$refs[title].resetFields();
    },

    async ViewRole() {
      const { data } = await this.$http.get(`/role`);
      this.title.type = data.data.length + 1;
      console.log(this.title.type);
    },
  },
  mounted() {
    this.id && this.findStudent();
    this.ViewRole();
  },
};
</script>
<style scoped>
.Navigation {
  height: 3.125rem;
  padding-left: 6.25rem;
  line-height: 3.125rem;
  font-size: 1.125rem;
  margin-left: -2.5rem;
  margin-bottom: 1.25rem;
  margin-top: 1.25rem;
}
.roleedit {
  font-size: 1.125rem;
}
.iconsize {
  font-size: 1.5rem;
}
.position {
  margin-left: 3.125rem;
}
.name {
  width: 16rem;
  margin-left: 1.25rem;
}
.Text-field {
  width: 37.5rem;
  margin-left: 2.25rem;
}
.Role {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.jiaosejieshao {
  position: absolute;
}
.Auth {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -1.125rem;
}
.Auth > .Auth-radio {
  margin-top: 18.75rem;
}
.Authority {
  font-size: 1.125rem;
  text-align: center;
  margin-right: 1.875rem;
}
.Authority > p {
  font-size: 12px;
}
/*提交信息*/
.Submit {
  margin: 1.25rem 0 0 18.75rem;
}
</style>
