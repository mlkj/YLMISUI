<template>
 
   <!--输入框值-->
   <el-input 
        v-if="option.type==='inputNum'" 
        type="number"
        v-model.number="model[option.name]" 
        :maxlength="option.elmentConfig.maxlength"
        :minlength="option.elmentConfig.minlength"
        :size="option.elmentConfig.size"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :icon="option.elmentConfig.icon"
        :rows="option.elmentConfig.rows"
        :readonly="option.elmentConfig.readonly"
        @blur="_blur(model[option.name])"
   >
   </el-input>
  <!--输入框文本-->
   <el-input 
        v-else-if="option.type==='inputText'" 
        v-model.trim="model[option.name]" 
        :maxlength="option.elmentConfig.maxlength"
        :minlength="option.elmentConfig.minlength"
        :size="option.elmentConfig.size"
        :disabled="option.elmentConfig.disabled"
        :type="option.elmentConfig.type"
        :placeholder="option.elmentConfig.placeholder"
        :icon="option.elmentConfig.icon"
        :rows="option.elmentConfig.rows"
        :readonly="option.elmentConfig.readonly"
        @blur="_blur(model[option.name])"
   >
   </el-input>
    <!--状态组件-->
    <el-switch
        v-else-if="option.type==='switch'"
        v-model="model[option.name]" 
        :width="option.elmentConfig.width"
        :disabled="option.elmentConfig.disabled"
        :on-color="option.elmentConfig.onColor"
        :off-color="option.elmentConfig.offColor"
        :on-text="option.elmentConfig.onText"
        :off-text="option.elmentConfig.offText"
        :on-value="option.elmentConfig.onValue"
        :off-value="option.elmentConfig.offValue"
        @change="_change"
    >
    </el-switch>

 
    <!--日期>-->
     <el-date-picker
        v-else-if="option.type==='datePicker'" 
         v-model="model[option.name]" 
        :type="option.elmentConfig.type"
        :size="option.elmentConfig.size"
        :placeholder="option.elmentConfig.placeholder"
        :format="option.elmentConfig.format"
        :align="option.elmentConfig.align"
        :defaultValue="option.elmentConfig.defaultValue"
        :disabled="option.elmentConfig.disabled"
        :editable="option.elmentConfig.editable"
        :clearable="option.elmentConfig.clearable"
         @change="_change"
         style="width:100%"
      >
    </el-date-picker>

     <!--字典选择控件-->
     <yl-datadictionaryforsel
        v-else-if="option.type==='datadictionaryforsel'" 
        v-model="model[option.name]" 
        :code="option.elmentConfig.code"
        :placeholder="option.elmentConfig.placeholder"
        :size="option.elmentConfig.size"
        :disabled="option.elmentConfig.disabled"
        @getCurrentvalue="_change"
      >
    </yl-datadictionaryforsel>

     <!--字典树控件-->
     <yl-datadictionaryfortree
        v-else-if="option.type==='datadictionaryfortree'" 
        v-model="model[option.name]" 
        :code="option.elmentConfig.code"
        :size="option.elmentConfig.size"
        :defaultText="option.elmentConfig.defaultText"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :autofocus="option.elmentConfig.autofocus"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :isexpand="option.elmentConfig.isexpand"
      >
    </yl-datadictionaryfortree> 

      <!--选择-->
     <el-select
        v-else-if="option.type==='select'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :placeholder="option.elmentConfig.placeholder"
        :disabled="option.elmentConfig.disabled"
        :clearable="option.elmentConfig.clearable"
        @change="_change"
      >
        <el-option
            v-for="item in option.elmentConfig.data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
    </el-select>

 </template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import globalJS from 'common/js/globalJS';
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree'
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import ComDataDictionary from 'ocomponents/comdatadictionary/ComDataDictionary'
import ComSupplier from 'ocomponents/comsupplier/ComSupplier'
import ComLabour from 'ocomponents/comlabour/ComLabour'
import Contract from 'ocomponents/contract/Contract'
export default {
    data(){
        return{
           treeData:[]
        }
    },
    props:{
        option:{
            type:Object,
            require:true
        },
        model:{
            type:Object,
            require:false
        }
    },
    computed:{
      fetchObject:{
        get(){
          return fetch;
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
      _change(node){
          let _this=this;
        if(this.option.eventConf!=undefined){
                    if(this.option.eventConf.isOn){
                        if(this.option.eventConf.change!=undefined){
                                this.option.eventConf.change(node,this.option,this.model,_this);
                        }
                    }
                }
      },
      _blur(node){
           let _this=this;
           if(this.option.eventConf!=undefined){
                if(this.option.eventConf.isOn){
                    if(this.option.eventConf.blur!=undefined){
                            this.option.eventConf.blur(node,this.option,this.model,_this);
                            //是否触发合计计算
                            if(this.option.eventConf.isSum!=undefined){
                            if(this.option.eventConf.isSum){
                                        this.$emit('sumCount');
                                }
                            }
                    }
                    
                }
           }
      },
      _initComs(){
           let _this=this;
           if(this.option.eventConf!=undefined){
            if(this.option.eventConf.isOn){
                 if(this.option.eventConf.init!=undefined){
                         this.option.eventConf.init(this.option,this.model,_this);
                 }
            }
         }
      },
     

    },
    components:{
       'yl-datadictionaryfortree':dataDictionaryForTree,
       'yl-datadictionaryforsel':dataDictionaryForSel,
       'yl-comdatadictionary':ComDataDictionary,
       'yl-comsupplier':ComSupplier,
       'yl-comLabour':ComLabour,
       'yl-contract':Contract,
    },
    created(){
    },
    beforeMount(){
        this._initComs();
    },
    mounted(){
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
