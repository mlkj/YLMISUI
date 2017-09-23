<template>
     <!--输入框值-->
   <el-input  ref="inputNum"
        v-if="option.type==='inputNum'" 
        type="number"
        v-model.number="model[option.name]" 
        :maxlength="option.elmentConfig.maxlength"
        :minlength="option.elmentConfig.minlength"
        :size="option.elmentConfig.size"
        :disabled="option.elmentConfig.disabled"
        :type="option.elmentConfig.type"
        :placeholder="option.elmentConfig.placeholder"
        :icon="option.elmentConfig.icon"
        :rows="option.elmentConfig.rows"
        :readonly="option.elmentConfig.readonly"
        :style="option.elmentConfig.style"
        @blur="_blur(model[option.name])"
   >
   </el-input>
  <!--输入框文本-->
   <el-input  ref="inputText"
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
        :style="option.elmentConfig.style"
        @blur="_blur(model[option.name])"
   >
    </el-input>
    <!--状态组件-->
    <el-switch  ref="switch"
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
        :style="option.elmentConfig.style"
        @change="_change"
    >
    </el-switch>

 

    <!--计数器-->
    <el-input-number  ref="inputNumber"
    v-else-if="option.type==='inputNumber'" 
    v-model="model[option.name]" 
    :min="option.elmentConfig.min" 
    :max="option.elmentConfig.max"
    :step="option.elmentConfig.step"
    :disabled="option.elmentConfig.disabled"
    :size="option.elmentConfig.size"
    :controls="option.elmentConfig.controls"
    :style="option.elmentConfig.style"
    @change="_change"
    >
    </el-input-number>


    <!--日期>-->
     <el-date-picker ref="datePicker"
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
        :style="option.elmentConfig.style"
         @change="_change"
      >
    </el-date-picker>


    <!--选择-->
     <!--<el-select  ref="select"
        v-else-if="option.type==='select'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :placeholder="option.elmentConfig.placeholder"
        :disabled="option.elmentConfig.disabled"
        :clearable="option.elmentConfig.clearable"
        :style="option.elmentConfig.style"
        @change="_change"
      >
        <el-option
            v-for="item in option.elmentConfig.data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
    </el-select>-->



     <!--选择树控件-->
     <yl-treeselect  ref="treeselect"
        v-else-if="option.type==='treeselect'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :defaultText="option.elmentConfig.defaultText"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :autofocus="option.elmentConfig.autofocus"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :stepByOne="option.elmentConfig.stepByOne"
        :treedata="option.elmentConfig.treedata"
        :loaddata="option.elmentConfig.loaddata"
        :isexpand="option.elmentConfig.isexpand"
        :defaultProps="option.elmentConfig.defaultProps"
        :textOnly="option.elmentConfig.textOnly"
        :filterTextVisibe="option.elmentConfig.filterTextVisibe"
        :style="option.elmentConfig.style"
        @getCurrentNode="_change"
      >
    </yl-treeselect>

     <!--工号选择-->
     <yl-ghtree ref="ghtree"
        v-else-if="option.type==='ghtree'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :defaultText="option.elmentConfig.defaultText"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :autofocus="option.elmentConfig.autofocus"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :style="option.elmentConfig.style"
        @getCurrentNode="_change"
      >
    </yl-ghtree>
     
     
     <!--组织机构选择-->
     <yl-organizetree ref="organizeTree"
        v-else-if="option.type==='organizeTree'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :isexpand="option.elmentConfig.isexpand"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :autofocus="option.elmentConfig.autofocus"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :style="option.elmentConfig.style"
        @getCurrentNode="_change"
      >
    </yl-organizetree>

     <!--字典选择控件-->
     <yl-datadictionaryforsel  ref="datadictionaryforsel"
        v-else-if="option.type==='datadictionaryforsel'" 
        v-model="model[option.name]" 
        :code="option.elmentConfig.code"
        :placeholder="option.elmentConfig.placeholder"
        :size="option.elmentConfig.size"
        :disabled="option.elmentConfig.disabled"
        :style="option.elmentConfig.style"
        @getCurrentvalue="_change"
      >
    </yl-datadictionaryforsel>

     <!--字典树控件-->
     <yl-datadictionaryfortree  ref="datadictionaryfortree"
        v-else-if="option.type==='datadictionaryfortree'" 
        v-model="model[option.name]" 
        :code="option.elmentConfig.code"
        :size="option.elmentConfig.size"
        :defaultText="option.elmentConfig.defaultText"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :isexpand="option.elmentConfig.isexpand"
        :style="option.elmentConfig.style"
        @getCurrentvalue="_change"
      >
    </yl-datadictionaryfortree>

 <!--仓库结构控件-->
     <yl-CkInfoTree  ref="ckInfotree"
        v-else-if="option.type==='ckInfotree'" 
        v-model="model[option.name]" 
        :size="option.elmentConfig.size"
        :readonly="option.elmentConfig.readonly"    
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :isexpand="option.elmentConfig.isexpand"
        :style="option.elmentConfig.style"
        @getCurrentNode="_change"
      >
    </yl-CkInfoTree>


<!--常用字典库控件-->
     <yl-comdatadictionary  ref="comdatadictionary"
        v-else-if="option.type==='comdatadictionary'" 
        v-model="model[option.name]" 
        :code="option.elmentConfig.code"
        :size="option.elmentConfig.size"
        :readonly="option.elmentConfig.readonly"
        :disabled="option.elmentConfig.disabled"
        :placeholder="option.elmentConfig.placeholder"
        :nodeStateConf="option.elmentConfig.nodeStateConf"
        :filterVisibe="option.elmentConfig.filterVisibe"
        :isexpand="option.elmentConfig.isexpand"
        :style="option.elmentConfig.style"
        @getCurrentNode="_change"
      >
    </yl-comdatadictionary>
    
     <!--常用供应商-->
     <!--<yl-comsupplier  ref="comsupplier"
            v-else-if="option.type==='comsupplier'" 
            v-model="model[option.name]" 
            :orgId="option.elmentConfig.orgId"
            :size="option.elmentConfig.size"
            :disabled="option.elmentConfig.disabled"
            :placeholder="option.elmentConfig.placeholder"
            :value="option.elmentConfig.value"
            :style="option.elmentConfig.style"
            @selectNode="_change"
            @clearBack="_method1">
         </yl-comsupplier> 

    <!--常用用料单位-->
     <!--<yl-comLabour  ref="comLabour"
            v-else-if="option.type==='comLabour'" 
            v-model="model[option.name]" 
            :orgId="option.elmentConfig.orgId"
            :size="option.elmentConfig.size"
            :disabled="option.elmentConfig.disabled"
            :placeholder="option.elmentConfig.placeholder"
            :value="option.elmentConfig.value"
            :style="option.elmentConfig.style"
            @selectNode="_change"
            @clearBack="_method1">
         </yl-comLabour> -->
         
      <!--合同-->      
    <!--<yl-contract ref="contract"
            v-else-if="option.type==='contract'" 
            v-model="model[option.name]" 
            :orgId="option.elmentConfig.orgId"
            :size="option.elmentConfig.size"
            :disabled="option.elmentConfig.disabled"
            :placeholder="option.elmentConfig.placeholder"
            :value="option.elmentConfig.value"
            :style="option.elmentConfig.style"
            @selectNode="_change"
            @clearBack="_method1">
         </yl-contract>  -->

    <!--通用选择器-->      
    <yl-commonselect ref="commonselect"
            v-else-if="option.type==='commonselect'" 
            v-model="model[option.name]" 
            :size="option.elmentConfig.size"
            :disabled="option.elmentConfig.disabled"
            :placeholder="option.elmentConfig.placeholder"
            :clearable="option.elmentConfig.clearable"
            :initData="option.elmentConfig.initData"
            :multiple="option.elmentConfig.multiple"
            :value="option.elmentConfig.value"
            :style="option.elmentConfig.style"
            :apiConf="option.elmentConfig.apiConf"
            :defaultProps="option.elmentConfig.defaultProps"
            :lists="option.elmentConfig.lists"
            :multipleLimit="option.elmentConfig.multipleLimit"
            @getCurrentNode="_change"
            @clear="_method1">
         </yl-commonselect>

        <!--明细编辑器-->       
       <yl-tableedit ref="tableEdit"
        v-else-if="option.type==='tableEdit'" 
        :tableConfig="option.elmentConfig.tableEditConfig"
        :tableData="this.items"
        :sumRowConf="option.elmentConfig.sumRowConf"
        :mapConfig="option.elmentConfig.tableEditMapConfig"
        @delItem="_delItem"
        @sumCount="_sumCount"
        >
        </yl-tableedit>

 </template>

<script type="text/babel">
import dataDictionaryForTree from 'ocomponents/datadictionary/dataDictionaryForTree'
import organizeTree from 'ocomponents/organize/organizeTree'
import roleTree from 'ocomponents/role/roleTree'
import provinceCitySelTree from 'ocomponents/provincecity/provinceCitySelTree'
import dataDictionaryForSel from 'ocomponents/datadictionary/dataDictionaryForSel'
import ComDataDictionary from 'ocomponents/comdatadictionary/ComDataDictionary'
import GHTree from 'ocomponents/gh/GHTree'
import standardGHTree from 'ocomponents/standardgh/standardGHTree'
import materialClassTree from 'ocomponents/materialclass/materialClassTree'
import ComSupplier from 'ocomponents/comsupplier/ComSupplier'
import ComLabour from 'ocomponents/comlabour/ComLabour'
import Contract from 'ocomponents/contract/Contract'
import CkInfoTree from 'ocomponents/ckInfo/CkInfoTree'
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
        },
        items:{
            type:Array,
            require:false
        },
        refList:{
            type:Object,
            require:false
        },
    },
    methods:{
      _change(node){
          this.$emit('change',node,this);
      },
      _blur(node){
          this.$emit('blur',node,this);
      },
      _method1(node){
          this.$emit('method1',node,this);
      },
      _method2(node){
          this.$emit('method2',node,this);
      },
      _initComs(){
          this.$emit('init',this);
      },
      _delItem(row){
           this.$emit('delItem',row);
      },
      _sumCount(){
           this.$emit('sumCount');
      }
      
    },
    components:{
       'yl-datadictionaryfortree':dataDictionaryForTree,
       'yl-datadictionaryforsel':dataDictionaryForSel,
       'yl-comdatadictionary':ComDataDictionary,
       'yl-organizetree':organizeTree,
       'yl-roletree':roleTree,
       'yl-provincecityseltree':provinceCitySelTree,
       'yl-ghtree':GHTree,
       'yl-standardghtree':standardGHTree,
       'yl-materialclasstree':materialClassTree,
       'yl-comsupplier':ComSupplier,
       'yl-comLabour':ComLabour,
       'yl-contract':Contract,
       'yl-CkInfoTree':CkInfoTree
    },
    created(){
       
    },
    beforeMount(){
       this._initComs();   
    },
    mounted(){
        this.refList[this.option.name]=this.$refs;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
