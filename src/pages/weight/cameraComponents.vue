<template>
    <div class="camera" >
            <object :id="configs.id" 
                    width="370" 
                    height="180" 
                    classid="clsid:A3FC6E0D-1B70-4338-B506-4F96779996CC"  
                    codebase="activex/IPCamera.cab">
            </object>
         <div class="title">{{configs.title}}</div>  
  </div>
</template>

<script type="text/babel">
export default {
    data(){
        return{
            status:'E99',
        }
   },
   props:{
       configs:{}
   },
   methods:{
       cameraInit(){
            console.log('初始化摄像头')
            //IP摄像头IP、端口和账号
            let initConf=this.configs.initConf;
            this.status=this.IPCamera.init(initConf.ip, initConf.port,initConf.user,initConf.password,initConf.code);
           // this.status=this.IPCamera.init("192.168.20.91", 8000, "admin", "a1234567", "070030");
            if(this.status!="E00"){
                 this.$message.error('摄像头初始化失败！');
            }
            //***IPCamera11.setSize(Width,Height)***
            this.IPCamera.setSize(370,180);
       }
   },
   computed: {
        IPCamera:{
            get(){
                return document.getElementById(this.configs.id);
            }
        } 
    },
   components:{
   },
   mounted(){
      this.cameraInit();
   },
   beforeDestroy() {
        console.log('正在销毁摄像机连接')
        //    let IPCamera=document.getElementById(this.configs.id);
        //    console.log(IPCamera);
        //    if(this.status=="E00") 
        //    IPCamera.close();
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
.title {background-color: #333;width:100%;height:20px;color:aliceblue;font-size:12px;line-height:20px;padding-left:5px;}
</style>
