<template>
    <yl-tableR ref="mainTable"
            @reload="_reloadData"
            @current-change="_currentChange"
            :configs="tableInfoConf"
            :tableData="tableData" 
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
    </yl-tableR>
</template>

<script type="text/babel">
export default {
    data(){
        return {
          
        }
    },
    props:{
        tableInfoConf:{
            type:Object,
            require:true,
        },
        tableData:[],  
        mainTableLoading:false,
    },
    methods:{
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
       _currentChange(val){
                //单选时的方法
                if(val!=null){
                    this.selectRows=[];
                    this.selectRows.push(val);
                }
                this._funcState();
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
