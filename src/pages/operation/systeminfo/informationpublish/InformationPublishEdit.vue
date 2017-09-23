
<template>
<div>
<el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
         <el-row>
             <el-col :span="24">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formModel.title" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row>
             <el-col :span="6">
                <el-form-item label="模块名称" prop="moudleName">
                    <el-input v-model="formModel.moudleName" :disabled="true" ></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="4">
                <el-form-item label="排序" prop="sortCode" >
                    <el-input-number v-model="formModel.sortCode" :min="1" ></el-input-number>
                </el-form-item>
             </el-col>
         </el-row>
         
         <el-form-item label="内容" prop="content">
             <quill-editor style="" v-model="formModel.content"
                        ref="myQuillEditor">
             </quill-editor>
         </el-form-item>
                
  
   <el-form-item style="text-align:right;" >
      <el-button @click="_resetForm">重置</el-button>
      <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
  </el-form-item>
  
</el-form>
</div>
</template>

<script type="text/babel">
import {
    requestCreateOrUpdateInformationPublish
}from 'api/informationpublish';
export default {
    data(){
    return{
        formModel:{
                 orgId:'',
                 accessoryId:'',
                 title:'',
                 type:'',
                 moudleName:'',
                 content:'',
                 clickTimes:'',
                 useful:'',
                 unUseful:'',
                 extendColumn1:'',
                 extendColumn2:'',
                 extendColumn3:'',
               sortCode: 1,
        },
         rules: {
                    title: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    content: [
                      { required: true, message: '不能为空！', trigger: 'blur' }
                    ],
                    // extendColumn1: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // extendColumn2: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
                    // extendColumn3: [
                    //   { required: true, message: '不能为空！', trigger: 'blur' }
                    // ],
         },
        loading:false
       }       
    },
    props:{
        selectRow:{},
        selectNode:{},
        isVisible:false
    },
    methods:{
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    params.informationPublish=this.formModel;
                    requestCreateOrUpdateInformationPublish(params).then(data=>{
                    if(data.success){
                            this.$notify({
                                title: '成功',
                                message: '保存数据成功！',
                                type: 'success'
                                });
                            //关闭面板
                            this._complete();
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
       if(this.selectRow.id==undefined){
           this.formModel.moudleName=this.selectNode.text;
       }
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
