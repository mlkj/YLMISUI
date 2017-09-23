<template>
 <yl-reportcontainer 
        v-if="isRender" 
        :apiConf="apiConf"
        :baseInfoConf="baseInfoConf"
        :filterConf="filterConf"
        :tableInfoConf="tableInfoConf"
        :functionConf="functionConf">
 </yl-reportcontainer>
   

</template>

<script type="text/babel">
import fetch from 'api/fetch';
import util from 'common/js/util';
import reportContainer from 'components/dynamicreport/reportContainer';
export default {
    data(){
        return {
            isRender:false,
            mConfigs:{},
        }
    },
    computed:{
                apiConf:function(){
                    return JSON.parse(this.mConfigs.apiConf,util.dealFunction).apiConf;
                },
                baseInfoConf:function(){
                    return JSON.parse(this.mConfigs.baseInfoConf,util.dealFunction).baseInfo;
                },
                filterConf:function(){
                    return JSON.parse(this.mConfigs.fliterConf,util.dealFunction).filterConf;
                },
                tableInfoConf:function(){
                    return JSON.parse(this.mConfigs.tableInfoConf,util.dealFunction).tableInfoConf;
                },
                functionConf:function(){
                    return JSON.parse(this.mConfigs.functionConf,util.dealFunction).functionConf;
                },
    },
    methods:{
        init(){
            this.isRender=false;
             let moduleCode=this.$route.params.tableName;
              let inputArr=[],params={};
                inputArr.push({
                    dataField:"ExtensionTwo",
                    op:'EQ',
                    dataValue:moduleCode,
                });
                params.queryConditionItem=inputArr;
                fetch({
                     url: '/api/services/app/reportConf/getMainObjectForEdit',
                     method: 'post',
                     data: params
                }).then((data)=>{
                      if(data.success){
                        this.mConfigs=data.result.order;
                        this.isRender=true;
                      } 
                      else {
                          this.$message.error('失败！'+data.error.message);
                      }
                    });
        },
    },
    components:{
        'yl-reportcontainer':reportContainer,
    },
    created(){
    },
    mounted(){
        this.init();
    }, 
     watch:{
          "$route": "init"
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
