<template>
    <div>
        <Bread></Bread>
        <But @searchData="searchData"></But>
        <Tabl :searchTable="searchTable" :sousuo="sousuo"></Tabl>
    </div>
</template>
<script>
import Bread from './component/BreadCrumbs'
import Tabl from './component/table'
import But from './component/button'
export default {
    name: "UserList",
    data() {
        return {
            searchTable:[],
            sousuo:""
        }
    },
    methods:{
        searchData(data,search){
            this.searchTable = data;
            this.sousuo = search;
        }
    },
    components: {
        Bread, //面包屑
        Tabl, //tab表格
        But //按钮
    },
}
</script>
<style scoped>
</style>