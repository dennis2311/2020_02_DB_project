webpackJsonp([1],{"3ufV":function(e,t){},L2cL:function(e,t){},"Mxe/":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("7+uW"),r=a("NYxO"),n={name:"App",methods:{logOut:function(e){e.preventDefault(),this.$store.commit("logOut"),alert("성공적으로 로그아웃 되었습니다. 메인화면으로 돌아갑니다."),this.$router.push("/")}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("img",{attrs:{src:a("Yz7+")}}),e._v(" "),this.$store.state.loggedIn?s("div",["ADM"===this.$store.state.role?s("h1",[e._v("관리자 페이지")]):"ASE"===this.$store.state.role?s("h1",[e._v("평가자 페이지")]):s("h1",[e._v("제출자 페이지")]),e._v(" "),s("div",[s("button",{on:{click:e.logOut}},[e._v("로그아웃")]),e._v(" |\n      "),s("router-link",{attrs:{to:"/changepassword"}},[e._v("정보 수정")]),e._v(" "),"ADM"!==this.$store.state.role?s("router-link",{attrs:{to:"/signout"}},[e._v(" | 회원 탈퇴")]):e._e()],1)]):e._e(),e._v(" "),s("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")(n,o,!1,function(e){a("c29r")},null,null).exports,c=a("Gu7T"),u=a.n(c),d=a("/ocq"),l={name:"LoginPage",created:function(){this.$store.commit("logOut")},data:function(){return{user:{id:"",password:""}}},methods:{login:function(e){var t=this;e.preventDefault(),this.$http.post("/api",{user:this.user}).then(function(e){var a;alert(e.data.message),e.data.success&&(t.$store.commit("logIn",e.data),t.$router.push("/"+("ADM"===(a=e.data.role)?"admin":"ASE"===a?"assessor":"SUB"===a?"submittee":void 0)))}).catch(function(e){alert(e)})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("서비스 이용을 위하여 로그인 해주세요")]),e._v(" "),a("form",{on:{submit:e.login}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{type:"text",id:"id",placeholder:"아이디"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"비밀번호"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),a("button",[e._v("로그인")])]),e._v(" "),a("h4",[e._v("또는")]),e._v(" "),a("router-link",{attrs:{to:"/createaccount"}},[e._v("새 계정 만들기")])],1)},staticRenderFns:[]};var m={data:function(){return{user:{id:"",password:"",password_confirm:"",name:"",birthdate:"",gender:"",address:"",phone:"",role:""}}},methods:{signUp:function(e){var t=this;e.preventDefault(),this.$http.post("/api/createaccount",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"LoginPage"})}).catch(function(e){alert(e)})}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("계정 생성")]),e._v(" "),a("form",{on:{submit:e.signUp}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{type:"text",id:"id",placeholder:"아이디"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"비밀번호"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password_confirm,expression:"user.password_confirm"}],attrs:{type:"password",id:"password_confirm",placeholder:"비밀번호 확인"},domProps:{value:e.user.password_confirm},on:{input:function(t){t.target.composing||e.$set(e.user,"password_confirm",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{type:"text",id:"name",placeholder:"이름"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{type:"radio",id:"submittee",value:"SUB"},domProps:{checked:e._q(e.user.role,"SUB")},on:{change:function(t){return e.$set(e.user,"role","SUB")}}}),e._v(" "),a("label",{attrs:{for:"제출자"}},[e._v("제출자")]),e._v(" "),a("br"),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{type:"radio",id:"assessor",value:"ASE"},domProps:{checked:e._q(e.user.role,"ASE")},on:{change:function(t){return e.$set(e.user,"role","ASE")}}}),e._v(" "),a("label",{attrs:{for:"평가자"}},[e._v("평가자")]),e._v(" "),a("br")]),e._v(" "),a("button",[e._v("가입하기")])])])},staticRenderFns:[]},_={data:function(){return{user:{current_password:"",new_password:"",new_password_confirm:""}}},methods:{signUp:function(e){var t=this;e.preventDefault(),this.$http.post("/api/changepassword",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"LoginPage"})}).catch(function(e){alert(e)})}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("비밀번호 변경")]),e._v(" "),a("form",{on:{submit:e.changePassword}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.current_password,expression:"user.current_password"}],attrs:{type:"text",id:"id",placeholder:"현재 비밀번호"},domProps:{value:e.user.current_password},on:{input:function(t){t.target.composing||e.$set(e.user,"current_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password,expression:"user.new_password"}],attrs:{type:"password",id:"password",placeholder:"새 비밀번호"},domProps:{value:e.user.new_password},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password_confirm,expression:"user.new_password_confirm"}],attrs:{type:"password",id:"password_confirm",placeholder:"새 비밀번호 확인"},domProps:{value:e.user.new_password_confirm},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password_confirm",t.target.value)}}})]),e._v(" "),a("button",[e._v("변경")])])])},staticRenderFns:[]},f=[{path:"/",name:"LoginPage",component:a("VU/8")(l,p,!1,function(e){a("wH4F")},"data-v-19124ec4",null).exports},{path:"/createaccount",name:"CreateAccountPage",component:a("VU/8")(m,v,!1,null,null,null).exports},{path:"/changepassword",name:"ChangePassword",component:a("VU/8")(_,h,!1,null,null,null).exports}],g={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"AdminPage"},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("router-link",{attrs:{to:"/admin/taskcreate"}},[e._v("태스크 생성")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/taskmanage"}},[e._v("태스크 관리")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/taskstatistics"}},[e._v("태스크 통계")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/membermanage"}},[e._v("회원 관리 및 통계")]),e._v(" "),a("router-view")],1)},staticRenderFns:[]};var k={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"TaskCreate"},$={render:function(){var e=this.$createElement;return(this._self._c||e)("h5",[this._v("태스크 생성")])},staticRenderFns:[]},b={created:function(){var e=this;"ADM"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.post("/api/admin/taskmanage",{accept:this.accept_task}).then(function(t){t.data.success?(e.all_tasks=t.data.all_tasks,e.tasks_YSUB=t.data.tasks_YSUB):alert(t.data.message)})},data:function(){return{all_tasks:[],tasks_YSUB:[],accept_task:[],reject_task:[]}},methods:{submit_accept:function(){var e=this;alert(this.accept_task),this.$http.post("/api/admin/taskmanage",{accept:this.accept_task}).then(function(t){alert("제출되었습니다"),t.data.success?(e.all_tasks=t.data.all_tasks,e.tasks_YSUB=t.data.tasks_YSUB):alert(t.data.message)})}},name:"TaskManage"},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h5",[e._v("태스크 관리")]),e._v(" "),e._l(e.all_tasks,function(t){return a("div",{key:t},[a("h3",[e._v("Task: "+e._s(t[0]))])])}),e._v(" "),a("h2",[e._v("다음의 승인 요청이 들어왔습니다.")]),e._v(" "),e._l(e.tasks_YSUB,function(t,s){return a("div",{key:t,attrs:{index:s}},[a("h4",[e._v(e._s(s+1)+"번째 요청) 태스크: "+e._s(t[0])+", 제출자: "+e._s(t[1])+",  평가 점수: "+e._s(t[2])+"\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.accept_task,expression:"accept_task"}],attrs:{type:"checkbox",name:s,id:s},domProps:{value:t,checked:Array.isArray(e.accept_task)?e._i(e.accept_task,t)>-1:e.accept_task},on:{change:function(a){var s=e.accept_task,r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=t,i=e._i(s,o);r.checked?i<0&&(e.accept_task=s.concat([o])):i>-1&&(e.accept_task=s.slice(0,i).concat(s.slice(i+1)))}else e.accept_task=n}}}),e._v("승인\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.reject_task,expression:"reject_task"}],attrs:{type:"checkbox",name:s,id:s},domProps:{value:t,checked:Array.isArray(e.reject_task)?e._i(e.reject_task,t)>-1:e.reject_task},on:{change:function(a){var s=e.reject_task,r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=t,i=e._i(s,o);r.checked?i<0&&(e.reject_task=s.concat([o])):i>-1&&(e.reject_task=s.slice(0,i).concat(s.slice(i+1)))}else e.reject_task=n}}}),e._v("거절\n        ")])])}),e._v(" "),a("span",[e._v(e._s(e.accept_task))]),e._v(" "),a("button",{on:{click:e.submit_accept}},[e._v("제출")])],2)},staticRenderFns:[]},A={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"TaskStatistics"},y={render:function(){var e=this.$createElement;return(this._self._c||e)("h5",[this._v("태스크 통계")])},staticRenderFns:[]},P={created:function(){var e=this;"ADM"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.get("/api/admin/membermanage").then(function(t){e.users=t.data})},data:function(){return{users:[]}},methods:{login:function(e){var t=this;e.preventDefault(),this.$http.post("/api",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&(t.$store.commit("logIn",e.data),t.$router.push("/"+role(e.data.role)))}).catch(function(e){alert(e)})}}},M={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h2",[e._v("가입 유저 목록입니다. 클릭 시 상세 보기로 넘어갑니다.")]),e._v(" "),e._l(e.users,function(t){return a("div",{key:t},[a("router-link",{attrs:{to:{name:"MemberManage_Each",params:{id:t.ID}}}},[e._v(e._s(t.ID)+" ("+e._s(t.ROLE)+")")])],1)})],2)},staticRenderFns:[]};var U={name:"MemberManage_Each",created:function(){if("ADM"!==this.$store.state.role)alert("권한이 없습니다"),this.$router.go(-1);else{var e=this.$route.params.id;this.$http.get("/api/admin/membermanage/"+e).then(function(e){})}},data:function(){return{user:user}}},E={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n    MemberManage_Each\n")])},staticRenderFns:[]};var S=[{path:"/admin",name:"AdminPage",component:a("VU/8")(g,w,!1,function(e){a("L2cL")},"data-v-3ab92df0",null).exports},{path:"/admin/taskcreate",name:"TaskCreate",component:a("VU/8")(k,$,!1,null,null,null).exports},{path:"/admin/taskmanage",name:"TaskManage",component:a("VU/8")(b,x,!1,null,null,null).exports},{path:"/admin/taskstatistics",name:"TaskStatistics",component:a("VU/8")(A,y,!1,null,null,null).exports},{path:"/admin/membermanage",name:"MemberManage",component:a("VU/8")(P,M,!1,function(e){a("3ufV")},"data-v-bf993486",null).exports},{path:"/admin/membermanage/:id",name:"MemberManage_Each",component:a("VU/8")(U,E,!1,function(e){a("hui4")},"data-v-0988ed7d",null).exports}],D={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("router-view")],1)},staticRenderFns:[]};var N=[{path:"/assessor",name:"AssessorPage",component:a("VU/8")({name:"AssessorPage"},D,!1,function(e){a("pm2e")},"data-v-56d46c76",null).exports}],C={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("router-view")],1)},staticRenderFns:[]};var F=[{path:"/submittee",name:"SubmitteePage",component:a("VU/8")({name:"SubmitteePage"},C,!1,function(e){a("Mxe/")},"data-v-d88685c0",null).exports}];s.a.use(d.a);var V=new d.a({mode:"history",routes:[].concat(u()(f),u()(S),u()(N),u()(F))}),j=a("mtWM"),R=a.n(j),B=a("424j");a("MU8w");s.a.use(r.a),s.a.prototype.$http=R.a,s.a.config.productionTip=!1;var I=new r.a.Store({plugins:[Object(B.a)()],state:{loggedIn:!1,id:"",role:""},mutations:{logIn:function(e,t){e.loggedIn=!0,e.id=t.id,e.role=t.role},logOut:function(e){e.loggedIn=!1,e.id="",e.role=""}}});new s.a({el:"#app",store:I,router:V,components:{App:i},template:"<App/>"})},"Yz7+":function(e,t,a){e.exports=a.p+"static/img/banner.bf8c9b2.png"},c29r:function(e,t){},hui4:function(e,t){},pm2e:function(e,t){},wH4F:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.5826f8b9ef1317ff9254.js.map