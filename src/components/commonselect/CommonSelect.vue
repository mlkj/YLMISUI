<template>
    <el-select v-model="currentValue" 
         filterable 
        :placeholder="placeholder" 
        :size="size" 
        :clearable="clearable" 
        :multiple="multiple"
        :multiple-limit="multipleLimit"
        :disabled="disabled"
        @clear="_clear" 
        @change="_change">
            <el-option v-for="item in data" 
                 style="width:100%;height:auto;" 
                :key="item[defaultProps.value]"  
                :label="item[defaultProps.text]" 
                :value="item[defaultProps.value]" >
                    <div style="height:18px; font-size: 13px">{{item[defaultProps.text]}}</div> 
                    <div v-for="listitem in lists" style="height:15px;color: #8492a6; font-size: 12px" >{{ item[listitem]}}</div>
               </el-option>
    </el-select>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import  {inputModel} from 'api/inputmodel';
import emitter from '@/mixns';
export default {
     data() {
      return {
        data: [],
        currentValue: this.value,
        mainInput:new inputModel(),
        currentNode:[]
      }
    },
    mixins: [emitter],
    props:{
        apiConf:{
            type:Object,
            default:{
                function(){
                    return {
                        url:"",
                        query:[],
                        sorting:""
                    }
                }
            }
        },
        lists:{//下拉列表显示选项
            type:Array,
            default: function () {
               return []
            }
        },
        initData:{
            type:Array,
            default: function () {
                        return []
                    }
        },
        defaultProps:{//select的Text值和唯一的ID的设置
            type:Object,
            default:{
                text:"",
                value:""
            }
        },
        size:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        clearable:{
            type:Boolean,
            default:true
        },
        placeholder:{
            type:String,
            default:""
        },
        multiple:{//是否多选
            type:Boolean,
            default:false
        },
        multipleLimit:{
            type:Number,
            default:5
        },
        value:[String,Number],
    },
    methods:{
        loadAll() {
            //排序
                this.mainInput.inputModel.sorting=this.apiConf.sorting;
                this.mainInput.inputModel.maxResultCount=10000;
                this.mainInput.addqueryConditionItem(this.apiConf.query);
                fetch({
                    url: this.apiConf.url,
                    method: "post",
                    data: this.mainInput.inputModel
                    }).then(data =>{
                    if(data.success){
                            this.data=data.result.data;
                        }
                    else{
                        this.data=[];
                    }
            })
        },
        _change(nodes){
              let _this=this;
              _this.currentNode=[];
            if(nodes!=''){
                let val=_this.defaultProps.value;
                if(_this.multiple==true){
                    for(var i=0; i<nodes.length; i++){
                        let item=_this.data.filter(function(item){
                                    return  _this.currentNode[val]== nodes[i]; 
                                    });
                        _this.currentNode.push(item[0])
                    }
                   // this.$emit('input',nodes);
                    this.$emit('getCurrentNode',_this.currentNode);
                }else{
                    this.$emit('input',nodes);
                        if(_this.data.length!==0){
                            let item=_this.data.filter(function(item){
                                return  item[val] == nodes; 
                            })
                             _this.currentNode.push(item[0]);
                             this.$emit('getCurrentNode',_this.currentNode);
                       }
                   
                }
               
            }
        },
        _clear(){
            this.$emit('clear',this.currentNode);
        },
        _setCurrentValue(value) {
            if (value === this.currentValue)return;
                this.currentValue = value;
                //this.loadAll();
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        }
    },
    watch:{ 
        value:function(val, oldVal){
            this._setCurrentValue(val);
        }
    },
    mounted(){
        if(this.initData.length>0){
            this.data=this.initData;
        }else{
            this.loadAll();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
