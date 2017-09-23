<template>
   <el-autocomplete
    popper-class="my-autocomplete"
    v-model="resultVal"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    custom-item="my-item-contract"
    @select="_select"
    :props="defaultProps"
    :disabled="disabled"
    :size="size"
    :icon="icon"
    :on-icon-click="_clearInput"
    >
    </el-autocomplete>
</template>

<script type="text/babel">
import vue from 'vue'
import fetch from 'api/fetch'
import  {inputModel} from 'api/inputmodel';
vue.component('my-item-contract', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'name' } }, [item.v_Col9]),
        h('div', { attrs: { class: 'addr' } }, [item.v_Col6]),
        h('div', { attrs: { class: 'addr' } }, [item.v_Col8])
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
});

export default {
  data() {
      return {
        restaurants: [],
        mainInput:new inputModel(),
        timeout:null,
        defaultProps: {
          value: 'v_Col9',
          label: 'v_Col9'
        },
        manageOrgId:this.getUserInfo().user.manageOrgId,
        resultVal:'',
        icon:'caret-bottom',
      };
    },
    props:{
         orgId:{
                    type:String,
                    default:''
                }, 
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
        supplierId:{
                    type:String,
                    default:''
        },
        value:{
                  type:String,
                  default:''
                }, 
        
    },
    methods: {
      loadAll(supid) {
            var inputArr=[ 
                            {key:"V_Col9",op:"LIKE",value:this.value},
                            {key:"OrgId",op:"EQ",value:this.manageOrgId},
                         ];
            if(supid!=""){
                inputArr.push({key:"O_Col30",op:"EQ",value:supid});
            }
            //排序
            this.mainInput.inputModel.sorting="OrderCode asc";
            this.mainInput.inputModel.maxResultCount=10000;
            this.mainInput.addqueryConditionItem(inputArr);
            fetch({
              url: "/api/services/app/table5Order/getMainPageList",
              method: "post",
              data: this.mainInput.inputModel
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
                 return (state.v_Col9.indexOf(queryString.toLowerCase()) === 0);
          };
      },
      _select(item) {
        //选择事件
        this.$emit('selectNode',item);
        this.$emit('input',item.v_Col9);
      },
      _clearInput(){
         this.$emit('input',"");
         this.$emit('clearBack');
         this.resultVal="";
      }
    },
    mounted() {
        if(this.orgId!=''){
            this.manageOrgId=this.orgId;
        }
       this.loadAll(this.o_Col30);
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

