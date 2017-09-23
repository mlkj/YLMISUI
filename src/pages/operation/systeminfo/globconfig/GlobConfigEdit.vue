<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-form-item label="名称" prop="name">
             <el-input v-model="formModel.name" ></el-input>
         </el-form-item>
         <el-form-item label="内容" prop="describe">
              <yl-jsoneditor ref="describe" v-model="formModel.describe" style="height:300px"></yl-jsoneditor>
         </el-form-item>
          <!--<el-form-item label="排序" prop="sortCode" >
            <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
        </el-form-item>
         <el-form-item label="备注" prop="remark">
              <el-input v-model="formModel.remark" type="textarea" style="width:100%" row="5"></el-input>
         </el-form-item>       -->
        <el-form-item >
        <el-checkbox v-model="isClose">保存后关闭</el-checkbox>
        <div style="text-align:right;">   
            <el-button @click="_resetForm">重置</el-button>
            <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
        </div>
    </el-form-item>
</el-form>
</div>
</template>
<script type="text/babel">
import {
    requestcreateOrUpdateMainObject
}from 'api/globconfig';
export default {
    data(){
    return{
        formModel:{
                 name:'',
                 describe:'',
        },
         rules: {
                    name: [
                      { required: true, message: '名称不能为空！', trigger: 'blur' }
                    ],
         },
        loading:false,
        isClose:true,
       }       
    },
    props:{
        selectRow:{},
        isVisible:false
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.globConfig=this.formModel;
                    this.formModel.describe=this.$refs.describe.getValue();
                    requestcreateOrUpdateMainObject(params).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                           this._complete(this.isClose);
                        }
                        else {
                             this.$message.error('失败！'+data.error.message);
                        }
                            this.loading=false;
                    }).catch(function(error){
                        _this.loading=false;
                    })
                } else {
                    this.$message.warning('请按照条件填充表单！');
                    return false;
                }
                
            });
            },
         _resetForm() {
                this.$refs.formModel.resetFields();
         },
         _complete(){
                this.$emit('close');
            }
    },
     mounted(){
       Object.assign(this.formModel,this.selectRow); 
    },
     watch:{
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
