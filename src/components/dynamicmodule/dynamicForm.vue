<template>
<div class="form">
    <el-row class="yl-order-header" v-if="formConf.formHeader.isShow">
      <el-col :span="2">
        <img src="../../common/image/zgztlogo.png" alt="logo" class="yl-order-logo">
        </el-col>
      <el-col :span="18" > 
        <div class="yl-order-title">
            <span class="yl-order-small-title">{{globConf.order.title}}&nbsp;&nbsp;&nbsp;</span>
            {{formConf.formHeader.title}}
        </div>
      </el-col>
        <el-col :span="4">
        <div class="yl-order-code" v-if="baseInfoConf.moduleType==2"><span style="color: red;">NO.</span>{{formModel.order.orderCode}}</div>
      </el-col>
  </el-row>
    <el-form :model="formModel.order" ref="dynamicFormConf" label-width="100px" >
        <yl-renderFormLay  ref="renderFormLay"
          :dynamicFormConf="dynamicFormConf" 
          :model="formModel.order"
          :items="formModel.items"
          :refList="refList"
          @change="_change"
          @blur="_blur"
          @method1="_method1"
          @method2="_method2"
          @initComs="_initComs"
          @delItem="_delItem"
          @sumCount="_sumCount"
        ></yl-renderFormLay>
        <el-form-item>
            <el-checkbox v-model="isClose" v-if="afterAddClose">保存后关闭</el-checkbox>
            <div style="text-align:right;"  > 
                    <el-button v-for="(item,index) in functionConf.formBtn"    
                            :type="item.type" 
                            :name="item.name" 
                            :loading="item.loading"
                            :size="item.size" 
                            v-show="item.isShow"
                            :disabled="item.disabled"  
                            @click="_functionClick(item)" >
                        <i :class="item.icon"></i>{{item.text}}
                    </el-button>  
             </div>
        </el-form-item>
    </el-form>

    </div>
</template>
<script>
import fetch from 'api/fetch';
import renderFormLay from './renderFormLay.js';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import { mapGetters,mapActions } from 'vuex';
  export default {
    data() {
      return {
         isClose:true,
         dynamicFormConf:{},
         funConf:{},
         formModel:{},
         orderDateInital:'',
         refList:{},
         extensionObj:{},
      };
    },
    props:{
        formConf:{
            require:true,
            default:{},
            type:Object
        },
        apiConf:{
            require:true,
            default:{},
            type:Object
        },
        baseInfoConf:{
            require:true,
            default:{},
            type:Object
        },
        functionConf:{
            require:true,
            default:{},
            type:Object
        },
        selectRow:{
            type:Object,
            default:{},
        },
        selectRows:{
            type: Array,
            default:[] 
        },
        afterAddClose:{
            type:Boolean,
            default:false,
        },
        tableName:{
            type:String,
            default:'',
        }
    },
    computed:{
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
       ...mapGetters([ 'getGlobObject1','getGlobObject2','getGlobString1','getGlobArray1']),
    },
    methods: {
      ...mapActions(['setIsVisible','setBaseinfoConf','setApiConf','setFliterConf','setTableinfoConf','setFunctionConf']),
      ...mapActions(['setGlobObject1','setGlobObject2','setGlobString1','setGlobString2','setGlobalArray1']),
      _submitForm() {
        let _this=this;
        this.$refs['dynamicFormConf'].validate((valid) => {
          if (valid) {
            //保存之前对form表单做特殊处理
            this._beforeSubmit();

            if(this.baseInfoConf.moduleType==2){
                //主从结构
                if(this.formModel.items.length==0){
                            this.$message({ message: `请选择材料明细！`, type: 'warning'});
                            return;
                    }
                 if(this.formModel.order.id!==""){
                          //修改
                        if(this.orderDateInital==this.formModel.order.orderDate){
                            this.formModel.config.isGenerateCode=false;
                        }
                   }    
            }
          _this.functionConf.formBtn.save.loading=true;
           let _api={};
           if(this.baseInfoConf.moduleType==3){
             _api=this.apiConf.CreateMainList;
             _api.data.items=this.formModel.items;
           }else{
             _api=this.apiConf.createOrUpdateMainObject;
              _api.data=this.formModel;
           }
            fetch(_api).then(data=>{
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
                       _this.functionConf.formBtn.save.loading=false;
                    }).catch(function(error){
                      _this.functionConf.formBtn.save.loading=false;
                    })
          } else {
             this.$message.warning('请按照条件填充表单！');
             return false;
          }
          
        });
      },
      _resetForm() {
            this.resetFormModel();
      },
      _formInitial(){
            if(this.baseInfoConf.moduleType==1){
                //单表结构
                 Object.assign(this.formModel.order,this.selectRow);
            }
            else if(this.baseInfoConf.moduleType==2){
                 //主从表结构
                 this.orderDateInital=this.formModel.order.orderDate;
                 if(this.selectRow.id!=undefined){
                    let inputArr=[], _api=this.apiConf.getMainObjectForEdit,params={};
                    inputArr.push({
                                    dataField:"Id",
                                    op:'EQ',
                                    dataValue:this.selectRow.id,
                                });
                    params.queryConditionItem=inputArr;        
                    _api.data=params;
                    fetch(_api).then(data=>{
                        if(data.success){
                             Object.assign(this.formModel,data.result); 
                             this._sumCount();
                        }else{
                            this.$message.error('获取编辑表信息失败！');
                        }
                    });
               }
               else{
                   this._sumCount();
               }
            }else if(this.baseInfoConf.moduleType==3){
                this.formModel.items=this.selectRows;
            }
          },
      _sumCount(){
            let _this=this;
            let sumRowConf=this.dynamicFormConf.formConfig.filter(item=>{
                return item.type==="tableEdit"
            });
           
            if(sumRowConf.length>0){
                let eventConf=sumRowConf[0].elmentConfig.sumRowConf.eventConf;
                 this.extensionObj.sumRowConf=sumRowConf[0].elmentConfig.sumRowConf.items;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.sum(_this,sumRowConf[0].elmentConfig.sumRowConf);
                    }
                }
            }
      },
      _delItem(row){
                this.$confirm('确认要删除所选项目吗?', '提示', {
                type: 'warning',
                modal:false
            }).then(() => {
                        if(row.id!=="0"){
                            //后台删除
                             let obj={},_api={}; 
                             if(this.baseInfoConf.moduleType==2){_api=this.apiConf.deleteItemObject;}
                             else if(this.baseInfoConf.moduleType==3){_api=this.apiConf.deleteMainObject;}
                             obj.id=row.id;
                             _api.data=obj;
                            fetch(_api).then(data=>{
                                if(data.success){
                                    let index=this.formModel.items.indexOf(row);
                                    this.formModel.items.splice(index,1);
                                    this._sumCount();
                                    this.$notify({
                                            title: '成功',
                                            message: '删除数据成功！',
                                            type: 'success'
                                            });
                            }else {
                                this.$notify.error({
                                    title: '错误',
                                      message: '删除数据失败！'+data.error.message,
                                    });
                             }
                            })
                        }else{
                         //前台删除
                            let index=this.formModel.items.indexOf(row);
                            this.formModel.items.splice(index,1);
                            this._sumCount();
                            this.$notify({
                                            title: '成功',
                                            message: '删除数据成功！',
                                            type: 'success'
                                        });
                        }
                       
                }).catch(()=>{});
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
      //表单事件----------
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
       _method1(node,_coms){
            let _this=this,option=_coms.option;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
              if(eventConf.isOn){
                   if(eventConf.method1!=undefined){
                    eventConf.method1(node,_this,option);
                   }
              }
            }
      },
       _method2(node,_coms){
            let _this=this,option=_coms.option;
            let eventConf=option.eventConf;
            if(eventConf!=undefined){
              if(eventConf.isOn){
                  if(eventConf.method2!=undefined){
                    eventConf.method2(node,_this,option);
                  }
              }
            }
      },
      //------------
       _getCode(val,type=0){
                this.globalFunObject.generateOrderCode(this.tableName,this.formModel.order.orgId,val,(val)=>{
                this.formModel.order.orderCode=val;
             },type);
       },
      _complete(bool){
                this.$emit('close',bool);
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
      resetFormModel(){
                let  model=this.formModel.order;
                for(let item in model)
                { 
                    if(item!='Id'||item!='OrderId'){
                        if(typeof model[item]==="string"){
                            model[item]="";
                        }else if(typeof model[item]==="number"){
                            model[item]=0;
                        }else if(typeof model[item]==="boolean"){
                            model[item]=false;
                        }else{
                        }
                    }
                }
                //处理items
                if(this.formModel.items){
                    this.formModel.items=[];
                }
        },
        init(){
            this._formInitial();  //初始化表单
            },
        _mounted(){
                let _this=this;
                let eventConf=this.formConf.InterceptEvent.mounted;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.event(_this);
                    }
                }
        },
        _beforeSubmit(){
                let _this=this;
                let eventConf=this.formConf.InterceptEvent.beforeSubmit;
                if(eventConf!=undefined){
                    if(eventConf.isOn){
                        eventConf.event(_this);
                    }
                }
        }
     },
     created(){
            this.dynamicFormConf=this.formConf.formConfigs;
            this.formModel=this.formConf.formModel;
            this.funConf=this.functionConf;
            //清除表单
            this.resetFormModel();
        },
     mounted(){
        this.init();
        //自定义初始化
        this._mounted();
       
     },
    components:{
    'yl-renderFormLay':renderFormLay,
    },
  }
</script>