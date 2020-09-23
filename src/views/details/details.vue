<template>
  <div class="details">
    <span @click="returns" class="returns">
      <span class="iconfont icon-fanhui1"></span>
      返回
    </span>
    <el-divider class="headerStudent" content-position="left">学生基本信息</el-divider>
    <header>
      <div class="avatar">
        <div class="demo-image__preview image">
          <el-image
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1045179699,1407021187&fm=26&gp=0.jpg"
            :preview-src-list="['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1045179699,1407021187&fm=26&gp=0.jpg']"
          ></el-image>
        </div>
      </div>
      <div class="name">
        <p>
          {{obj.name}}
          <sub>{{obj.sex}} · {{obj.age}}</sub>
        </p>
      </div>
      <div class="basic">
        <ul>
          <li>
            <span class="iconfont icon-zhuzhi_chengshi"></span>
            <span>{{obj.homeAddress}}</span>
          </li>
          <li>
            <span class="iconfont icon-yunpingtaiicon-"></span>
            <span>{{obj.email}}</span>
          </li>
          <li>
            <span class="iconfont icon-shouji"></span>
            <span>{{obj.phone}}</span>
          </li>
          <li>
            <span class="iconfont icon-credentials_icon"></span>
            <span>{{obj.idCard}}</span>
          </li>
          <li>
            <span class="iconfont icon-yuanxibumen"></span>
            <span>{{obj.system}}</span>
          </li>
          <li>
            <span class="iconfont icon-banji"></span>
            <span>{{obj.class}}</span>
          </li>
          <li>
            <span class="iconfont icon-chushengriqi"></span>
            <span>{{obj.birthday}}</span>
          </li>
          <li>
            <span class="iconfont icon-zhengzhimianmao"></span>
            <span>{{obj.political}}</span>
          </li>
        </ul>
      </div>
    </header>
    <section>
      <h3>个人专业成绩</h3>
      <p>Personal professional performance</p>
      <div v-if="obj.professionScore != false">
        <h2>暂无成绩</h2>
      </div>
      <ul>
        <li v-for="(item,index) in obj.professionScore" :key="index">
          <div class="professionScore">
            <div class="profession" :style="{height:item[0].fullStack + '%'}">
              <span>{{item[0].fullStack}}</span>
            </div>
            <div class="quality" :style="{height:item[0].quality+'%'}">
              <span>{{item[0].quality}}</span>
            </div>
          </div>
        </li>
        <div>
          <p class="box pro"></p>专业成绩
          <p class="box qua"></p>素质成绩
        </div>
      </ul>
    </section>
    <footer>
      <h3>个人平时表现明细</h3>
      <p>Personal performance details</p>
      <div v-show="obj.usallyScore != false">
        <h2>暂无成绩</h2>
      </div>
      <ul>
        <li v-for="(item,indexn) in obj.usallyScore" :key="indexn">
          <div class="conent">
            <p class="header">
              分值变化 ：
              <span v-if="item[0].type === 1">+</span>
              <span v-if="item[0].type === 0">-</span>
              {{item[0].fraction}}
            </p>
            <p
              class="dete"
            >{{item[0].time | timeModify(item[0].time)}} {{item[0].time | tiemModitys(item[0].time)}}</p>
            <p class="sec">增扣分原因 ： {{item[0].description}}</p>

            <div class="button">
              <el-button type="text" @click="trundrawer(indexn)">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
              </el-button>
              <el-drawer
                class="drawer"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="rtl"
                ref="drawer"
                :modal="true"
              >
                <div class="demo-drawer__content">
                  <div class="form">
                    <h1>修改平时成绩</h1>
                    <p>
                      分值变化：
                      <span v-if="drawerobj.type === 1">+</span>
                      <span v-if="drawerobj.type === 0">-</span>
                      <input
                        type="text"
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                        v-model="drawerobj.fraction"
                      />
                    </p>
                    <p>
                      增扣分原因：
                      <input type="text" v-model="drawerobj.description" />
                    </p>
                  </div>
                  <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button
                      type="primary"
                      @click="sbmit"
                      :loading="loading"
                    >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                  </div>
                </div>
              </el-drawer>
              <el-button type="text" @click="open(indexn)">
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </el-button>
            </div>
          </div>
        </li>
      </ul>
      <p>综合分数：{{Comprehensive}}</p>
    </footer>
  </div>
</template>
<script>
import moment from "moment";
import "./iconfont.css";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      loading: false,
      index: 0,
      drawerobj: {},
      obj: {
        name: "牛天罡",
        sex: "女",
        age: "98",
        birthday: "1954-01-01",
        idCard: "1304212000XXXXXXXX",
        homeAddress: "河北省邯郸市丛台区",
        class: "1909",
        system: "信息安全系",
        email: "1409410318@qq.com",
        political: "傻逼",
        phone: "15100404109",
        nation: "伊拉克族",
        usallyScore: [],
        professionScore: [],
      },
    };
  },
  computed: {
    Comprehensive() {
      let num = 0;
      for (let i = 0; i < this.obj.usallyScore.length; i++) {
        if (this.obj.usallyScore[i][0].type) {
          num += this.obj.usallyScore[i][0].fraction * 1;
        } else {
          num -= this.obj.usallyScore[i][0].fraction * 1;
        }
      }
      return num;
    },
  },
  methods: {
    returns() {
      this.$router.go(-1);
    },
    async findStudent() {
      const { data } = await this.$http.get(`/student/${this.id}`);
      this.obj = data.data;
      if (data.statusCode === 200) {
        this.$message.success("欢迎查看" + this.obj.name + "的信息");
      }
    },
    deteusally(index) {
      this.obj.usallyScore.splice(index, 1);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    trundrawer(i) {
      this.index = i;
      this.drawerobj = {
        time: this.obj.usallyScore[i][0].time,
        type: this.obj.usallyScore[i][0].type,
        fraction: this.obj.usallyScore[i][0].fraction,
        description: this.obj.usallyScore[i][0].description,
      };
      this.dialog = true;
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    sbmit() {
      this.loading = true;
      setTimeout(() => {
        this.dialog = false;
        this.loading = false;
        clearTimeout(this.timer);
      }, 1000);
      this.obj.usallyScore.splice(this.index, 1, [this.drawerobj]);
      this.$http.put(`student/${this.id}`, this.obj);
      this.$message.success("更改成功");
    },
    open(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.deteusally(index);
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
    if (!this.id) {
      this.$router.push("/");
    }
    this.findStudent();
  },
  filters: {
    timeModify: function (val) {
      var d = moment(new Date(parseInt(val))).format("YYYY-MM-DD");
      return d;
    },
    tiemModitys: function (val) {
      var d = moment(new Date(parseInt(val))).format("HH:mm:ss");
      return d;
    },
  },
};
</script>
<style lang="scss" scope>
ul {
  list-style: none;
}
#el-drawer__title {
  display: none;
}
.returns {
  margin-right: 30px;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  cursor: pointer;
}
.details {
  .headerStudent {
    font-size: 25px;
  }
  width: 95%;
  margin: 0 auto;
  header {
    color: #fff;
    padding: 20px;
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #00bdbf;
    align-items: center;
    .image {
      width: 170px;
      height: 170px;
      border: #00bdbf 3px solid;
      border-radius: 50% !important;
      overflow: hidden;
      text-align: center;
      margin-top: -85px;
    }
    .name {
      font-size: 30px;
      margin: 15px 0;
      margin-top: 25px;
      sub {
        margin-left: 30px;
        font-size: 18px;
      }
    }
    .basic {
      ul {
        margin: 0 auto;
        li {
          display: inline-block;
          width: 260px;
          font-size: 18px;
          margin: 10px 0;
          text-align: left;
          span {
            padding: 0 4px;
          }
        }
      }
    }
  }
  section {
    margin: 80px 0;
    text-align: center;
    h3 {
      line-height: 80px;
      font-size: 25px;
    }
    ul {
      li {
        width: 150px;
        height: 150px;
        display: inline-block;
        // background: red;
        margin: 50px 50px;
        text-align: right;
        position: relative;
        .professionScore {
          color: #000;
          .profession {
            width: 60px;
            text-align: center;
            background: rgba(0, 180, 69, 0.5);
            position: absolute;
            bottom: -20px;
            border-radius: #000 1px solid;
            left: 0;
            span {
              position: absolute;
              top: -20px;
              left: 20px;
            }
          }
          .quality {
            width: 60px;
            text-align: center;
            background-color: rgba(15, 0, 151, 0.5);
            border-radius: #000 1px solid;
            position: absolute;
            bottom: -20px;
            left: 60px;
            span {
              position: absolute;
              top: -20px;
              left: 20px;
            }
          }
        }
      }
      .box {
        display: inline-block;
        margin: 0 20px;
        margin-top: 30px;
      }
      .pro {
        background: rgba(0, 180, 69, 0.5);
        width: 20px;
        height: 20px;
        margin-left: 500px;
      }
      .qua {
        background-color: rgba(15, 0, 151, 0.5);
        width: 20px;
        height: 20px;
      }
    }
  }
  footer {
    background: rgb(255, 255, 255);
    color: #333;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.293);
    letter-spacing: 1px;
    padding: 20px;
    h3 {
      text-align: center;
      line-height: 60px;
      font-size: 25px;
    }
    p {
      text-align: center;
      line-height: 30px;
    }
    ul {
      width: 80%;
      margin: 0 auto;
      padding: 20px 0;
      li {
        border-left: 3px solid rgba(153, 0, 0, 0.74);
        padding-left: 120px;
        padding-top: 30px;
        position: relative;
        .conent {
          .form {
            h1 {
              text-align: left;
              margin: 30px 10px;
            }
            p {
              font-size: 18px;
              margin-bottom: 30px;
            }
          }
          .header {
            text-align: left;
            font-size: 20px;
            font-weight: bold;
          }
          .dete {
            text-align: left;
            line-height: 40px;
            font-size: 14px;
            color: #999;
            padding-left: 15px;
          }
          .sec {
            text-align: left;
            font-size: 18px;
            font-weight: bold;
          }
        }

        .button {
          text-align: right;
        }
        &::before {
          content: " ";
          display: block;
          background: rgb(153, 0, 0);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          left: -6px;
          top: 45%;
        }
      }
    }
  }
}
</style>