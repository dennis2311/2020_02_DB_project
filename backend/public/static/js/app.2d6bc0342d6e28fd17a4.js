webpackJsonp([1],{"2TdD":function(e,t){},"BW/e":function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("img",{attrs:{src:s("Yz7+")}}),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var a=s("VU/8")({name:"App"},r,!1,function(e){s("QWpZ")},null,null).exports,i=s("/ocq"),o={name:"LoginPage",data:function(){return{user:{userid:"",password:""}}},methods:{login:function(e){var t=this;e.preventDefault(),this.$http.post("/api",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push("/"+e.data.role)}).catch(function(e){alert(e)})}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",[e._v("Please login for service")]),e._v(" "),s("form",{on:{submit:e.login}},[s("div",{staticClass:"input_row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.userid,expression:"user.userid"}],attrs:{type:"text",id:"id",placeholder:"id"},domProps:{value:e.user.userid},on:{input:function(t){t.target.composing||e.$set(e.user,"userid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),s("button",[e._v("LOGIN")])]),e._v(" "),s("h4",[e._v("or")]),e._v(" "),s("router-link",{attrs:{to:"/createaccount"}},[e._v("create new account")]),e._v(" |\n    "),s("router-link",{attrs:{to:"/findaccount"}},[e._v("forgot ID/password?")])],1)},staticRenderFns:[]};var c=s("VU/8")(o,u,!1,function(e){s("2TdD")},"data-v-766142a6",null).exports,d={data:function(){return{user:{userid:"",name:"",password:""}}},methods:{signUp:function(e){var t=this;e.preventDefault(),this.$http.post("/api/createAccount",{user:this.user}).then(function(e){1==e.data.success&&(alert(e.data.message),t.$router.push({name:"LoginPage"})),0==e.data.success&&alert(e.data.message)}).catch(function(e){alert(e)})}}},p={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h1",[e._v("Create new Account")]),e._v(" "),s("form",{on:{submit:e.signUp}},[s("div",{staticClass:"input_row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.userid,expression:"user.userid"}],attrs:{type:"text",id:"id",placeholder:"id"},domProps:{value:e.user.userid},on:{input:function(t){t.target.composing||e.$set(e.user,"userid",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{type:"text",id:"name",placeholder:"name"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input_row"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),s("button",[e._v("SIGNUP")])])])},staticRenderFns:[]},l=s("VU/8")(d,p,!1,null,null,null).exports,v={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Find ID / Find password")]),this._v(" "),t("h3",[this._v(this._s(this.msg))])])},staticRenderFns:[]},m=s("VU/8")({created:function(){var e=this;this.$http.get("/api/findaccount").then(function(t){e.msg=t.data})}},v,!1,null,null,null).exports,h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Administrator Page")]),this._v(" "),t("button",{on:{click:this.goMain}},[this._v("goMain")]),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var _=s("VU/8")({name:"AdminPage",methods:{goMain:function(e){e.preventDefault(),this.$router.push("/")}}},h,!1,function(e){s("QpVx")},"data-v-4cf7815d",null).exports,f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Assessor Page")]),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var g=s("VU/8")({name:"AssessorPage"},f,!1,function(e){s("BW/e")},"data-v-14442c8e",null).exports,w={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Submittee Page")]),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var P=s("VU/8")({name:"SubmitteePage"},w,!1,function(e){s("ZLVx")},"data-v-5c8d37ba",null).exports,$={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"users"},[s("h1",[e._v("Users")]),e._v(" "),s("ul",e._l(e.users,function(t){return s("li",{key:t},[e._v("\n          "+e._s(t.username)+"\n          "),s("img",{attrs:{src:t.profile}}),e._v(" "),s("router-link",{attrs:{to:{name:"UserDetailPage",params:{id:t.id}}}},[e._v("about this user..")])],1)}),0)])},staticRenderFns:[]},x=s("VU/8")({created:function(){var e=this;this.$http.get("/api/users").then(function(t){e.users=t.data})},data:function(){return{users:[]}}},$,!1,null,null,null).exports,U={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user_detail"},[s("h1",[e._v("User Detail")]),e._v(" "),s("p",[s("span",[e._v("USERNAME : "+e._s(e.user.username))]),e._v(" "),s("span",[e._v("ROLE : "+e._s(e.user.role))]),e._v(" "),s("img",{attrs:{src:e.user.profile}})])])},staticRenderFns:[]},b=s("VU/8")({created:function(){var e=this,t=this.$route.params.id;this.$http.get("/api/users/"+t).then(function(t){e.user=t.data})},data:function(){return{user:{}}}},U,!1,null,null,null).exports,A={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Test Page for GET method")]),this._v(" "),t("h3",[this._v(this._s(this.msg))])])},staticRenderFns:[]},E=s("VU/8")({created:function(){var e=this;this.$http.get("/api/showUsers").then(function(t){e.msg=t.msg})}},A,!1,null,null,null).exports;n.a.use(i.a);var V=new i.a({mode:"history",routes:[{path:"/",name:"LoginPage",component:c},{path:"/createaccount",name:"CreateAccountPage",component:l},{path:"/findaccount",name:"FindAccountPage",component:m},{path:"/admin",name:"AdminPage",component:_},{path:"/assessor",name:"AssessorPage",component:g},{path:"/submittee",name:"SubmitteePage",component:P},{path:"/users",name:"UserIndexPage",component:x},{path:"/users/:id",name:"UserDetailPage",component:b},{path:"/showUsers",name:"ShowUsersPage",component:E}]}),F=s("mtWM"),R=s.n(F);n.a.prototype.$http=R.a,n.a.config.productionTip=!1,new n.a({el:"#app",router:V,components:{App:a},template:"<App/>"})},QWpZ:function(e,t){},QpVx:function(e,t){},"Yz7+":function(e,t,s){e.exports=s.p+"static/img/banner.bf8c9b2.png"},ZLVx:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.2d6bc0342d6e28fd17a4.js.map