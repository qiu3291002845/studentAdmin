<template>
	<el-form-item :label="title">
      <span>{{ child }}</span>
    </el-form-item>
</template>

<script>
	export default {
		name:"FromItem",
		props:['title','child']
	}
</script>
