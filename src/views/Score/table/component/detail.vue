<template>
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

</template>
<script>
	export default{
		data(){
			return {
			}
		},
    created(){
    }
	}
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
