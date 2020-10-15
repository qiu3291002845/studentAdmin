<template>
    <div>
        <el-page-header @back="goBack" content=用户管理>
        </el-page-header>
    </div>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
/deep/ .el-page-header:hover {
    color: red;
    transition: 0.5s;
}
</style>