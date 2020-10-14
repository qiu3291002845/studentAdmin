<template>
  <!-- div 跟标签 -->
  <div>
    <!-- 当前位置部分 -->
    <div class="currentlocation">
      <!-- 图标 -->
      <div class="i iconfont icon-ai207" @click="comeBack"></div>
      <!-- 当前位置和角色管理 -->
      <p>
        <span style="  font-size: 16px"><a>角色管理</a></span>
      </p>
    </div>
    <!-- 组件位置 -->
    <ListPart></ListPart>
    <nav></nav>
  </div>
</template>

<script>
//引入iconfont图标
import "./iconfont.css";
//引入ListPart
import ListPart from "./component/ListPart";
export default {
  name: "RoleList",
  data() {
    return {};
  },
  //点击返回图标返回上级
  methods: {
    comeBack() {
      this.$router.go(-1);
    },
  },
  //引用组件
  components: {
    ListPart,
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
/* i图标样式 */
.i {
  width: 40px;
  height: 40px;
  float: left;
  font-size: 36px;
  text-align: center;
  line-height: 40px;
}
/* 经过的时候变成小手 */
.i:hover {
  cursor: pointer;
}
/* 当前位置部分的样式 */
.currentlocation {
  width: 100%;
  height: 40px;
}
/* 当前位置下的p标签  */
.currentlocation > p {
  line-height: 40px;
}
</style>
