<template>
    <yl-treeselect 
    :value="value" 
    :treedata="treedata" 
    :defaultProps="defaultProps" 
    :isexpand="isexpand" 
    :textOnly="textOnly"
    :size="size"
    :readonly="readonly"
    :disabled="disabled"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :filterTextVisibe="filterVisibe"
    @getCurrentNode="_getCurrentNode" >
    </yl-treeselect>
</template>

<script type="text/babel">
import util from 'common/js/util';
import fetch from 'api/fetch';
import {requestGetMenuItemTreeList} from 'api/menuitem'
export default {
    data(){
        return{
            treedata:[],   
            defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
            },
        }
    },
    props:{
        isexpand:{type: Boolean,default: false },
        value:[String,Number],
        size:{
                    type: String,
                    default: "", 
       },
       readonly:{
                    type: Boolean,
                    default: false 
       }, 
       disabled:{
                    type: Boolean,
                    default: false 
       }, 
       placeholder:{
                    type: String,
                    default: "" ,
       }, 
       autofocus:{
                    type: Boolean,
                    default: false,
       },
       filterVisibe:{
                    type: Boolean,
                    default: true,
       },
       textOnly:{
            type: Boolean,
            default: true,
       }
    },
    methods:{
        _getCurrentNode(selectNode){
             if(this.textOnly){ 
                this.$emit('input',selectNode.text);
                }
            else{ 
                this.$emit('input',selectNode.id);
                }
             this.$emit('getCurrentNode',selectNode);
        },
        _getTreeList(){
            requestGetMenuItemTreeList().then(data=>{
                      if(data.success){
                            this.treedata=util.returnDatabyTree(data.result,this.guidOfNull());
                        }
                        else {
                             this.$message.error('获取数据失败！'+data.error.message);
                        }
            })
        }
    },
    mounted(){
        this._getTreeList();
    },
    components:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
