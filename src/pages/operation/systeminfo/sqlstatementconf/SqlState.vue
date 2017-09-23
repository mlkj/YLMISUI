<template>
    <yl-panelpage :titleName="'SQL语句配置'" >
        <div slot="content">
            <yl-layout>
                <div slot="fristbox" >
                    <yl-toolbar>
                        <el-form  :inline="true"  >
                            <el-form-item class="form-content-vertical">
                                <el-input  placeholder="名称" size="small" style="width:200px" v-model="searchModel.confName"></el-input>
                            </el-form-item>
                            <el-form-item class="form-content-vertical">
                                <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                            </el-form-item>
                        </el-form>
                    </yl-toolbar>
                    <yl-toolbar>
                            <el-button-group>
                                <el-button type="primary"  v-permissionSetting="'Pages.System.Config.SQLStatementConfs.Create'"   icon="plus" size="small"   @click="_add" >添加</el-button>
                                <el-button type="primary" v-permissionSetting="'Pages.System.Config.SQLStatementConfs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">修改</el-button>
                                <el-button type="danger"  v-permissionSetting="'Pages.System.Config.SQLStatementConfs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                            </el-button-group>
                    </yl-toolbar>
                </div>
                <div slot="secondbox" class="flexbox">
                    <yl-table ref="table"
                        @reload="_reload"
                        @current-change="_currentChange"
                        :configs="tableConfig" 
                        :input="mainInput.inputModel"
                        :tableloading="mainTableLoading" 
                        >
                        <!-- <template slot="isBlackList" scope="scope">
                                    <el-tag type="danger" v-if="scope.row.isBlackList">是</el-tag>
                                    <el-tag type="primary" v-else>否</el-tag>
                        </template> -->
                    </yl-table>
                </div>
            </yl-layout>
            <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false">
                <Edit :selectRow="currentRows" @close="_close"  v-if="addFormVisible"></Edit>
            </el-dialog>
        </div>
    </yl-panelpage>
</template>

<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import Edit from './SqlStateEdit';
import {
    requestgetMainPageList,
    requestdeleteMainObject
    } from 'api/sqlstatementconf';
export default {
    data(){
        return{
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                addFormVisible:false,
                mainInput:new inputModel(),
                searchModel:{
                    confName:''
                }
        }
    },
     computed: {
            tableConfig: {
                    get () {
                        return {
                            table: {
                                attr: {
                                    data: this.tableData,
                                    highlightCurrent:true,
                                }
                            },
                            columns: [
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                {attr: { prop: 'confName', label: '名称', width:160,  } },   
                                {attr: { prop: 'content', label: '内容', width:300,  } },  
                                {attr: { prop: 'remark', label: '备注', width:200,  } }  
                            ]
                        }
                    }
                }
        },
    methods:{
        _getSqlStatePageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                              {key:"ConfName",op:"LIKE",value:this.searchModel.confName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestgetMainPageList(this.mainInput.inputModel).then(data =>{
                            if(data.success){
                                this.tableData=data.result;
                                }
                            else {
                                 this.$message.error('失败！'+data.error.message);
                            }
                          this.mainTableLoading=false;
                }).catch(function(error){
                       _this.mainTableLoading=false;
                });
        },
        _add(){
            this.addFormVisible=true;
            this.currentRows={};
        },
        _edit(){
            this.addFormVisible=true;
            this.currentRows=this.selectRows[0];
        },
        _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestdeleteMainObject(obj).then(data =>{
                        if(data.success){
                                this._reload();
                                this.$notify({
                                    title: '成功',
                                    message: '删除数据成功！',
                                    type: 'success'
                                    });
                            }
                            else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '删除数据失败！'+data.error.message,
                                    });
                            }
                });
            })
        },
        _reload(){
            this._getSqlStatePageList();
        },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
               
        },
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
    },
    components:{
        Edit
    },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
