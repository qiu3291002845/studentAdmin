<template>
    <div>
        <Bread></Bread>
        <Tabl></Tabl>
    </div>
</template>
<script>
import Bread from './component/BreadCrumbs'
import Tabl from './component/table'
export default {
    name: "UserList",
    data() {
        return {
        }
    },
    methods:{
    },
    components: {
        Bread, //面包屑
        Tabl, //tab表格
    },
}
</script>
<style scoped>
</style>