<template>
<div slot="content">
    <yl-layout>
        <div slot="fristbox" >
          <yl-toolbar>
                <el-form  :inline="true"  >
                        <el-form-item class="form-content-vertical">
                      <el-input  placeholder="用料单位名称" size="small" style="width:200px" v-model="searchModel.labourName"></el-input> 
                        </el-form-item>
                        <el-form-item class="form-content-vertical">
                            <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                        </el-form-item>
                </el-form>
          </yl-toolbar>
        <yl-toolbar>
            <el-button-group>
                    <el-button type="primary"  icon="plus" size="small" v-permissionSetting="'Pages.System.Config.OrigiTableInfos.Create'"  @click="_add" >添加</el-button>
                    <el-button type="primary"  icon="edit"  size="small" v-permissionSetting="'Pages.System.Config.OrigiTableInfos.Edit'" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                    <el-button type="danger"   icon="delete" size="small" v-permissionSetting="'Pages.System.Config.OrigiTableInfos.Delete'" :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
                </el-button-group>
        </yl-toolbar>
        </div>
        <div slot="secondbox" class="flexbox" style="height:500px">
            <yl-table ref="table"
                @reload="_reload"
                @current-change="_currentChange"
                :configs="tableConfig" 
                :input="mainInput.inputModel"
                :tableloading="mainTableLoading" 
                >
                <!-- 自定义列模板 -->
                    <template slot="isDeleted" scope="scope">
                        <el-tag type="primary" v-if="scope.row.isDeleted">是</el-tag>
                        <el-tag type="danger" v-else>否</el-tag>
                    </template>
                    <template slot="isStatic" scope="scope">
                        <el-tag type="primary" v-if="scope.row.isStatic">是</el-tag>
                        <el-tag type="danger" v-else>否</el-tag>
                    </template>
            </yl-table>
        </div>
    </yl-layout>
    <!--编辑界面-->
          <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" :tbselectRow="oselectRow" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog> 
 </div>
</template>

 <script type="text/babel">
import  {inputModel} from 'api/inputmodel';
import Edit from './OriginTableEdit';
import {
            requestGetOrigiTableInfoPageList,
            requestDeleteOrigiTableInfo
        }   from 'api/origitableinfo';

export default {
    data(){
        return{
            tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                    labourName:'',  
                    },
                addFormVisible:false,
                mainInput:new inputModel(),
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
                                {attr: { prop: 'tableName', label: '表名', width:190,  } },   
                                {attr: { prop: 'type', label: '来源类型', width:100,  } },   
                                {attr: { prop: 'origiTableName', label: '来源表', width:190,  } },   
                                {attr: { prop: 'origiColName',label: '来源列',width:140,} }, 
                                {attr: { prop: 'itemTableName', label: '明细表', width:190,  } },   
                                {attr: { prop: 'itemColName', label: '明细列', width:150,  } },   
                                {attr: { prop: 'origiComputeColName', label: '来源计算列', width:120,  } },   
                                {attr: { prop: 'currComputeColName', label: '表计算列', width:160,  } },   
                                {attr: { prop: 'auditComputeType', label: '审核计算类型',width:160,  } }, 
                                {attr: { prop: 'unAuditComputeType', label: '撤销计算类型',width:160,  } },  
                                {attr: { prop: 'stateColName', label: 'stateColName',width:160,  } },    
                                {attr: { prop: 'auditStateValue', label: 'auditStateValue',width:160,  } },  
                                {attr: { prop: 'unAuditStateValue', label: 'unAuditStateValue',width:160,  } },  
                                {attr: { prop: 'isDeleted', label: '删除isDeleted',width:160, scopedSlot:'isDeleted' } },  
                                {attr: { prop: 'deletedCon', label: 'deletedCon',width:160,  } },  
                                {attr: { prop: 'juConStr', label: 'juConStr',width:160,  } },  
                                {attr: { prop: 'isStatic', label: 'isStatic',width:160, scopedSlot:'isStatic' } },  
                                {attr: { prop: 'sortCode', label: '排序',width:160,  } },  
                            ]
                        }
                    }
                }
        },
    props:{
        oselectRow:{}
    },
    methods:{
        _getOrigiTableInfoPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                                {key:"TableName",op:"EQ",value:this.oselectRow.tableName},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetOrigiTableInfoPageList(this.mainInput.inputModel).then(data =>{
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
        _reload(){
            this._getOrigiTableInfoPageList();
        },
        _add(){
            this.addFormVisible=true;
            this.currentRows={};
        },
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
            },
        _delete(){
            this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
            }).then(() => {
                var obj={}; 
                obj.id=this.selectRows[0].id;
                requestDeleteOrigiTableInfo(obj).then(data =>{
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
            });
        },
        _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },
    },
    components:{
         Edit,
        },
    mounted(){
        this._reload();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
