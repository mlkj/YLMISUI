# 公共组件
##  布局类
### layout

##  表格

### 表格组件

> ###### 引用方式  

**全局引入** ``` <yl-table ></yl-table>```

#### 单选用法示例


```html
     <yl-table ref="table"
                    @reload="_reload"
                    @current-change="_currentChange"
                    :configs="tableConfig" 
                    :input="mainInput.inputModel"
                    :tableloading="mainTableLoading"  
                    >
                    <template slot="id" scope="scope"> 
                        <div class="yl-table-icon">  
                            <i class="icon-search2"  @click="_viewItem(scope.row.id)"></i>
                        </div>
                    </template>
                    <template slot="view" scope="scope"> 
                        <div class="yl-table-icon">  
                            <i class="icon-eye3"  @click="_viewItem(scope.row.id)"></i>
                        </div>
                    </template>
                    <template slot="isActive" scope="scope">
                        <el-tag type="primary" v-if="scope.row.isActive">启用</el-tag>
                        <el-tag type="danger" v-else>禁用</el-tag>
                    </template>
            </yl-table>
```

```javascript
   export default {
    data() {
      return {
        value:''
        treedata: [],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
                    console.log(selectNode)
            },
    //一次加载树
    _getdata(){
        requestGetMenuItemTreeList().then(data => {
                if(data.success){
                    //如果data.result是平行结构数据 
                    //需要调用util.returnDatabyTree()递归处理
                    this.treedata=util.returnDatabyTree(data.result,'');
                    
                }
            })
    },
    },
     mounted(){
        //初始化树控件
        this._getdata();
    },
   }
```

###### 逐级加载方式


```html
    <yl-treeselect 
    v-model="value" 
    :treedata="treedata" 
    :loaddata="loaddata" 
    :StepByOne="StepByOne" 
    :defaultProps="defaultProps" 
    :textOnly="textOnly"
    :defaultText="defaultText"
    @getCurrentNode="_getCurrentNode" 
    @nodeExpend="_nodeExpend"
    >
    </yl-treeselect>
```

```javascript
   export default {
    data() {
      return {
        id:''
        treedata:[],
        loaddata:[],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
        StepByOne:true,
        textOnly:false,
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
              console.log(selectNode)
            },
    _nodeExpend(result){
        _getdata(val){
    },
    //加载树
    _getdata(val){
        requestGetMenuItemTreeList(val).then(data => {
                if(data.success){
                       //如果不是根节点
                        if(val!=this.guidOfNull()){
                           this.loaddata=data.result;
                        }else{
                            this.treedata=data.result;
                         }  
                 }  
            })
     },
    },
     mounted(){
        //初始化树控件
         let params=this.guidOfNull();
        this._getdata(params);
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| treedata      | 绑定树的数据集合，（在逐步加载时为根节点数据集合） | Array|[ ] |
| loaddata      | 在逐步加载的集合中使用，每次加载逐步加载时将获取值传至该对象 |  Array|[ ] |
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
| defaultProps      | 该属性为element tree控件集成属性 | obj |{} |
| textOnly      | 只使用文本值时使用 | Boolean |false |
| stepByOne      | 是否为逐步加载模式 | Boolean |false |
| defaultText      | 默认文本值（只针对逐步加载模式适用） | String |'' |
| size      |控件样式大小（nomarl/small） | String |'nomarl' |	
| placeholder |输入提示文本 | String |'' |	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|
| nodeExpend      | 节点展开时触发，（只在stepByOne为true时有效） | 为当前选中节点的node对象 |




---
##  表单类


### 控件渲染器

> 控件渲染器主要根据传入配置渲染控件相关配置，主要作用于表单生成渲染，过滤器生成渲染，tableedit控件行内渲染。

```json
  {
            "title": "父节点", //显示标题 在表单渲染时有用
            "name": "parentId", //绑定对象属性 
            "type": "ghtree", //控件类型，在renderComs组件中是唯一的。
            "op": "", //主要用于过滤器。配置过滤条件
            "position": { //表单控件布局配置
                            "spanNum": 12, //24列布局，当前控件占据的列数
                            "alone": false,//是否独占一行
                        },
            "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                                "placeholder": "选择上级工号",
                                "readonly": true,
                                "style":{"width":"200px"},
                            },
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "blur": "function(node,_this){_this.formModel.fullName=node.fullName;}",  //blur 配置回调函数类型和函数函数体
                            "init": "function(_this,option){}"
                         },
              "rules": [    //表单验证规则配置
                        {
                            "required": true, 
                            "message": "上级工号不能为空",
                            "trigger": "change"
                        }
              ]
   },

```

####  控件配置说明

##### `inputNum`

input输入框配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "input", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "maxlength":10000,
                       "minlength":0,
                       "size":"small",//大小
                       "disabled":false, //是否可用
                       "type":"text", // text/textarea
                       "placeholder":"", //输入提示字符
                       "icon":"",  //图标
                       "rows":"",  //行数 textarea 有效 
                       "readonly":"", //是否可读
                       "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "blur": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为undefind在input控件中无用，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `inputText`

inputText配置和inputNumber输入配置相同

##### `switch`

switch开关配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "switch", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "width":120,   //switch 的宽度（像素）
                       "disabled":false,   //是否禁用
                       "onColor":"small",//switch 打开时的背景色
                       "offColor":false, //switch 关闭时的背景色
                       "onText":"text", // switch 打开时的文字
                       "offText":"", //switch 关闭时的文字
                       "offValue":"",  //switch 关闭时的值
                       "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //配置回调函数类型和函数函数体
                                                        //参数说明：node为为change事件之后的参数，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `inputNumber`

计数器配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "inputNumber", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "min":0,   //设置计数器允许的最小值
                       "max":100000, //设置计数器允许的最大值
                       "step":1,//计数器步长
                       "disabled":false, //是否禁用
                       "size":"small", //计数器尺寸
                       "controls":"true", //是否使用控制按钮
                       "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为改变以后的值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```
##### `datePicker`

日期控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "datePicker", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                       "type":"date",//显示类型  year/month/date/week/ datetime/datetimerange/daterange
                       "disabled":false, //是否禁用
                       "size":"small", //输入框尺寸
                       "placeholder":"", //占位内容
                       "format":"yyyy-MM-dd", //时间日期格式化
                       "align":"left", //对齐方式
                       "defaultValue":"", //可选，DatePicker打开时默认显示的时间
                       "editable":true, //文本框可输入
                       "clearable":true, //是否显示清除按钮
                       "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为格式化后的值，_this为模块表单的实例对象。
                     "init": "function(_this,option){}"
                    }
   }

```
##### `select`

select控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "select", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "clearable":false, //是否显示清除按钮
                        "style":{},  //样式
                        "data":[{"value":"","label":"","disabled":false}], //绑定数据
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  // 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象或值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `treeselect`

选择树配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "treeselect", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "defaultText":"", //是否有默认值  执针对逐步加载方式
                        "readonly":false, //选入框是否只读
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "autofocus":false, //是否聚焦
                        "nodeStateConf":[], //树渲染配置
                        "stepByOne":false, //是否逐步加载模式
                        "treedata":[], //绑定初始值
                        "loaddata":[], //二次加载数据， 只针对逐步加载时有效
                        "isexpand":true, //是否展开  只针对一次性加载时有效
                        "defaultProps":{},  //绑定的对象结构
                        "textOnly":false,  //文本模式
                        "filterTextVisibe":true, //是否显示筛选框
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `comsupplier`

comsupplier控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "comsupplier", //控件类型，在renderSelComs组件中是唯一的。
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "orgid":"small", //组织机构
                        "value":"", //默认值
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "method1": "function(node,_this){}", //清除当前对象事件
                    "change": "function(node,_this){}",  // 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象或值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```
##### `comLabour`

comLabour控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "comLabour", //控件类型，在renderSelComs组件中是唯一的。
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "orgid":"small", //组织机构
                        "value":"", //默认值
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "method1": "function(node,_this){}", //清除当前对象事件
                    "change": "function(node,_this){}",  // 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象或值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `contract`

contract控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "contract", //控件类型，在renderSelComs组件中是唯一的。
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "orgid":"small", //组织机构
                        "value":"", //默认值
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "method1": "function(node,_this){}", //清除当前对象事件
                    "change": "function(node,_this){}",  // 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象或值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `ghtree`

工号树配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "ghtree", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "defaultText":"", //是否有默认值  
                        "readonly":false, //选入框是否只读
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "autofocus":false, //是否聚焦
                        "nodeStateConf":[], //树渲染配置
                        "filterVisibe":true, //是否显示筛选框
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `organizeTree`

组织机构树配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "organizeTree", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "size":"small", //控件尺寸
                        "isexpand":"", //是否一次性展开  
                        "readonly":false, //选入框是否只读
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "autofocus":false, //是否聚焦
                        "nodeStateConf":[], //树渲染配置
                        "style":{},  //样式
                        "filterVisibe":true //是否显示筛选框
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `datadictionaryfortree`

字典树配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "datadictionaryfortree", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "code":"", //父级编码
                        "size":"small", //控件尺寸
                        "isexpand":"", //是否一次性展开  
                        "readonly":false, //选入框是否只读
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "autofocus":false, //是否聚焦
                        "nodeStateConf":[], //树渲染配置
                        "style":{},  //样式
                        "filterVisibe":true //是否显示筛选框
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中节点对象，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```

##### `datadictionaryforsel`

选择字典控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "datadictionaryforsel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "code":"", //父级编码
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                        "style":{},  //样式
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```


##### `datadictionaryforsel`

选择字典控件配置
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "datadictionaryforsel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "code":"", //父级编码
                        "size":"small", //控件尺寸
                        "disabled":false, //是否禁用
                        "placeholder":"", //占位字符
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //blur 配置回调函数类型和函数函数体
                                                       //参数说明：node为选中值，_this为模块表单的实例对象。
                    "init": "function(_this,option){}"
                    }
   }

```




##### `tablEedit`

明细编辑器配置说明

```json
  
  {
   
      "title": "明细编辑", //label标题
      "name": "items", //属性名称
      "type": "tablEedit", //类型
      "position": { //布局
        "spanNum": 24,  
        "alone": true //独占一行
      },
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "sumRowConf": {  //合计列配置
                              "disable": false, //是否启用合计列
                              "sumText": "合计",  //合计显示文本
                              "items": {  //合计列项
                                "planQuantity": {
                                  "text": "数量合计", //显示名称
                                  "sumval": 0,  //合计初始值
                                  "capitalCol": false  //是否显示大写（注意：合计列中只有一列能配置为大写）
                                },
                                "lossQuantity": {
                                  "text": "损耗量合计",
                                  "sumval": 0,
                                  "capitalCol": false
                                },
                                "responseSum": {
                                  "text": "金额合计",
                                  "sumval": 0,
                                  "capitalCol": true
                                }
                              },
                              "eventConf": {
                                  "isOn": true,
                                  "sum": "function(_this,option){option.items.lossQuantity=9999.999}"  //合计列计算逻辑
                                }
                            },
                        "tableEditConfig": { //表格配置 （表格配置和模块中表格配置基本相同）
                                  "table": {  //表格属性配置=》参照表格配置（注意不包含data配置）
                                    "attr": {
                                      "highlightCurrent": true,
                                      "style": {
                                        "width": "100%",
                                        "height": "300px"
                                      }
                                    }
                                  },
                                  "columns": [ //列属性配置=》参照表格配置
                                    {
                                      "attr": {
                                        "type": "index",
                                        "label": "序号",
                                        "width": 65,
                                        "align": "center"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "prop": "id",
                                        "label": "操作",
                                        "width": 65,
                                        "scopedSlot": "id"
                                      }
                                    }
                                  ],
                                  "solSlotConf": [ //具名配置=》参照表格配置
                                    {
                                      "type": "input",  
                                      "name": "planQuantity",
                                      "elmentConfig": {
                                        "type": "text",
                                        "size": "small",
                                        "disabled": false
                                      },
                                      "eventConf": {
                                        "isOn": true,
                                        "isSum":true, //是否blur事件之后触发合计列计算
                                        "init": "function(option,row){}",
                                        "blur":"function(node,option,row){}"
                                      }
                                    },
                                  ]
                         },
                        "tableEditMapConfig": //列映射配置  
                         {
                          "mapconf0":[   //具体映射配置  注意：映射名称起名规则：`mapconf`+该选材框类型。（一般在配置选材框中dataType中配置）
                              {
                                "prop": "id", //表中列属性
                                "isplace": false, //是否替换
                                "defaultval": "0", //默认值
                                "selprop": "" //选材框属性
                              },
                              {
                                "prop": "infoName",
                                "isplace": true,
                                "defaultval": "",
                                "selprop": "ghName",
                                "calculate":{  //如果有两列进行计算生成新列。 按照以下格式配置  如果不计算 不需要配置该节点
                                      "coll":"quantity", 
                                      "op":"-",  //运算符支持 "+-*/"
                                      "colr":"iD_Col24"
                                    }
                              },
                          ],
                          "mapconf1":[]  //多个映射配置
                         },
                    }
 
   }

```
---

### 表格行内控件渲染器

> 表格行内控件渲染器主要用于tableedit控件行内控件编辑。其配置和控件渲染器相应配置相同，表格行内控件渲染器包含以下控件：

1. `input` 控件  注意：input控件中如果配置的是列计算，一般由blur事件触发，如果需要触发合计列计算，同步事件配置 `"isSum":true`属性，异步事件在回调函数的异步方法          逻辑中调用`_this.$emit('sumCount');`即可；
2. `switch` 控件
3. `datePicker` 控件
4. `datadictionaryforsel` 控件
5. `datadictionaryfortree` 控件
6. `select` 控件
---
### 选择树控件渲染器

> 选择树控件渲染器只渲染筛选器中的筛选框控件。

```json

  {
            "name": "parentId", //绑定对象属性 
            "type": "ghtreewithpanel", //控件类型，在renderSelComs组件中是唯一的。
            "op": "EQ", //配置过滤条件
            "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                                "nodeStateConf": [],
                                "panelWidth": "200px",
                                "highlightCurrent":false,
                                "isexpand":false
                            },
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "change": "function(node,_this){_this.formModel.fullName=node.fullName;}",  //change 配置回调函数类型和函数函数体
                         }
   },

```

####  选择树控件配置说明

1. `ghtreewithpanel`

带panel的工号树
```json
  
  {
    "name": "", //绑定对象属性 
    "type": "ghtreewithpanel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "nodeStateConf": [], //树渲染配置 参照yl-ghtreewithpanel组件说明
                        "panelWidth": "200px", //panel宽度
                        "highlightCurrent":false, //是否高亮选中节点行
                        "expandOnClickNode":false, //是否开启选中后展开
                    },
    "eventconf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //change 配置回调函数类型和函数函数体
                                                         //参数说明： node为选中节点数据对象，_this为模块的示例对象。
                    }
   }

```
2. `standardghtreewithpanel`

带panel的标准工号库
```json

  {
    "name": "", //绑定对象属性 
    "type": "standardghtreewithpanel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                         "nodeStateConf": [], //树渲染配置 参照yl-standardghtreewithpanel组件说明
                        "panelWidth": "200px", //panel宽度
                        "highlightCurrent":false, //是否高亮选中节点行
                        "expandOnClickNode":false, //是否开启选中后展开
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //change 配置回调函数类型和函数函数体
                                                         //参数说明： node为选中节点数据对象，_this为模块的示例对象。
                    }
   }

```
3. `organizetreewithpanel`

带panel的组织机构树
```json

  {
    "name": "", //绑定对象属性 
    "type": "organizetreewithpanel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                         "nodeStateConf": [], //树渲染配置 参照yl-organizetreewithpanel组件说明
                        "panelWidth": "200px", //panel宽度
                        "highlightCurrent":false, //是否高亮选中节点行
                        "expandOnClickNode":false, //是否开启选中后展开
                        "isexpand":false, //是否展开所有节点
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //change 配置回调函数类型和函数函数体
                                                         //参数说明： node为选中节点数据对象，_this为模块的示例对象。
                    }
   }

```
4. `materialclasstreewithpanel`

带panel的组织机构树
```json

  {
    "name": "", //绑定对象属性 
    "type": "materialclasstreewithpanel", //控件类型，在renderSelComs组件中是唯一的。
    "op": "EQ", //配置过滤条件
    "elmentConfig": { //控件的配置 控件的配置根据特定控件的参数而定，配置参照元素配置 
                        "nodeStateConf": [], //树渲染配置 参照yl-materialclasstreewithpanel组件说明
                        "panelWidth": "200px", //panel宽度
                        "highlightCurrent":false, //是否高亮选中节点行
                        "expandOnClickNode":false, //是否开启选中后展开
                    },
    "eventConf": {   //控件回调函数配置
                    "isOn": true,  //是否开启回调函数
                    "change": "function(node,_this){}",  //change 配置回调函数类型和函数函数体
                                                         //参数说明： node为选中节点数据对象，_this为模块的示例对象。
                  }
   }

```
---

### 表列具名渲染器

> 列具名配置主要配置列渲染样式和交互事件

```json

"solSlotConf": [
      {  //文本渲染
        "type": "tag",  
        "name": "isLeaf",  //具名关联名称
        "elmentConfig": [  //标签配置数组
          {
            "type": "primary",  //主题
            "value": true,   //值
            "text": "是"   //显示文本
          },
          {
            "type": "danger",  
            "value": false,
            "text": "否"
          }
        ],
      },
      {  //按钮组渲染
        "type": "button",  
        "name": "buttonSlot",  //具名关联名称
        "elmentConfig": [  //元素配置数组
          {
           "name": "add",  //按钮名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "添加", //文本
            "disabled": false, //是否可用
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },   
          {
           "name": "edit",
            "icon": "icon-pencil",
            "type": "primary",
            "size": "small",
            "text": "修改",
            "disabled": true,
            "isShow": true,
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },    
        ],
      },
       {  //预览，打印，审批列渲染
        "type": "view",  
        "name": "viewSlot",  //具名关联名称
        "elmentConfig": [  
          { 
            "name":"viewItem", //快速预览
            "icon": "icon-eye3", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._viewItem(row.id);}",
                         }
          },   
          {
            "name":"approve", //审批
            "icon": "icon-sitemap", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._state(row.id);}",
                         }
          },   
          {
            "name":"print", //打印
            "icon": "icon-printer", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._printPage(row.id);}",
                         }
          },    
        ],
      },
    ]
```
####  表格列具名渲染器配置

1. 文本渲染

```json

    {  
        "type": "tag",  
        "name": "isLeaf",  //具名关联名称
            "elmentConfig": [  //标签配置数组
                {
                    "type": "primary",  //主题
                    "value": true,   //值
                    "text": "是"   //显示文本
                },
                {
                    "type": "danger",  
                    "value": false,
                    "text": "否"
                }
            ]
    }


```


2. 按钮组渲染

```json

      {  
        "type": "button",  
        "name": "buttonSlot",  //具名关联名称
        "elmentConfig": [  //元素配置数组
          {
           "name": "add",  //按钮名称
            "icon": "icon-plus", //图标
            "type": "primary", //主题
            "size": "small", //大小
            "text": "添加", //文本
            "disabled": false, //是否可用
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },   
          {
           "name": "edit",
            "icon": "icon-pencil",
            "type": "primary",
            "size": "small",
            "text": "修改",
            "disabled": true,
            "isShow": true,
            "eventConf": {   //控件回调函数配置
                            "ison": true,  //是否开启回调函数
                            "click": "function(row,name,_this){}",  //change 配置回调函数类型和函数函数体
                         }
          },    
        ],
      },


```
3. 预览，打印，审批列渲染

```json


 {  
        "type": "view",  
        "name": "viewSlot",  //具名关联名称
        "elmentConfig": [  
          { 
            "name":"viewItem", //快速预览
            "icon": "icon-eye3", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._viewItem(row.id);}",
                         }
          },   
          {
            "name":"approve", //审批
            "icon": "icon-sitemap", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._state(row.id);}",
                         }
          },   
          {
            "name":"print", //打印
            "icon": "icon-printer", //图标
            "isShow": true, //是否显示
            "eventConf": {   //控件回调函数配置
                            "isOn": true,  //是否开启回调函数
                            "click": "function(row,name,_this){_this._printPage(row.id);}",
                         }
          },    
        ],
      },
```
4. 文本格式化

```json
{  //处理日期格式示例
        "type": "format",  //类型名称
        "name": "beginDateSlot", //具名关联名称
        "eventConf": {
          "isOn": true, 
          "format": "function(row,option,_this){console.log(row);return _this.globalFunObject.formatDate(row.beginDate,'YYYY-MM-DD');}" //返回值通过函数返回
        }
      },
       { //处理单元内文本示例
        "type": "format",
        "name": "ghNameSlot",
        "eventConf": {
          "isOn": true,
          "format": "function(row,option,_this){return row.attName+row.ghName}"
        }
      },
```
---

### treeSelect

> ###### 引用方式  

**全局引入** ``` <yl-roleTree ></yl-roleTree>```

#### 用法示例


```html
    <yl-treeselect 
        v-model="value" 
        :treedata="treedata" 
        :defaultProps="defaultProps" 
        @getCurrentNode="_getCurrentNode">
    </yl-treeselect>
```

```javascript
   export default {
    data() {
      return {
        value:''
        treedata: [],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
                    console.log(selectNode)
            },
    //一次加载树
    _getdata(){
        requestGetMenuItemTreeList().then(data => {
                if(data.success){
                    //如果data.result是平行结构数据 
                    //需要调用util.returnDatabyTree()递归处理
                    this.treedata=util.returnDatabyTree(data.result,'');
                    
                }
            })
    },
    },
     mounted(){
        //初始化树控件
        this._getdata();
    },
   }
```

###### 逐级加载方式


```html
    <yl-treeselect 
    v-model="value" 
    :treedata="treedata" 
    :loaddata="loaddata" 
    :StepByOne="StepByOne" 
    :defaultProps="defaultProps" 
    :textOnly="textOnly"
    :defaultText="defaultText"
    @getCurrentNode="_getCurrentNode" 
    @nodeExpend="_nodeExpend"
    >
    </yl-treeselect>
```

```javascript
   export default {
    data() {
      return {
        id:''
        treedata:[],
        loaddata:[],
        defaultProps: {
              children: 'children',
              label: 'text',
              id: 'id'
          },
        StepByOne:true,
        textOnly:false,
      }
     },
    methods:{
        //此方法获取点击当前点击node的data对象
    _getCurrentNode(selectNode){
              console.log(selectNode)
            },
    _nodeExpend(result){
        _getdata(val){
    },
    //加载树
    _getdata(val){
        requestGetMenuItemTreeList(val).then(data => {
                if(data.success){
                       //如果不是根节点
                        if(val!=this.guidOfNull()){
                           this.loaddata=data.result;
                        }else{
                            this.treedata=data.result;
                         }  
                 }  
            })
     },
    },
     mounted(){
        //初始化树控件
         let params=this.guidOfNull();
        this._getdata(params);
    },
   }
```

#### 属性

| 参数        | 说明           |类型   |默认值|
| ------------- |:-------------:| -----:|---:|
| treedata      | 绑定树的数据集合，（在逐步加载时为根节点数据集合） | Array|[ ] |
| loaddata      | 在逐步加载的集合中使用，每次加载逐步加载时将获取值传至该对象 |  Array|[ ] |
| isexpand      | 是否一次性展开（只针对一次性加载方式使用） | Boolean |false |
| defaultProps      | 该属性为element tree控件集成属性 | obj |{} |
| textOnly      | 只使用文本值时使用 | Boolean |false |
| stepByOne      | 是否为逐步加载模式 | Boolean |false |
| defaultText      | 默认文本值（只针对逐步加载模式适用） | String |'' |
| size      |控件样式大小（nomarl/small） | String |'nomarl' |	
| placeholder |输入提示文本 | String |'' |	

#### 方法

暂无
#### 事件



| 名称        | 说明           |回调参数|
| ------------- |:-------------:| -----:|
| getCurrentNode      | 节点点击时触发 |为当前选中节点的data对象|
| nodeExpend      | 节点展开时触发，（只在stepByOne为true时有效） | 为当前选中节点的node对象 |





##  工具类


