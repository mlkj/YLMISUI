<template>
<yl-panelpage 
    :titleName="baseInfoConf.panelpage.titleName" 
    :icon="baseInfoConf.panelpage.icon" 
    :reloadIsShow="baseInfoConf.panelpage.reloadIsShow" 
    :fullScreenIsShow="baseInfoConf.panelpage.fullScreenIsShow" 
    :helpIsShow="baseInfoConf.panelpage.helpIsShow" 
>
<div slot="content">
     <yl-columnlay 
        :hiddenLeft="baseInfoConf.layout.columnlay.hiddenLeft">
              <div slot="left">
                       <!--这里只能渲染带panel的树组件-->
                        <yl-renderselcoms  
                            @getCurrentNodeWithPanel="_getCurrentNodeWithPanel"
                            :option="filterConf.selfFilterConf.length>0?filterConf.selfFilterConf[0]:{}">
                        </yl-renderselcoms>
              </div>
              <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                              <el-form :inline="true" >
                                <yl-toolbar v-if="baseInfoConf.layout.columnlay.upToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item class="form-content-vertical" v-for="item in filterConf.searchFilterConf.up">
                                                <yl-rendercoms  
                                                    :option="item"
                                                    :refList="refList"
                                                    :model="searchModel"
                                                    @change="_change"
                                                    @blur="_blur"
                                                    @init="_initComs">
                                                 </yl-rendercoms>
                                        </el-form-item>
                                         <el-form-item class="form-content-vertical" v-if="functionConf.searchBtn">
                                              <el-button 
                                                    v-show="functionConf.searchBtn.isShow"
                                                    :disabled="functionConf.searchBtn.disabled"  
                                                    :type="functionConf.searchBtn.type" 
                                                    :size="functionConf.searchBtn.size" 
                                                    @click="_functionClick(functionConf.searchBtn)"> 
                                                    <i :class="functionConf.searchBtn.icon"></i>
                                                    {{functionConf.searchBtn.text}}  
                                               </el-button>
                                         </el-form-item>
                                </yl-toolbar>
                                
                                <yl-toolbar v-if="baseInfoConf.layout.columnlay.downToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item class="form-content-vertical" v-for="item in filterConf.searchFilterConf.down">
                                                <yl-rendercoms  
                                                :option="item" 
                                                :model="searchModel"
                                                :refList="refList"
                                                @change="_change"
                                                @blur="_blur"
                                                @init="_initComs">
                                                </yl-rendercoms>
                                        </el-form-item>
                                </yl-toolbar>
                             </el-form>
                             <yl-toolbar  v-if="baseInfoConf.layout.columnlay.toolFunction.visiable">
                              <!--功能-->
                               <el-button-group ref="funtoolbar">  
                                   <el-button v-for="(item,index) in funBtnConf" 
                                                :type="item.type" 
                                                :name="item.name" 
                                                :size="item.size" 
                                                :loading="item.loading"
                                                v-permissionSetting="item.permissionSetting"
                                                v-show="item.isShow"
                                                :disabled="item.disabled"  
                                                @click="_functionClick(item)" >
                                            <i :class="item.icon"></i>{{item.text}}</el-button>
                                </el-button-group>
                             </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                         <!--表显示区域-->
                              <yl-table ref="mainTable"
                                    @reload="_reload"
                                    @current-change="_currentChange"
                                    @selection-change="_selectionChange"
                                    @row-click="toggleRowSelection"
                                    :configs="tableInfoConf" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    >
                                        <template :slot="item.name" scope="scope" v-for="(item,index) in tableInfoConf.solSlotConf"> 
                                                <yl-tableSlotComs 
                                                    :option="item" 
                                                    :row="scope.row" 
                                                    :name="item.name"
                                                    @tableSlotEvent="_tableSlotEvent"
                                                    >
                                                </yl-tableSlotComs>
                                        </template>
                                </yl-table>
                        </div>
                    </yl-layout> 
               </div>  
      </yl-columnlay>
    <!--编辑界面-->
        <el-dialog ref="mainDialog" 
                title="编辑" 
                v-model="addFormVisible" 
                :size="formConf.dialogConf.size"  
                :top="formConf.dialogConf.top"
                :title="formConf.dialogConf.title"
                :modal-append-to-body="false"  
                :close-on-click-modal="false" >
                    <yl-dynamicform  
                        @close="_close" 
                        :formConf="formConf"
                        :apiConf="apiConf"
                        :baseInfoConf="baseInfoConf"
                        :functionConf="functionConf"
                        :selectRow="currentRows"
                        :selectRows="selectRows"
                        :afterAddClose="formConf.dialogConf.afterAddClose"
                        :tableName="tableName"
                        v-if="addFormVisible">
                     </yl-dynamicform>
        </el-dialog>

  <!--明细编辑-->
        <el-dialog ref="itemDialog" v-if="baseInfoConf.moduleType=='2'"
                :title="tableInfoConf.itemConf.baseInfo.dialogConf.title" 
				v-model="itemFormVisible" 
                :close-on-click-modal="true"
                lock-scroll
                :modal-append-to-body="false"
				:size="tableInfoConf.itemConf.baseInfo.dialogConf.size"
                :top="tableInfoConf.itemConf.baseInfo.dialogConf.top" >
                 <yl-querycontainer     
                        v-if="itemFormVisible"
                        :baseInfoConf="tableInfoConf.itemConf.baseInfo"
                        :apiConf="tableInfoConf.itemConf.apiConf"
                        :filterConf="tableInfoConf.itemConf.filterConf"
                        :tableInfoConf="tableInfoConf.itemConf.tableInfoConf"
                        :orderId="orderId"
                        >
                 </yl-querycontainer>
	    </el-dialog>

    <!--打印预览-->
        <el-dialog ref="printDialog" v-if="baseInfoConf.moduleType=='2'"
                :title="tableInfoConf.printConf.dialogConf.title" 
				v-model="printVisible" 
                :close-on-click-modal="false"
                lock-scroll
                :modal-append-to-body="false"
				:size="tableInfoConf.printConf.dialogConf.size"
                :top="tableInfoConf.printConf.dialogConf.top" >
                 <iframe :src="reportUrl" width="100%" height="600px" ></iframe>
	    </el-dialog>
  <!--审批状态预览-->
        <el-dialog ref="stateDialog" v-if="baseInfoConf.moduleType=='2'"
                :title="tableInfoConf.approveConf.dialogConf.title" 
				v-model="stateVisible" 
                :close-on-click-modal="true"
                lock-scroll
                :modal-append-to-body="false"
				:size="tableInfoConf.approveConf.dialogConf.size"
                :top="tableInfoConf.approveConf.dialogConf.top" >
                <approveState 
                    :orderId="orderId"
                    v-if="stateVisible">
                </approveState>
	    </el-dialog>

   <!--审批界面-->
        <el-dialog ref="approveDialog" title="审批" 
                 v-model="approveFormVisible" size="small"  
                 top="15%" 
                 :lock-scroll="true"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false" 
                 :close-on-click-modal="false"  >
                 <roleApprove
                    :apiUrl="approveMainObject"
                    :propsOrderId="selectRows[0].id"
                    :tableName="tableName"
                    @close="approveFormVisible=false"
                    v-if="approveFormVisible">
                 </roleApprove>
        </el-dialog>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import {inputModel} from 'api/inputmodel';
import { mapGetters,mapActions } from 'vuex';
import { getLodop } from 'common/print/lodop/LodopFuncs'
import roleApprove from 'ocomponents/roleapprovestate/roleApprove'
import approveState from 'ocomponents/roleapprovestate/approveState'
export default {
    data(){
        return {
                mainInput:new inputModel(),
                mainTableLoading:false,
                searchModel:{},
                selectRows:[],
                currentRows:{},
                addFormVisible:false,
                funBtnConf:{},
                inputParams:[],
                itemFormVisible:false,
                printVisible:false,
                stateVisible:false,
                approveFormVisible:false,
                approveSateInfo:{},
                orderId:'',
                reportUrl:'',
                tableName:"",
                refList:{},
                extensionObj:{}
          }
    },
    props:{
        mConfigs:{
            type:Object,
            require:true,
        },
         apiConf:{
            type:Object,
            require:true,
        },
         baseInfoConf:{
            type:Object,
            require:true,
        },
         filterConf:{
            type:Object,
            require:true,
        },
         tableInfoConf:{
            type:Object,
            require:true,
        },
         functionConf:{
            type:Object,
            require:true,
        },
         formConf:{
            type:Object,
            require:true,
        }

    },
     computed: {
                fetchObject:{
                    get(){
                        return fetch;
                    }
                },
                utilObject:{
                    get(){
                        return util;
                    }
                },
                globalFunObject:{
                    get(){
                        return globalJS;
                    }
                },
                getLodop:{
                    get(){
                        return getLodop;
                    }
                },
                approveMainObject:{
                    get(){
                        if(this.apiConf.approveMainObject!=undefined){
                            return this.apiConf.approveMainObject.url;
                        }else{
                            return '';
                        }
                    }
                },
            globConf:{
                    get(){
                        return JSON.parse(util.getCookie('globConf'));
                    }
                },
            ...mapGetters([ 'getGlobObject1','getGlobObject2','getGlobString1','getGlobString2','getGlobArray1' ]),
        },
    methods:{
        ...mapActions(['setItem_tableConfig','setItem_selectFilter','setItem_funConfig','setItem_isvisible']),
        ...mapActions(['setIsVisible','setBaseinfoConf','setApiConf','setFliterConf','setTableinfoConf','setFunctionConf']),
        ...mapActions(['setGlobObject1','setGlobObject2','setGlobString1','setGlobString2','setGlobalArray1']),
        _reload(){
            this._loadData();
            this._funcState();
        },
        _loadData(){
            let _this=this;
            this.selectRows=[];
            this.mainTableLoading=true;
            let inputArr=[];
            if(this.filterConf.selfFilterConf.length>0){
            inputArr.push({key:this.filterConf.selfFilterConf[0].name,  
                           op:this.filterConf.selfFilterConf[0].op,
                           DataFieldTwo:this.filterConf.selfFilterConf[0].DataFieldTwo,
                           TwoFieldRelation:this.filterConf.selfFilterConf[0].TwoFieldRelation,
                           value:this.searchModel.selfFilterItem});
            };
            this.filterConf.searchFilterConf.up.forEach((item,index)=>{
                 if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.DataFieldTwo=item.DataFieldTwo;
                    obj.TwoFieldRelation=item.TwoFieldRelation;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                 }
            });
            this.filterConf.searchFilterConf.down.forEach((item,index)=>{
                if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.DataFieldTwo=item.DataFieldTwo;
                    obj.TwoFieldRelation=item.TwoFieldRelation;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                }
            });
            if(this.funBtnConf.approve!==undefined){
                if(this.approveSateInfo!=null){
                    inputArr.push({key:"IsState",op:"GTE",value:Number(this.approveSateInfo.stateValue-10)}); 
                    inputArr.push({key:"IsAudit",op:"EQ",value:1}); 
                    } 
            }
            inputArr.push(...this.inputParams);
            this.mainInput.addqueryConditionItem(inputArr);
            this.mainInput.inputModel.sorting=this.filterConf.sorting;
            let _apiconf=this.apiConf.getMainPageList;
            _apiconf.data=this.mainInput.inputModel;
            fetch(_apiconf).then(data=>{
                            if(data.success){
                                    this.tableInfoConf.table.attr.data=data.result;
                            }
                            else {
                                    this.$message.error('失败！'+data.error.message);
                            }
                            this.mainTableLoading=false;
                    }).catch(function(error){
                        _this.mainTableLoading=false;
                        _this.$message.error('获取数据失败！');
                    });
        },
        _currentChange(val){
                //单选时的方法
                if(this.tableInfoConf.columns[0].attr.type==="index"){
                    if(val!=null){
                        this.selectRows=[];
                        this.selectRows.push(val);
                    }
                    this._funcState();
                }
        },
       _selectionChange(val){
           //多选方法
            if(this.tableInfoConf.columns[0].attr.type==="selection"){
                if(val!=null){
                    this.selectRows=[];
                    this.selectRows=this.selectRows.concat(val);
                }
                this._funcState();
            }
       },
       toggleRowSelection(row) {
            this.$refs.mainTable.toggleRowSelection(row)
        },
        _functionClick(item){
            let _this=this;
            let eventConf=item.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    eventConf.click(item.name,_this);
                }
            }
        },
        _funcState(){
            let _this=this;
            let eventConf=this.functionConf.funState.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    eventConf.click(this.selectRows,_this);
                }
            }
        },
        _add(){  
                this.addFormVisible=true;
                this.currentRows={};
                this.selectRows=[];
        },  
        _edit(){
                this.addFormVisible=true;
                this.currentRows=this.selectRows[0];
        },
        delete(id){
              let _this=this;
               _this.apiConf.deleteMainObject.data.id=id;
               return new Promise(function (resolve, reject){
                    fetch(_this.apiConf.deleteMainObject).then(data =>{
                            if(data.success){
                                    resolve(true);
                                }
                            else {
                                 reject(new Error('删除信息失败！'+err))
                            }
                    }).catch((err)=>{ reject(new Error('删除信息异常！'+err))});
               })
        },
       async _delete(){
                this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning'
                }).then(async() => {
                        let resultCount=0,isflag=false;
                        if(this.tableInfoConf.columns[0].attr.type==="selection"){
                            //多选
                            for(let item of this.selectRows){
                                isflag=await this.delete(item.id);
                                if(isflag){ resultCount++; }
                            }
                        }else{
                            //单选
                             isflag=await this.delete(this.selectRows[0].id);
                             if(isflag){ resultCount=1;}
                            
                        }
                        this._reload();
                        this.$notify({
                                title: '成功',
                                message: '成功删除'+resultCount+'数据！',
                                type: 'success'
                            });
            }).catch(()=>{});
        },
        _audit(procName){
             //初始化表单
             let obj={};
             obj.id=this.selectRows[0].id;
             obj.orgId=this.selectRows[0].orgId;
             obj.tableName=this.tableName;
             obj.procName='Pr_CommonProc';
             this.apiConf.auditObject.data=obj;
             this.funBtnConf.audit.loading=true;
            fetch(this.apiConf.auditObject).then(data=>{
                if(data.success){
                    if(data.result.result>0){
                        this.$notify({
                                    title: '成功',
                                    message: '审核单据成功！',
                                    type: 'success'
                                    });
                    }else{
                         this.$notify.error({
                                    title: '错误',
                                      message: data.result.errorResult,
                                    });
                    }
                    this.funBtnConf.audit.loading=false;
                    this._reload();
                }else{
                    this.$notify.error({
                                    title: '错误',
                                      message: '审核单据失败！',
                                    });
                   this.funBtnConf.audit.loading=false;
                }
            });
        },
        _unAudit(procName){
             let obj={};
             obj.id=this.selectRows[0].id;
             obj.orgId=this.selectRows[0].orgId;
             obj.tableName=this.tableName;
             obj.procName='Pr_CommonProc_Un';
             this.apiConf.unAuditObject.data=obj;
             this.funBtnConf.unAudit.loading=true;
             fetch(this.apiConf.unAuditObject).then(data=>{
                if(data.success){
                    if(data.result.result>0){
                        this.$notify({
                                    title: '成功',
                                    message: '撤销审核单据成功！',
                                    type: 'success'
                                    });
                    }else{
                        this.$notify.error({
                                    title: '错误',
                                    message: data.result.errorResult,
                                    });
                    }
                    this.funBtnConf.unAudit.loading=false;
                    this._reload();
                }else{
                    this.$notify.error({
                                    title: '错误',
                                    message: '撤销审核单据失败！',
                                });
                    this.funBtnConf.unAudit.loading=false;
                }
            });
        },
        _approve(){
            this.approveFormVisible=true;
        },
        _viewItem(id){
                  this.itemFormVisible=true;
                  this.orderId=id;
        },
        _printPage(id){
            this.printVisible=true;
            this.reportUrl=this.globConf.reportUrl+this.tableInfoConf.printConf.iframeConf.src+"?id="+id;
        },
        _state(id){
            this.stateVisible=true;
            this.orderId=id;
        },
        //事件触发方法----
         _close(bool){
            if(bool){
                this.addFormVisible=false;
            }
            this._reload();
        },
        _initComs(_coms){
           let _this=this,option=_coms.option;
           if(option.eventConf!=undefined){
            if(option.eventConf.isOn){
                if(option.eventConf.init!=undefined){
                     option.eventConf.init(_this,option);
                }
            }
           }
         },
         _change(node,_coms){
            let _this=this,option=_coms.option;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.change!=undefined){
                        eventConf.change(node,_this,option);
                    }
                }
            }  
        },
        _blur(node,_coms){
                let _this=this,option=_coms.option;
                let eventConf=option.eventConf;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                         if(eventConf.blur!=undefined){
                               eventConf.blur(node,_this,option);
                           }
                        }
                }
        },
        _getCurrentNodeWithPanel(node,option){
        //左边树筛选事件
            let _this=this;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    eventConf.change(node,_this);
                    this._reload();
                }
            }
        },
        _tableSlotEvent(row,item){
            let _this=this;
            let eventConf=item.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.click!=undefined){
                        eventConf.click(row,item.name,_this);
                    }
                }
            }
        },
        _inputArrInit(){
            this.filterConf.inputArr.forEach(item=>{
                let _this=this;
                if(item.eventConf!=undefined){
                    if(item.eventConf.isOn){
                        if(item.eventConf.init!=undefined){
                            item.eventConf.init(item,_this);
                        }
                    }
                }
                if(!(item.op==="EQ"&&item.value==="")){
                    this.inputParams.push(item);
                }
            });
        },
         _onSelect(flag){
          if(flag!=""){
            let inputArr=[];
            inputArr.push({
                dataField:"ExtensionOne",
                op:'EQ',
                dataValue:flag,
            });
            fetch({url: '/api/services/app/selectModuleConf/GetSelectModuleConfForEdit',
                    method: 'post',
                    data: inputArr}).then((data)=>{
                    if(data.success){
                         let result=data.result.selectModuleConf;
                        if(result!=null){
                            this.setBaseinfoConf(JSON.parse(result.baseInfoConf,util.dealFunction).baseInfo);
                            this.setApiConf(JSON.parse(result.apiConf,util.dealFunction).apiConf);
                            this.setFliterConf(JSON.parse(result.fliterConf,util.dealFunction).filterConf);
                            this.setTableinfoConf(JSON.parse(result.tableInfoConf,util.dealFunction).tableInfoConf);
                            this.setFunctionConf(JSON.parse(result.functionConf,util.dealFunction).functionConf);
                            this.setIsVisible(true);
                        }
                    }else{  
                            this.$message.error('获取数据失败！');
                    }
                })
          }
        },
        //---------------
        async init(){
            let menuModel=await this.getTableName(this.$route.path);
            this.tableName=menuModel.tableName;
            //判断是否有审批
            if(this.funBtnConf.approve!==undefined){
                this.approveSateInfo=await this.getApproveInfo(this.tableName);
            }
            this._inputArrInit();
            //初始化拦截
            this._mounted();
            //一些初始化逻辑
            this._loadData();
        },
         _mounted(){
                let _this=this;
                let eventConf=this.baseInfoConf.InterceptEvent;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.mounted.event(_this);
                    }
                }
        },
    },
    components:{
         roleApprove,
         approveState,
        },
    created(){
        this.searchModel=this.filterConf.searchModel;
        this.searchModel.selfFilterItem=this.filterConf.selfFilterConf.length>0?
        this.filterConf.selfFilterConf[0].val:'';  //初始化默认值
        this.funBtnConf=this.functionConf.funBtn;
    },
    mounted(){
        this.init();
       
    },
    watch:{
        getGlobString2:function(n,o){
                let _this=this;
                let eventConf=this.baseInfoConf.WatchEvent;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.event(_this);
                    }
                }
        }
    }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

