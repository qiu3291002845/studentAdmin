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
            this.$router.push("/");
        }
    }
}
</script>