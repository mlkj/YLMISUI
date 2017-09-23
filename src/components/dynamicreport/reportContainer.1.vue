<template>
<yl-panelpage 
    :titleName="baseInfoConf.panelpage.titleName" 
    :icon="baseInfoConf.panelpage.icon" 
    :extendAttr="baseInfoConf.panelpage.extendAttr" 
    :reloadIsShow="baseInfoConf.panelpage.reloadIsShow" 
    :fullScreenIsShow="baseInfoConf.panelpage.fullScreenIsShow" 
    :helpIsShow="baseInfoConf.panelpage.helpIsShow" 
    @iconEvent="_iconEvent"
>
<div slot="content">
      <yl-columnlay 
        :hiddenLeft="baseInfoConf.layout.tableLay.hiddenLeft">
              <div slot="left">
                       <!--这里只能渲染带panel的树组件-->
                        <yl-renderselcoms  
                            @getCurrentNodeWithPanel="_getCurrentNodeWithPanel"
                            :option="filterConf.selfFilterConf.length>0?filterConf.selfFilterConf[0]:{}">
                        </yl-renderselcoms>
              </div>
              <div slot="right" >
                    <yl-layout>
                        <div slot="fristbox" >
                              <el-form :inline="true" >
                                <yl-toolbar v-if="baseInfoConf.layout.tableLay.upToolFilter.visiable">
                                 <!--过滤器-->
                                        <el-form-item class="form-content-vertical" v-for="item in filterConf.searchFilterConf.up">
                                                <yl-rendercoms  
                                                    :option="item"
                                                    :refList="refList"
                                                    :model="searchModel"
                                                    @change="_change"
                                                    @blur="_blur"
                                                    @init="_initComs">
                                                 </yl-rendercoms>
                                        </el-form-item>
                                         <el-form-item class="form-content-vertical" v-if="functionConf.searchBtn">
                                                <el-button 
                                                        v-show="functionConf.searchBtn.isShow"
                                                        :disabled="functionConf.searchBtn.disabled"  
                                                        :type="functionConf.searchBtn.type" 
                                                        :size="functionConf.searchBtn.size"
                                                        @click="_functionClick(functionConf.searchBtn)"> 
                                                        <i :class="functionConf.searchBtn.icon">  </i>
                                                        {{functionConf.searchBtn.text}} 
                                                </el-button>
                                         </el-form-item>
                                </yl-toolbar>
                                
                                <yl-toolbar v-if="baseInfoConf.layout.tableLay.downToolFilter.visiable">
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
                             <yl-toolbar  v-if="baseInfoConf.layout.tableLay.toolFunction.visiable">
                              <!--功能-->
                               <el-button-group ref="funtoolbar">  
                                      <el-button v-for="(item,index) in funBtnConf" 
                                                :type="item.type" 
                                                :name="item.name" 
                                                :size="item.size" 
                                                v-permissionSetting="item.permissionSetting"
                                                v-show="item.isShow"
                                                :disabled="item.disabled"  
                                                @click="_functionClick(item)" >
                                            <i :class="item.icon"></i>{{item.text}}
                                     </el-button>
                                </el-button-group>
                             </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                            <keep-alive>
                                <component 
                                    :is="currentView"
                                    :apiConf="apiConf"
                                    :baseInfoConf="baseInfoConf"
                                    :filterConf="filterConf"
                                    :tableInfoConf="tableInfoConf"
                                    :functionConf="functionConf"
                                ></component> 
                            </keep-alive>

                             </div>
                    </yl-layout> 
               </div>  
          <!--动态容器-->
            <!--<el-dialog ref="dynamicDialog" v-if="baseInfoConf.moduleType=='2'"
                :title="tableInfoConf.itemConf.baseInfo.dialogConf.title" 
				v-model="itemFormVisible" 
                :close-on-click-modal="true"
                lock-scroll
                :modal-append-to-body="false"
				:size="tableInfoConf.itemConf.baseInfo.dialogConf.size"
                :top="tableInfoConf.itemConf.baseInfo.dialogConf.top" >
                 <yl-querycontainer     
                        v-if="itemFormVisible"
                        :baseInfoConf="tableInfoConf.itemConf.baseInfo"
                        :apiConf="tableInfoConf.itemConf.apiConf"
                        :filterConf="tableInfoConf.itemConf.filterConf"
                        :tableInfoConf="tableInfoConf.itemConf.tableInfoConf"
                        :orderId="orderId"
                        >
                 </yl-querycontainer>
	       </el-dialog>-->

      </yl-columnlay>
 </div>
</yl-panelpage>
</template>

<script type="text/babel">
import fetch from 'api/fetch';
import dynamicReport from './dynamicReport'
import t2 from './t2'
import t3 from './t3'
export default {
    data(){
        return {
            currentView: 'tables'
          }
    },
    props:{
         apiConf:{
            type:Object,
            require:true,
        },
         baseInfoConf:{
            type:Object,
            require:true,
        },
         filterConf:{
            type:Object,
            require:true,
        },
         tableInfoConf:{
            type:Object,
            require:true,
        },
         functionConf:{
            type:Object,
            require:true,
        }

    },
    computed: {
            
    },
    methods:{
      _iconEvent(flag){
         this.currentView=flag;
      }
    },
    components:{
        'tables':dynamicReport,
        'chart1':t2,
        'chart2':t3,
        'chart3':t2,
    },
    mounted(){
    },
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
</style>

