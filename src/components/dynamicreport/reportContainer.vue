<template>
<yl-panelpage 
    :titleName="baseInfoConf.panelpage.titleName" 
    :icon="baseInfoConf.panelpage.icon" 
    :extendAttr="baseInfoConf.panelpage.extendAttr" 
    :reloadIsShow="baseInfoConf.panelpage.reloadIsShow" 
    :fullScreenIsShow="baseInfoConf.panelpage.fullScreenIsShow" 
    :helpIsShow="baseInfoConf.panelpage.helpIsShow" 
    @iconEvent="_iconEvent"
>
<div slot="content">
     <yl-columnlay 
        :hiddenLeft="baseInfoConf.layout.tableLay.hiddenLeft">
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
                                <yl-toolbar v-if="baseInfoConf.layout.tableLay.upToolFilter.visiable">
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
                                                        <i :class="functionConf.searchBtn.icon">  </i>
                                                        {{functionConf.searchBtn.text}} 
                                                </el-button>
                                         </el-form-item>
                                </yl-toolbar>
                                
                                <yl-toolbar v-if="baseInfoConf.layout.tableLay.downToolFilter.visiable">
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
                             <yl-toolbar  v-if="baseInfoConf.layout.tableLay.toolFunction.visiable">
                              <!--功能-->
                               <el-button-group ref="funtoolbar">  
                                      <el-button v-for="(item,index) in funBtnConf" 
                                                :type="item.type" 
                                                :name="item.name" 
                                                :size="item.size" 
                                                v-permissionSetting="item.permissionSetting"
                                                v-show="item.isShow"
                                                :disabled="item.disabled"  
                                                @click="_functionClick(item)" >
                                            <i :class="item.icon"></i>{{item.text}}
                                     </el-button>
                                </el-button-group>
                             </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                                <!--表显示区域-->
                        </div>
                    </yl-layout> 
               </div>  
      </yl-columnlay>
 </div>
</yl-panelpage>  
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import {inputModel} from 'api/inputmodel';
import { mapActions } from 'vuex';
export default {
    data(){
        return {
                mainTableLoading:false,
                searchModel:{},
                selectRows:[],
                currentRows:{},
                funBtnConf:{},
                inputParams:[],
                itemFormVisible:false,
                orderId:'',
                tableName:"",
                refList:[],
                extensionObj:{},
                tableData:[],
                currentView:''
          }
    },
    props:{
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
                    globConf:{
                            get(){
                                return JSON.parse(util.getCookie('globConf'));
                            }
                        },
        },
    methods:{
       _iconEvent(flag){
         this.currentView=flag;
       },
        _reload(){
            this._loadData();
            this._funcState();
        },
        _reloadData(){
        },
        _loadData(){
            let _this=this;
            this.selectRows=[];
            this.mainTableLoading=true;
            let inputArr=this.apiConf.commonSqlExcute.data;
            this.inputParams.firstKeys=[];
            this.inputParams.firstValues=[];
            if(this.filterConf.selfFilterConf.length>0){
                this.inputParams.firstKeys.push(this.filterConf.selfFilterConf[0].name);
                this.inputParams.firstValues.push(this.searchModel.selfFilterItem);
            };
            this.filterConf.searchFilterConf.up.forEach((item,index)=>{
                this.inputParams.firstKeys.push(item.name);
                this.inputParams.firstValues.push(this.searchModel[item.name]);
            });
            this.filterConf.searchFilterConf.down.forEach((item,index)=>{
                 this.inputParams.firstKeys.push(item.name);
                 this.inputParams.firstValues.push(this.searchModel[item.name]);
            });
            inputArr.firstKeys=this.inputParams.firstKeys.join(",");
            inputArr.firstValues=this.inputParams.firstValues.join(",");
            let _apiconf=this.apiConf.commonSqlExcute;
                _apiconf.data=inputArr;
            fetch(_apiconf).then(data=>{    
                        if(data.success){
                            if(data.result.resultType===0){
                                  this.tableData=data.result.items[0];
                            }
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
                if(val!=null){
                    this.selectRows=[];
                    this.selectRows.push(val);
                }
                this._funcState();
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
        _viewItem(id){
                  this.itemFormVisible=true;
                  this.orderId=id;
        },
        _printPage(id){
            this.printVisible=true;
            this.reportUrl=this.globConf.reportUrl+this.tableInfoConf.printConf.iframeConf.src+"?id="+id;
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
                 this.inputParams.firstKeys.push(item.key);
                 this.inputParams.firstValues.push(item.value);
            });
        },
        //---------------
        async init(){
            let menuModel=await this.getTableName(this.$route.path);
            this.tableName=menuModel.tableName;
            this._inputArrInit();
            //一些初始化逻辑
            this._loadData();
        },
    },
    components:{
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
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

