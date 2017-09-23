<template>
     <yl-columnlay  border
        :style="baseInfoConf.dialogConf.style"
        :hiddenLeft="baseInfoConf.layout.columnlay.hiddenLeft">
              <div slot="left">
                    <!--这里只能渲染带panel的树组件-->
                    <yl-renderselcoms  
                        @getCurrentNodeWithPanel="_getCurrentNodeWithPanel"
                        :option="filterConf.selfFilterConf.length>0?filterConf.selfFilterConf[0]:{}">
                    </yl-renderselcoms>
              </div>
              <div slot="right" >
                    <yl-layout >
                        <div slot="fristbox" >
                              <el-form :inline="true" >
                                <yl-toolbar v-if="baseInfoConf.layout.columnlay.upToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item 
                                            class="form-content-vertical" 
                                            v-for="item in filterConf.searchFilterConf.up">
                                                <yl-rendercoms  
                                                    :option="item"
                                                    :model="searchModel"
                                                    :refList="refList"
                                                    @change="_change"
                                                    @blur="_blur"
                                                    @init="_initComs">
                                                 </yl-rendercoms>
                                        </el-form-item>
                                        <el-form-item class="form-content-vertical" >
                                              <el-button 
                                                    v-show="true"
                                                    :disabled="false"  
                                                    type="primary" 
                                                    size="small"
                                                    @click="_reload()"> 
                                                   <i class="icon-search2"></i>查询 
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
                        </div>
                        <div slot="secondbox" class="flexbox">
                         <!--表显示区域-->
                             <yl-table ref="selecttable"
                                    @reload="_reload"
                                    @current-change="_currentChange" 
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
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import  {inputModel} from 'api/inputmodel';
export default {
    data(){
        return {
                mainInput:new inputModel(),
                mainTableLoading:false,
                searchModel:{},
                selectRows:[],
                currentRows:{},
                inputParams:[],
                refList:[],
                extensionObj:{}
          }
    },
    props:{
            apiConf:{require:true,type:Object,default:{}},
            baseInfoConf:{require:true,type:Object,default:{}},
            filterConf:{require:true,type:Object,default:{}},
            tableInfoConf:{require:true,type:Object,default:{}},
            orderId:{require:true,type:String,default:''}
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
        },
    methods:{
        _reload(){
            this._loadData();
        },
        _loadData(){
            let _this=this;
            this.selectRows=[];
            this.mainTableLoading=true;
            let inputArr=[];
            if(this.filterConf.selfFilterConf.length>0){
            inputArr.push({key:this.filterConf.selfFilterConf[0].name,  
                           op:this.filterConf.selfFilterConf[0].op,
                           value:this.searchModel.selfFilterItem});
            };                   
            this.filterConf.searchFilterConf.up.forEach((item,index)=>{
                 if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                 }
            });
            this.filterConf.searchFilterConf.down.forEach((item,index)=>{
                if(!(item.op==="EQ"&&this.searchModel[item.name]==="")){
                    let obj={};
                    obj.key=item.name;
                    obj.op=item.op;
                    obj.value=this.searchModel[item.name];
                    inputArr.push(obj)
                }
            });
            inputArr.push(...this.inputParams);
            this.mainInput.addqueryConditionItem(inputArr);
            this.mainInput.inputModel.sorting=this.filterConf.sorting;
            let _apiconf=this.apiConf.getItemPageList;
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
         _selectionChange(val){
           //多选方法
            if(val!=null){
                this.selectRows=[];
                this.selectRows=this.selectRows.concat(val);
            }
       },
        _currentChange(val){
                //单选时的方法
                if(val!=null){
                    this.selectRows=[];
                    this.selectRows.push(val);
                }
        },
        toggleRowSelection (row) {
            this.$refs.selecttable.toggleRowSelection(row)
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
        //事件触发方法----
        _initComs(option){
           let _this=this;
           if(option.eventConf!=undefined){
            if(option.eventConf.isOn){
                if(option.eventConf.init!=undefined){
                     option.eventConf.init(_this,option);
                }
            }
           }
         },
         _change(node,option){
            let _this=this;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
                if(eventConf.isOn){
                    if(eventConf.change!=undefined){
                        eventConf.change(node,_this,option);
                    }
                }
            }  
        },
        _blur(node,option){
                let _this=this;
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
        //---------------
        init(){
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
    },
    mounted(){
        this.init();
    },
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

