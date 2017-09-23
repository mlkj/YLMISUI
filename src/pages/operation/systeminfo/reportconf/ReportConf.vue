<template>
<yl-panelpage :titleName="'报表配置'" >
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
                               <el-button 
                                    type="primary" 
                                    size="small" 
                                    @click="_onSubmit" 
                                    :loading="loading">保存</el-button>   
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
import fetch from 'api/fetch'
export default {
    data(){
        return {
               formModel:{
                        id:'',
                        baseInfoConf:'',
                        apiConf:'',
                        fliterConf:'',
                        tableInfoConf:'',
                        functionConf:'',
                        extensionOne:'',
                        extensionTwo:'',
                        extensionThere:'',
                        extensionFure:'',
                        extensionFrive:'',
                        },
                 menuItemId:'',       
                 loading:false,
                 rules: {},
            }
    },
    computed: {
              },
    methods:{
        _getCurrentNode(node){
                let inputArr=[],params={};
                inputArr.push({
                    dataField:"ExtensionTwo",
                    op:'EQ',
                    dataValue:node.funcCode,
                });
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/reportConf/getMainObjectForEdit',
                     method: 'post',
                     data: params
                }).then((data)=>{
                        if(data.success){
                           if(data.result.order!=null){
                                this.formModel=data.result.order;
                            }else{
                                    this.formModel.id="";
                                    this.formModel.baseInfoConf="{}";
                                    this.formModel.apiConf="{}";
                                    this.formModel.fliterConf="{}";
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
                    this.formModel.tableInfoConf=this.$refs.tableInfoConf.getValue();
                    this.formModel.functionConf=this.$refs.functionConf.getValue();
                    params.order=this.formModel;
                    fetch({
                        url: '/api/services/app/reportConf/createOrUpdateMainObject',
                        method: 'post',
                        data: params
                     }).then(data=>{
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

