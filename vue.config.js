module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir:'static',
  configureWebpack: {
	  externals: {
	     echarts: 'echarts', // 配置使用CDN，
	     vue: 'Vue',
		 // router: 'VueRouter',
		 ElementUI: 'ELEMENT',
		 vuex:'Vuex'
	  }
	}
}