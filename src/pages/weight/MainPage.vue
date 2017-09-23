<template>
<yl-panelpage :titleName="'过磅影像称重'" >
    <div slot="content">
        <div class="main">
            <div class="top">
                 <yl-lazyrender :time="300" class="dibangs">
                    <dbComponents :configs="dbconfigs"></dbComponents>
                 </yl-lazyrender>
                  <yl-lazyrender :time="300" v-for="item in cameraconfigs" class="cameras">
                     <cameraComponents :configs="item" ></cameraComponents>
                  </yl-lazyrender>
            </div>  
            <div class="middle">
                 <yl-layout>
                        <div slot="fristbox" >
                             <yl-toolbar>
                                       <el-button-group>
                                            <el-button type="primary"   size="small" @click="changePage('commonGb_PT')">普通过磅</el-button>
                                            <el-button type="primary"  size="small"@click="changePage('commonGb_LS')">出场过磅</el-button>
                                            <el-button type="primary"  size="small" @click="changePage('commonGb_DB')">临时过磅</el-button>
                                       </el-button-group>     
                              </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                             <keep-alive>
                                <component 
                                    :is="currentView"
                                ></component> 
                            </keep-alive>
                        </div>
                   </yl-layout>
            </div>
        </div>    
    </div>
</yl-panelpage>
</template>

<script type="text/babel">
import commonGb_PT from './commonGb_PT';
import commonGb_LS from './commonGb_LS';
import dbComponents from './dbComponents';
import cameraComponents from './cameraComponents';
export default {
    data(){
        return{
            currentView:'commonGb_PT',
            dbconfigs:{
                initConf:{
                    bclx:'1',
                    ckbh:'COM1',
                    btl:9600,
                    jojyw:'0',
                    sjw:3,
                    tzw:'1',
                    mfz:22,
                },
            },
            cameraconfigs:[
                {
                    id:'camera1',
                    title:'车前摄像头',
                    initConf:{
                        ip:'192.168.20.90',
                        port:'8000',
                        user:'admin',
                        password:'a1234567',
                        code:'041062'
                    },
                },
                {
                    id:'camera2',
                    title:'车顶摄像头',
                    initConf:{
                        ip:'192.168.20.91',
                        port:'8000',
                        user:'admin',
                        password:'a1234567',
                        code:'041062'
                    },
                }
            ],
        }
   },
   methods:{
       changePage(val){
         this.currentView=val;
       }
   },
   components:{
       commonGb_PT,
       commonGb_LS,
       dbComponents,
       cameraComponents,
    //   dbComponents:resolve => {require(['./dbComponents'], resolve)},
    //   cameraComponents:resolve => {require(['./cameraComponents'], resolve)},
      
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
     .main {width:100%;height:100%;display:flex;flex-direction:column;}
     .main .top {background-color:black;height:200px;display:flex;flex-direction:row;}
     .main .top .dibangs {background-color:grey;flex:1;}
     .main .top .cameras {background-color:grey;width:370px;}
     .middle  {flex:1;}
     .statustext {color:green;font-size:12px}
</style>
