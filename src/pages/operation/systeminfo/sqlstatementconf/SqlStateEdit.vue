<template>
    <div>
        <el-form  :model="formModel"  :rules="rules"  ref="formModel" label-width="100px">
            <el-form-item label="配置名称" prop="confName">
                <el-input v-model="formModel.order.confName" ></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="remark">
                <el-input type="textarea" v-model="formModel.order.remark" ></el-input>
            </el-form-item>
                <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="formModel.order.content" :rows="15"></el-input>
            </el-form-item>
            
             <el-form-item style="text-align:right;" >
                <el-button @click="_resetForm">重置</el-button>
                <el-button type="primary" @click="_onSubmit" :loading="loading">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/babel">
import {requestcreateOrUpdateMainObject} from 'api/sqlstatementconf';
export default {
    data(){
        return{
            formModel:{
                order:{
                    confName: "",
                    content: "",
                    remark: "",
                    sortCode: 0,
                    id: ""
                }
            },
            rules:{},
            loading:false
        }
    },
    props:{
        selectRow:{}
    },
    methods:{
            _onSubmit(){
                    let _this=this;
                    this.$refs.formModel.validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        let params={};
                        params=this.formModel;
                        requestcreateOrUpdateMainObject(params).then(data=>{
                        if(data.success){
                                this.$notify({
                                    title: '成功',
                                    message: '保存数据成功！',
                                    type: 'success'
                                    });
                                //关闭面板
                                this._complete();
                            }
                            else {
                                _this.$message.error('保存数据失败！'+data.error.message);
                            }
                                this.loading=false;
                        }).catch(function(error){
                        this.loading=false;
                        })
                    } else {
                        this.$message.warning('请按照条件填充表单！');
                        return false;
                    }
                
                });
            },
            _resetForm() {
                 this.$refs.formModel.resetFields();
            },
            _complete(){
                this.$emit('close');
            },
    },
    mounted(){
        Object.assign(this.formModel.order,this.selectRow); 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
