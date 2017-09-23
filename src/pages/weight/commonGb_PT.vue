<template>
        <yl-layout class="gbpt">
            <div slot="fristbox" class="editor">
                    <el-form  :model="formModel"  ref="formModel" label-width="100px" class="formStyle">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="字段一" prop="tableName">
                                    <el-input v-model="formModel.data1" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段二" prop="tableName">
                                    <el-input v-model="formModel.data2"  size="small"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段三" prop="tableName">
                                    <el-input v-model="formModel.data3" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段四" prop="tableName">
                                    <el-input v-model="formModel.data4" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="字段一" prop="tableName">
                                    <el-input v-model="formModel.data1" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段二" prop="tableName">
                                    <el-input v-model="formModel.data2"  size="small"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段三" prop="tableName">
                                    <el-input v-model="formModel.data3" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段四" prop="tableName">
                                    <el-input v-model="formModel.data4" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="字段一" prop="tableName">
                                    <el-input v-model="formModel.data1" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段二" prop="tableName">
                                    <el-input v-model="formModel.data2"  size="small"></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段三" prop="tableName">
                                    <el-input v-model="formModel.data3" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="字段四" prop="tableName">
                                    <el-input v-model="formModel.data4" size="small" ></el-input>
                                </el-form-item> 
                            </el-col>
                        </el-row>
                    </el-form>
            </div>
            <div slot="secondbox" class="flexbox">
                <yl-layout>
                        <div slot="fristbox" >
                                <yl-toolbar class="toolbar">
                                    <el-button :plain="true" type="success" size="small">成功按钮</el-button>
                                    <el-button :plain="true" type="success" size="small">成功按钮</el-button>
                                    <el-button :plain="true" type="success" size="small">成功按钮</el-button>
                                    <el-button :plain="true" type="success" size="small">成功按钮</el-button>
                                </yl-toolbar>
                        </div>
                        <div slot="secondbox" class="flexbox">
                                <yl-table ref="GbTable"
                                    @reload="_reload"
                                    @current-change="_currentChange"
                                    :configs="tableConfig" 
                                    :input="mainInput.inputModel"
                                    :tableloading="mainTableLoading" 
                                    >
                                <!--自定义列模板
                                        <template slot="isDisable" scope="scope">
                                            <el-tag type="primary" v-if="scope.row.showFlag">启用</el-tag>
                                            <el-tag type="danger" v-else>禁用</el-tag>
                                        </template>
                                        -->
                                </yl-table>
                        </div>
                    </yl-layout>         
            
            </div>
        </yl-layout>
</template>

<script type="text/babel">
import  {inputModel} from 'api/inputmodel';
export default {
    data(){
        return{
            selectRows:[],
            mainInput:new inputModel(),
            mainTableLoading:false,
            tableData:[],
            formModel:{
                data1:'',
                data2:'',
                data3:'',
                data4:'',
                data5:'',
                data6:'',
                data7:'',
                data8:'',
                data9:'',
                data10:'',
                data11:'',
                data12:'',
            }
        }
    },
  computed: {
            tableConfig: {
                    get () {
                        return {
                            table: {
                                attr: {
                                    data: this.tableData,
                                    highlightCurrent:true,
                                }
                            },
                            columns: [
                                {attr: { type: 'index',label: '序号', width:80,align: 'center' }},
                                {attr: { prop: 'remark', label: '标题', width:150,} },   
                                {attr: { prop: 'tableName', label: '配置表', width:240,  } },   
                                {attr: { prop: 'dateColName', label: '配置日期列', width:150,  } },   
                                {attr: { prop: 'codeColName', label: '配置编码列', width:150,  } },   
                                {attr: { prop: 'rType', label: '类型', width:80,  } },   
                                {attr: { prop: 'sortCode', label: '排序', } },
                            ]
                        }
                    }
                }
        },
   methods:{
        _reload(){
            this._getDataPageList();
        },
        _getDataPageList(){

        },
         _currentChange(val){
                //单选时的方法
                if(val!=null){
                     this.selectRows=[];
                     this.selectRows.push(val);
                }
               
       },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" rel="stylesheet/css" scoped>
.gbpt .editor{height:120px}
.gbpt .editor .formStyle{margin:0px 10px 0px 0px}
.gbpt .formStyle .el-row .el-form-item{margin-bottom:3px}
.toolbar{box-sizing: border-box;border:1px #ddd solid;}
</style>
