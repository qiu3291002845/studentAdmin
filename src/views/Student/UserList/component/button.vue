<template>
    <el-row>
        <el-button type="primary" @click="newUser">新建</el-button>
        <!-- 搜索功能 -->
        <el-input v-model="search" @input="findUsers" class="Search" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input> 
    </el-row>
</template>
<script>
export default {
    data() {
        return {
           search:"",
        }
    },
    methods: {
        async findUsers(e){
            const {data} = await this.$http.get(`/user/search?keyword=${e}`);
            this.tableData = data.data;
            this.$emit("searchData",this.tableData,this.search);
            if(this.search == ""){
                this.changtime();
            }else {
                alert("搜个蛋，不让搜")
            }
        },
        newUser(){
            this.$router.push('./userForm')
        },
        changtime() {
            //将数组的每一个时间戳转换为当前日期格式 并赋值
            for (let i = 0; i < this.tableData.length; i++) { //首先循环把每个
                var day = new Date(this.tableData[i].time * 1); //秒数要转为毫秒数
                var time = day.toLocaleString();
                this.tableData[i].time = time;
            }
        },
    }
}
</script>
<style scoped>
.el-row {
    margin-top: 15px;
}

/* 搜索框的样式 */
.Search {
    float: right;
    width: 200px;
    margin-right: 15px;
}
</style>