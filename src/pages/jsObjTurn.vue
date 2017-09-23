<template>
<div class="main">
<el-form :model="formModel"  :rules="rules"  ref="formModel"  label-width="100px" style="padding-top:20px">
         <el-form-item label="js对象" prop="jsdata" >
             <el-input v-model="formModel.jsdata" type="textarea" :rows="13" style="width:95%"></el-input>
         </el-form-item>
		 <el-col :span="24">
			<el-form-item style="text-align:left;" >
				<el-button @click="_resetForm">清空</el-button>
				<el-button type="primary" @click="_onSubmit" :loading="loading">转化</el-button>
			</el-form-item>
 		 </el-col>
		 <el-col :span="24">
			<el-form-item label="json字符串"  prop="jsondata">
				<el-input v-model="formModel.jsondata" type="textarea" :rows="13"  :readonly="true" style="width:95%"></el-input>
			</el-form-item>
		 </el-col>
</el-form>
</div>
</template>

<script type="text/babel">
export default {
		data() {
		      return {
		        formModel: {
					jsdata: '',
					jsondata: '暂无数据',
		        },
		        rules:{
						jsdata: [
							{ required: true, message: '输入内容不能为空！', trigger: 'blur' }
						],
	          		},
				loading:false,
		      };
		     },
		     methods:{
			     _onSubmit(){
					//  let _this=this;
					//  var str=this.jsdata;
					//  str=str.replace(/\s+/g,'');
					//  this.jsondata=str;
			     },
			     _resetForm(){
					 this.$refs.formModel.resetFields();
			    },
		     },
			 mounted(){
			 }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.main
		background-color:#fff
		height:100%
		width:100%
		color:#fff
</style>
