import Vue from 'vue';
import Router from 'vue-router';

//业务组件
const Login = resolve => require(['./pages/Login.vue'], resolve);
const Main = resolve => require(['./pages/Main.vue'], resolve);
const Home = resolve => require(['./pages/Home.vue'], resolve);
const Page404 = resolve => require(['./pages/Page404.vue'], resolve);
// const ComDemo = resolve => require(['./pages/ComDemo.vue'], resolve);
// const jsObjTurn = resolve => require(['./pages/jsObjTurn.vue'], resolve);
// const MenuItem = resolve => require(['./pages/operation/systeminfo/menuitem/MenuItem.vue'], resolve);
// const MenuApp = resolve => require(['./pages/operation/systeminfo/menuapp/MenuApp.vue'], resolve);
// const Functions = resolve => require(['./pages/operation/systeminfo/function/Function.vue'], resolve);
// const RoleApproveState = resolve => require(['./pages/operation/systeminfo/roleapprovestate/RoleApproveState.vue'], resolve);
// const InformationPublish = resolve => require(['./pages/operation/systeminfo/informationpublish/InformationPublish.vue'], resolve);
// const DataDictionaryDetail = resolve => require(['./pages/operation/systeminfo/datadictionary/DataDictionaryDetail.vue'], resolve);
// const ProvinceCity = resolve => require(['./pages/operation/systeminfo/provincecity/ProvinceCity.vue'], resolve);
// const Role = resolve => require(['./pages/operation/systeminfo/role/Role.vue'], resolve);
 const AuditConfig = resolve => require(['./pages/operation/systeminfo/auditconfig/AuditConfig.vue'], resolve);
// const Parameters = resolve => require(['./pages/operation/basic/parameters/Parameters.vue'], resolve);
// const Organize = resolve => require(['./pages/operation/basic/organize/Organize.vue'], resolve);
// const User = resolve => require(['./pages/operation/basic/user/User.vue'], resolve);
// const ApiTest = resolve => require(['./pages/ApiTest.vue'], resolve);
// const AttachMent = resolve => require(['./pages/operation/basic/attachment/AttachMent.vue'], resolve);
// const StandardGH = resolve => require(['./pages/operation/basic/standardgh/StandardGH.vue'], resolve);
// const TemplateGH = resolve => require(['./pages/operation/basic/templategh/TemplateGH.vue'], resolve);
// const GH = resolve => require(['./pages/operation/basic/gh/GH.vue'], resolve);
// const MaterialClass = resolve => require(['./pages/operation/basic/materialclass/MaterialClass.vue'], resolve);
// const Material = resolve => require(['./pages/operation/basic/material/Material.vue'], resolve);
 const CommonMaterial = resolve => require(['./pages/operation/basic/commonmaterial/CommonMaterial.vue'], resolve);
// const Supplier = resolve => require(['./pages/operation/basic/supplier/Supplier.vue'], resolve);
// const Labour = resolve => require(['./pages/operation/basic/labour/Labour.vue'], resolve);
// const CommonLabour = resolve => require(['./pages/operation/basic/commonlabour/CommonLabour.vue'], resolve);
// const CommonSupplier = resolve => require(['./pages/operation/basic/commonsupplier/CommonSupplier.vue'], resolve);
// const Project = resolve => require(['./pages/operation/basic/project/Project.vue'], resolve);
 const CodeRule = resolve => require(['./pages/operation/systeminfo/coderule/CodeRule.vue'], resolve);
 const ModuleConf = resolve => require(['./pages/operation/systeminfo/moduleconf/ModuleConf.vue'], resolve);
 const SelectModuleConf = resolve => require(['./pages/operation/systeminfo/selectmoduleconf/SelectModuleConf.vue'], resolve);
 const GlobConfig = resolve => require(['./pages/operation/systeminfo/globconfig/GlobConfig.vue'], resolve);
 const CommonDataDictionary = resolve => require(['./pages/operation/basic/commondatadictionary/CommonDataDictionary.vue'], resolve);
 const ModuleColConfig = resolve => require(['./pages/operation/systeminfo/modulecolconfig/ModuleColConfig.vue'], resolve);
 const ReportConf = resolve => require(['./pages/operation/systeminfo/reportconf/reportConf.vue'], resolve);
 const MainPage = resolve => require(['./pages/weight/MainPage.vue'], resolve);
 const SqlState = resolve => require(['./pages/operation/systeminfo/sqlstatementconf/SqlState.vue'], resolve);
const supperModule = resolve => require(['./pages/config/dynamicmodule/SupperModule.vue'], resolve);
const supperReport = resolve => require(['./pages/config/dynamicreport/supperReport.vue'], resolve);

Vue.use(Router);
export default new Router({
routes:[
   {path: '/Login', component: Login },
   {
    path: '/',
    component: Main,
    redirect: '/home',
    name: '',
    children: [
      { path: 'home', component: Home, name: '首页'  },
    ]
  },
  {
    path: '/pages',
    component: Main,
    name: '系统管理',
    children: [
          // { path: 'comdemo', component: ComDemo, name: '测试页面' },
          // { path: 'apitest', component: ApiTest,name: 'api测试页面'  },
          // { path: 'jsobjturn', component: jsObjTurn,name: 'js转化json'  },
          // { path: 'menuItem', component: MenuItem, name: '菜单管理' },
          // { path: 'menuApp', component: MenuApp, name: '应用系统' },
          // { path: 'function', component: Functions, name: '功能管理' },
          // { path: 'role', component: Role, name: '角色管理' },
          // { path: 'roleapprovestate', component: RoleApproveState, name: '审批管理' },
           { path: 'modulecolconfig', component: ModuleColConfig, name: '模块表对应信息' },
           { path: 'reportconf', component: ReportConf, name: '报表配置' },
          // { path: 'datadictionarydetail', component: DataDictionaryDetail, name: '数据字典' },
          // { path: 'infoPublish', component: InformationPublish, name: '系统文档管理' },
          // { path: 'parameters', component: Parameters, name: '组织属性' },
          // { path: 'organize', component: Organize, name: '组织机构管理' },
          // { path: 'provinceCity', component: ProvinceCity, name: '省市管理' },
          // { path: 'user', component: User, name: '用户管理' },     
          // { path: 'attachment', component: AttachMent, name: '文件上传' },
          // { path: 'standardgh', component: StandardGH, name: '工号标准库' },
          // { path: 'templategh', component: TemplateGH, name: '工号模板' },
          // { path: 'gh', component: GH, name: '工号管理' },
          // { path: 'materialclass', component: MaterialClass, name: '材料类别' },
          // { path: 'material', component: Material, name: '材料信息' },
          { path: 'commonmaterial', component: CommonMaterial, name: '常用材料' },
          // { path: 'supplier', component: Supplier, name: '供应商管理' },
          // { path: 'labour', component: Labour, name: '用料单位管理' },
          // { path: 'commonlabour', component: CommonLabour, name: '常用用料单位' },
          // { path: 'commonsupplier', component: CommonSupplier, name: '常用供应商' },
          // { path: 'project', component: Project, name: '项目信息维护' },
          { path: 'coderule', component: CodeRule, name: '编码管理' },
          // { path: 'commondatadictionary', component: CommonDataDictionary, name: '单位字典库' },
           { path: 'globconfig', component: GlobConfig, name: '全局配置' },
           { path: 'moduleconf', component: ModuleConf, name: '模块配置' },
          { path: 'auditconfig', component: AuditConfig, name: '模块审批配置' },
           { path: 'sqlstate', component: SqlState, name: 'SQL语句配置' },
           { path: 'selectmoduleconf', component: SelectModuleConf, name: '数据选择框' },
          { path: 'suppermodule/:tableName', component: supperModule, name: '容器'},
          { path: 'supperreport/:tableName', component: supperReport, name: '报表容器'},
          {path: '*',component: Page404} 
    ]
  },
   {
    path: '/materials',
    component: Main,
    name: '物资管理',
    children: [
          { path: 'suppermodule/:tableName', component: supperModule, name: '容器2'},
          { path: 'supperreport/:tableName', component: supperReport, name: '报表容器2'},
          {path: '*',component: Page404} 
    ] 
  },
  {
    path: '/weight',
    component: Main,
    name: '过磅影像系统',
    children: [
          { path: 'mainPage', component: MainPage, name: '过磅主界面'},
          { path: 'suppermodule/:tableName', component: supperModule, name: '容器3'},
          { path: 'supperreport/:tableName', component: supperReport, name: '报表容器3'},
          {path: '*',component: Page404} 
    ] 
  },
  {
    path: '/quality',
    component: Main,
    name: '质量追溯系统',
    children: [
          { path: 'suppermodule/:tableName', component: supperModule, name: '容器4'},
          { path: 'supperreport/:tableName', component: supperReport, name: '报表容器4'},
          {path: '*',component: Page404} 
    ] 
  },
      {path: '*',component: Page404} 
  ]
});


