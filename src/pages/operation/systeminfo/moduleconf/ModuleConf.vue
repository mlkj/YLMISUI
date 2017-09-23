<template>
<yl-panelpage :titleName="'模块配置'" >
<div slot="content">
  
         <yl-toolbar>
              <el-form  :inline="true"  >
                            <el-form-item class="form-content-vertical">
                               <yl-menuItemTree  
                                    placeholder="请选择菜单" 
                                    size="small" 
                                    style="width:200px" 
                                    v-model="menuItemId"
                                    @getCurrentNode="_getCurrentNode"
                               ></yl-menuItemTree>   
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                               <el-button type="primary" size="small" @click="_onSubmit" :loading="loading">保存</el-button>   
                            </el-form-item>
                 </el-form>    
          </yl-toolbar>
          <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px" >
                <el-tabs  type="border-card" active-name="baseInfoConf" >
                    <el-tab-pane label="基本信息配置" name="baseInfoConf" > 
                            <el-form-item label="基本信息配置" prop="baseInfoConf">
                                <yl-jsoneditor ref="baseInfoConf" v-model="formModel.baseInfoConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                    </el-tab-pane>
                        <el-tab-pane label="Api信息配置" name="apiConf"> 
                            <el-form-item label="Api信息配置" prop="apiConf">
                                <yl-jsoneditor ref="apiConf" v-model="formModel.apiConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="过滤器配置" name="fliterConf"> 
                            <el-form-item label="过滤器配置" prop="fliterConf">
                            <yl-jsoneditor ref="fliterConf" v-model="formModel.fliterConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="Form表单配置" name="formConf"> 
                            <el-form-item label="Form表单配置" prop="formConf">
                                <yl-jsoneditor ref="formConf" v-model="formModel.formConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="表信息配置" name="tableInfoConf"> 
                            <el-form-item label="表信息配置" prop="tableInfoConf">
                                <yl-jsoneditor ref="tableInfoConf" v-model="formModel.tableInfoConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="功能信息配置" name="functionConf"> 
                            <el-form-item label="功能信息配置" prop="functionConf">
                                <yl-jsoneditor ref="functionConf" v-model="formModel.functionConf" style="height:600px"></yl-jsoneditor>
                            </el-form-item>
                        </el-tab-pane>
                </el-tabs>
            </el-form>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import menuItemTree from 'ocomponents/menuitem/menuItemTree';
import {
    requestGetModuleConfForEdit,
    requestCreateOrUpdateModuleConf
} from 'api/moduleconf';
export default {
    data(){
        return {
                 formModel:{
                            id:'',
                            baseInfoConf:'',
                            apiConf:'',
                            fliterConf:'',
                            formConf:'',
                            tableInfoConf:'',
                            functionConf:'',
                            extensionOne:'',
                            extensionTwo:'',
                            extensionThere:'',
                            extensionFure:'',
                            extensionFrive:'',
                            },
                 loading:false,
                 menuItemId:'',    
                 rules: {},
            }
    },
    computed: {
              },
    methods:{
        _getCurrentNode(node){
                let inputArr=[];
                inputArr.push({
                    dataField:"ExtensionTwo",
                    op:'EQ',
                    dataValue:node.funcCode,
                });
                requestGetModuleConfForEdit(inputArr).then((data)=>{
                        if(data.success){
                           if(data.result.moduleConf!=null){
                                this.formModel=data.result.moduleConf;
                            }else{
                                    this.formModel.id="";
                                    this.formModel.baseInfoConf="{}";
                                    this.formModel.apiConf="{}";
                                    this.formModel.fliterConf="{}";
                                    this.formModel.formConf="{}";
                                    this.formModel.tableInfoConf="{}";
                                    this.formModel.functionConf="{}";
                                    this.formModel.ExtensionTwo=node.funcCode;
                            }
                        }else{  
                                this.$message.error('获取数据失败！');
                        }
                    })
        },
         _onSubmit() {
                this.$refs.formModel.validate((valid) => {
                if (valid) {
                    var _this=this;
                    this.loading=true;
                    let params={};
                    this.formModel.baseInfoConf=this.$refs.baseInfoConf.getValue();
                    this.formModel.apiConf=this.$refs.apiConf.getValue();
                    this.formModel.fliterConf=this.$refs.fliterConf.getValue();
                    this.formModel.formConf=this.$refs.formConf.getValue();
                    this.formModel.tableInfoConf=this.$refs.tableInfoConf.getValue();
                    this.formModel.functionConf=this.$refs.functionConf.getValue();
                    params.moduleConf=this.formModel;
                    requestCreateOrUpdateModuleConf(params).then(data=>{
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
    },
    components:{
          'yl-menuItemTree':menuItemTree
        },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

