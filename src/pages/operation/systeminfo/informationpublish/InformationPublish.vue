<template>
<yl-panelpage :titleName="'信息发布'" :reloadisShow="false" :fullscreenisShow="true" >
<div slot="content">
    <yl-columnlay>
        <div slot="left"  >
            <yl-panelzone  :treeLoading="treeLoading" :reloadIsShow="true" @reload="_treeReload" :titleName="'菜单树'" :icon="'icon-tree'" :widthNum="'210px'" >
                <div slot="content">
                    <el-tree 
                    :data="menuTreeData" 
                    :expand-on-click-node="false" 
                    :props="defaultProps" 
                    highlight-current 
                    :render-content="renderContent" 
                    @node-click="_handleNodeClick" 
                    style="height:100%"></el-tree>
                </div>
            </yl-panelzone>
        </div>
        <div slot="right" >
            <yl-layout>
                <div slot="fristbox" >
                <yl-toolbar>
                        <el-form  :inline="true"  >
                                <el-form-item class="form-content-vertical">
                                    <el-input  placeholder="标题" size="small" style="width:200px" v-model="searchModel.title"></el-input>  
                                </el-form-item>
                                <el-form-item class="form-content-vertical">
                                    <el-button type="primary" icon="search" size="small"  @click="_reload">查 询</el-button>
                                </el-form-item>
                        </el-form>
                </yl-toolbar>
                <yl-toolbar>
                    <el-button-group>
                            <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.InformationPublishs.Create'"   icon="plus" size="small"  @click="_add" >添加</el-button>
                            <el-button type="primary" v-permissionSetting="'Pages.Basic.Data.InformationPublishs.Edit'"   icon="edit"  size="small" :disabled="selectRows.length===0" @click="_edit">编辑</el-button>
                            <el-button type="danger"  v-permissionSetting="'Pages.Basic.Data.InformationPublishs.Delete'"   icon="delete" size="small"  :disabled="selectRows.length===0" @click="_delete" >删除</el-button>
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
                                <template slot="content" scope="scope">
                                    <el-button icon="search" @click="_viewContent(scope.row)"></el-button>
                                </template>
                        </yl-table>
                </div>
            </yl-layout>
        </div>
    </yl-columnlay>
    <!--编辑界面-->
         <el-dialog ref="mainDialog" title="编辑" v-model="addFormVisible" size="large"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <Edit :selectRow="currentRows" :selectNode="selectNode" @close="_close"  v-if="addFormVisible"></Edit>
         </el-dialog>
         <el-dialog ref="mainDialog" title="预览" v-model="addFormVisible1" size="small"  top="10%" 
                    :modal-append-to-body="false" :close-on-click-modal="false"  >
                    <h1>标题：{{title}}</h1>
                    <div v-if="addFormVisible1" v-html="content"></div>
         </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import Edit from './InformationPublishEdit';
import  {inputModel} from 'api/inputmodel';
import {
            requestGetInformationPublishPageList,
            requestDeleteInformationPublish
        }   from 'api/informationpublish';
import {requestGetMenuItemTreeList}   from 'api/menuitem';
import treeMixn from '@/mixns/tree.js';
import util from 'common/js/util';

export default {
    mixins: [treeMixn],
    data(){
        return {
             tableData: {},
                mainTableLoading:false,
                selectRows:[],
                currentRows:{},
                searchModel:{
                      title:'',  
                    },
                addFormVisible:false,
                addFormVisible1:false,
                mainInput:new inputModel(),
                content:'',
                title:'',
                menuTreeData:[],
                treeLoading:false,
                selectNode:{id:"00000000-0000-0000-0000-000000000000"},
                defaultProps: {
                        children: 'children',
                        label: 'text',
                        id: 'id'
                    },
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
                                // {attr: { prop: 'orgId', label: '', width:120,  } },   
                                // {attr: { prop: 'accessoryId', label: '', width:120,  } },   
                                {attr: { prop: 'title', label: '标题', width:120,  } },   
                                // {attr: { prop: 'type', label: '类型', width:120,  } },   
                                {attr: { prop: 'moudleName', label: '模块名称', width:120,  } },   
                                {attr: { prop: 'content', label: '预览', width:120,scopedSlot:"content"  } },   
                                {attr: { prop: 'clickTimes', label: '点击次数', width:120,  } },   
                                {attr: { prop: 'useful', label: '有用', width:120,  } },   
                                {attr: { prop: 'unUseful', label: '没用', width:120,  } },  
                                {attr: { prop: 'creationTime', label: '添加时间', width:120,  } }, 
                                // {attr: { prop: 'extendColumn1', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn2', label: '', width:120,  } },   
                                // {attr: { prop: 'extendColumn3', label: '', width:120,  } },   
                                {attr: { prop: 'sortCode', label: '排序'} },
                            ]
                        }
                    }
                }
        },
    methods:{
        _handleNodeClick(result, resolve) {  
                 //点击加载 
                  this.selectNode=result;
                  this._reload();
            },
        _treeReload(){
            this.selectNode={id:this.guidOfNull()};
            this._getGetMenuItemTreeList();
        },
        //一次加载树
        _getGetMenuItemTreeList(){
            let _this=this;
            this.treeLoading=true;
            requestGetMenuItemTreeList().then(data => {
                    if(data.success){
                        this.menuTreeData=util.returnDatabyTree(data.result,this.guidOfNull());
                    }
                    else {
                        this.$message.error('获取数据失败！'+data.error.message);
                    }
                        this.treeLoading=false;
                }).catch(function (error) {
                        _this.treeLoading=false;
                });
        },
        _getInformationPublishPageList(){
                var _this=this;
                this.selectRows=[];
                this.mainTableLoading=true; //开启加载
                var inputArr=[ 
                               {key:"MoudleName",op:"EQ",value:this.selectNode.text},
                               {key:"Title",op:"LIKE",value:this.searchModel.title},
                             ];
                this.mainInput.addqueryConditionItem(inputArr);
                requestGetInformationPublishPageList(this.mainInput.inputModel).then(data =>{
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
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
               
            },
        _selectionChange(val){
            //多选时的方法
            if(val!=null){
                this.selectRows=[];
                this.selectRows=this.selectRows.concat(val);
            }
        },
        toggleRowSelection (row) {
            this.$refs.table.toggleRowSelection(row)
        },
        _reload(){
            this._getInformationPublishPageList();
        },
        _add(){
            if(this.selectNode.id!=this.guidOfNull()){
                this.addFormVisible=true;
                this.currentRows={};
            }else{
                this.$message.warning('请选择模块！');
            }
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
                requestDeleteInformationPublish(obj).then(data =>{
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
        _close(){
                this.addFormVisible=false;
                this._reload();
        },
        _viewContent(val){
            this.addFormVisible1=true;
            this.content=val.content;
            this.title=val.title;
        }

    },
    components:{
         Edit,
        },
    mounted(){
        this._reload();
        this._getGetMenuItemTreeList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

