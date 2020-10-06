<template>
  <el-table-column type="expand">
    <template slot-scope="props">
      <el-form label-position="right" inline class="demo-table-expand">
        <el-form-item label="姓名:">
          <span>{{ props.row.name }}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span>{{ props.row.sex }}</span>
        </el-form-item>
        <el-form-item label="年龄:">
          <span>{{ props.row.age }}</span>
        </el-form-item>
        <el-form-item label="系别:">
          <span>{{ props.row.system }}</span>
        </el-form-item>
        <el-form-item label="班级:">
          <span>{{ props.row.name }}</span>
        </el-form-item>
        <el-form-item label="身份证号:">
          <span>{{ props.row.idCard }}</span>
        </el-form-item>
      </el-form>
    </template>
  </el-table-column>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
