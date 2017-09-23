
<template>
<div class="approve">
  <div v-for="item in stateList">
      审批阶段：<span>{{item.stateDesc}}</span>
      操作人：<span>{{item.dealUserName}}</span>
      操作时间：<span>{{item.dealTime}}</span>
      状态：<span>{{item.stateText}}</span>
      审批意见：<span>{{item.dealOptions}}</span>
      </div>
</div>
</template>

<script type="text/babel">
import fetch from  'api/fetch';
export default {
    data(){
        return{
            stateList:[]
        }      
    },
    props:{
        orderId:{
            type:String,
            default:'',
        }
    },
    methods:{
         _getApproveInfo(){  
             let Params={},inputArr=[];
             Params.sorting="DealTime asc";
             inputArr.push({
                 dataField:'OrderId',
                 op:'EQ',
                 dataValue:this.orderId,
             });
             Params.queryConditionItem=inputArr;
            fetch({ 
                url: '/api/services/app/approveFlow/GetApproveFlows',
                method: 'post',
                data:Params
            }).then((data)=>{
                if(data.success){
                   this.stateList=data.result;
                }
            })
        },
    },
    components:{
    },
     mounted(){
         this._getApproveInfo();
    },
     watch:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
