<template>
   <el-autocomplete
    popper-class="my-autocomplete"
    custom-item="my-item-commonselect"
    v-model="resultVal"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    :props="configs.defaultProps"
    :disabled="disabled"
    :size="size"
    :icon="icon"
    :on-icon-click="_clearInput"
    @select="_select"
    >
    </el-autocomplete>
</template>

<script type="text/babel">
import vue from 'vue'
import fetch from 'api/fetch'
import  {inputModel} from 'api/inputmodel';

vue.component('my-item-commonselect', {
    functional: true,
    render: function (h, ctx) {
      console.log(ctx);
      var item = ctx.props.item;
      var queryAttr=ctx.props.queryAttr;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [queryAttr]),
        h('div', { attrs: { class: 'addr' } }, [item.supplierContact]),
        h('div', { attrs: { class: 'addr' } }, [item.supplierPhone])
      ]);
    },
    props: {
      item: { type: Object, required: true },
      queryAttr:{type: String, required: true}
    }
});

export default {
  data() {
      return {
        restaurants: [],
        mainInput:new inputModel(),
        timeout:null,
        resultVal:'',
        icon:'caret-bottom',
      };
    },
    props:{
         placeholder:{
                    type:String,
                    default:''
                  }, 
        disabled:{
                    type:Boolean,
                    default:false
                  },
        size:{
                  type:String,
                  default:''
        },
        configs:{
        },
        value:{
                  type:String,
                  default:''
                }, 
    },
    methods: {
      loadAll() {
            let obj={key:this.configs.queryAttr,op:"LIKE",value:this.value}
            this.configs.dataSource.inputArr.push(obj);
            this.mainInput.inputModel.sorting=this.configs.dataSource.sorting;
            this.mainInput.inputModel.maxResultCount=10000;
            this.mainInput.addqueryConditionItem(this.configs.dataSource.inputArr);
            fetch({
                url:this.configs.dataSource.apiUrl,
                method:'post',
                data:this.mainInput.inputModel
            }).then(data =>{  
                    if(data.success){
                         this.restaurants=data.result.data;
                      }
                    else{
                        this.restaurants=[];
                    }
            })
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (state) => {  
              return (state[this.configs.queryAttr].indexOf(queryString.toLowerCase()) === 0);
          };
      },
      _select(item) {
        //选择事件
        this.$emit('selectNode',item);
        this.$emit('input',item[this.configs.queryAttr]);
      },
      _clearInput(){
         this.$emit('input',"");
         this.$emit('clearBack');
         this.resultVal="";
      }
    },
    mounted() {
       this.loadAll();
    },
   components:{
        },
    watch:{
      value:function (val, oldVal) {
           this.resultVal=this.value;
        },
      resultVal:function (val, oldVal) {
          if(val!=''){
             this.icon="close";
           }else{
             this.icon="caret-bottom";
           }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" >
.my-autocomplete
    li
        line-height:20px
        padding:2px 5px 0px 5px
        .name
            font-size:12px
            text-overflow:ellipsis
            white-space:nowrap 
            overflow:hidden
        .addr
            text-overflow:ellipsis
            white-space:nowrap 
            overflow:hidden
            font-size:12px
            color: #8492A6
</style>

