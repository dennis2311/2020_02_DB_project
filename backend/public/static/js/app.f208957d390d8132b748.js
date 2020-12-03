webpackJsonp([1],{"1WoE":function(e,t){},L2cL:function(e,t){},"Mxe/":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("7+uW"),r=a("NYxO"),n={name:"App",methods:{logOut:function(e){e.preventDefault(),this.$store.commit("logOut"),alert("성공적으로 로그아웃 되었습니다. 메인화면으로 돌아갑니다."),this.$router.push("/")}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("img",{attrs:{src:a("Yz7+")}}),e._v(" "),this.$store.state.loggedIn?s("div",[s("button",{on:{click:e.logOut}},[e._v("로그아웃")]),e._v(" |\n    "),s("router-link",{attrs:{to:"/changepassword"}},[e._v("비밀번호 변경")]),e._v(" |\n    "),s("router-link",{attrs:{to:"/changeaccountinfo"}},[e._v("회원정보 수정")]),e._v(" |\n    "),"ADM"!==this.$store.state.role?s("router-link",{attrs:{to:"/signout"}},[e._v("회원 탈퇴")]):e._e()],1):e._e(),e._v(" "),s("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")(n,o,!1,function(e){a("1WoE")},null,null).exports,u=a("Gu7T"),c=a.n(u),d=a("/ocq"),l={name:"LoginPage",created:function(){this.$store.commit("logOut")},data:function(){return{user:{id:"",password:""}}},methods:{login:function(e){var t=this;e.preventDefault(),this.$http.post("/api",{user:this.user}).then(function(e){var a;alert(e.data.message),e.data.success&&(t.$store.commit("logIn",e.data),t.$router.push("/"+("ADM"===(a=e.data.role)?"admin":"ASE"===a?"assessor":"SUB"===a?"submittee":void 0)))}).catch(function(e){alert(e)})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("서비스 이용을 위하여 로그인 해주세요")]),e._v(" "),a("form",{on:{submit:e.login}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{type:"text",id:"id",placeholder:"아이디"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"비밀번호"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),a("button",[e._v("로그인")])]),e._v(" "),a("h4",[e._v("또는")]),e._v(" "),a("router-link",{attrs:{to:"/createaccount"}},[e._v("새 계정 만들기")])],1)},staticRenderFns:[]};var m={data:function(){return{user:{id:"",password:"",password_confirm:"",name:"",birthdate:"",gender:"",address:"",phone:"",role:""}}},methods:{signUp:function(e){var t=this;e.preventDefault(),this.$http.post("/api/createaccount",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"LoginPage"})}).catch(function(e){alert(e)})}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("계정 생성")]),e._v(" "),a("form",{on:{submit:e.signUp}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.id,expression:"user.id"}],attrs:{type:"text",id:"id",placeholder:"아이디"},domProps:{value:e.user.id},on:{input:function(t){t.target.composing||e.$set(e.user,"id",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],attrs:{type:"password",id:"password",placeholder:"비밀번호"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password_confirm,expression:"user.password_confirm"}],attrs:{type:"password",id:"password_confirm",placeholder:"비밀번호 확인"},domProps:{value:e.user.password_confirm},on:{input:function(t){t.target.composing||e.$set(e.user,"password_confirm",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],attrs:{type:"text",id:"name",placeholder:"이름"},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.birthdate,expression:"user.birthdate"}],attrs:{type:"date",id:"birthdate",placeholder:"생년월일"},domProps:{value:e.user.birthdate},on:{input:function(t){t.target.composing||e.$set(e.user,"birthdate",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.gender,expression:"user.gender"}],attrs:{type:"radio",id:"female",value:"F"},domProps:{checked:e._q(e.user.gender,"F")},on:{change:function(t){return e.$set(e.user,"gender","F")}}}),e._v(" "),a("label",{attrs:{for:"Female"}},[e._v("Female")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.gender,expression:"user.gender"}],attrs:{type:"radio",id:"male",value:"M"},domProps:{checked:e._q(e.user.gender,"M")},on:{change:function(t){return e.$set(e.user,"gender","M")}}}),e._v(" "),a("label",{attrs:{for:"Male"}},[e._v("Male")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.gender,expression:"user.gender"}],attrs:{type:"radio",id:"other",value:"O"},domProps:{checked:e._q(e.user.gender,"O")},on:{change:function(t){return e.$set(e.user,"gender","O")}}}),e._v(" "),a("label",{attrs:{for:"Other"}},[e._v("Other")]),e._v(" "),a("br")]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.address,expression:"user.address"}],attrs:{type:"text",id:"address",placeholder:"주소"},domProps:{value:e.user.address},on:{input:function(t){t.target.composing||e.$set(e.user,"address",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.phone,expression:"user.phone"}],attrs:{type:"text",id:"phone",placeholder:"휴대전화"},domProps:{value:e.user.phone},on:{input:function(t){t.target.composing||e.$set(e.user,"phone",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{type:"radio",id:"submittee",value:"SUB"},domProps:{checked:e._q(e.user.role,"SUB")},on:{change:function(t){return e.$set(e.user,"role","SUB")}}}),e._v(" "),a("label",{attrs:{for:"제출자"}},[e._v("제출자")]),e._v(" "),a("br"),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],attrs:{type:"radio",id:"assessor",value:"ASE"},domProps:{checked:e._q(e.user.role,"ASE")},on:{change:function(t){return e.$set(e.user,"role","ASE")}}}),e._v(" "),a("label",{attrs:{for:"평가자"}},[e._v("평가자")]),e._v(" "),a("br")]),e._v(" "),a("button",[e._v("가입하기")])])])},staticRenderFns:[]},_={data:function(){return{user:{current_password:"",new_password:"",new_password_confirm:"",id:this.$store.state.id}}},methods:{changePassword:function(e){var t=this;e.preventDefault(),this.$http.post("/api/changepassword",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"LoginPage"})}).catch(function(e){alert(e)})}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("비밀번호 변경")]),e._v(" "),a("form",{on:{submit:e.changePassword}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.current_password,expression:"user.current_password"}],attrs:{type:"password",id:"current_password",placeholder:"현재 비밀번호"},domProps:{value:e.user.current_password},on:{input:function(t){t.target.composing||e.$set(e.user,"current_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password,expression:"user.new_password"}],attrs:{type:"password",id:"new_password",placeholder:"새 비밀번호"},domProps:{value:e.user.new_password},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password_confirm,expression:"user.new_password_confirm"}],attrs:{type:"password",id:"new_password_confirm",placeholder:"새 비밀번호 확인"},domProps:{value:e.user.new_password_confirm},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password_confirm",t.target.value)}}})]),e._v(" "),a("button",[e._v("변경")])])])},staticRenderFns:[]},f={data:function(){return{user:{current_password:"",new_password:"",new_password_confirm:"",id:this.$store.state.id}}},methods:{changeAccountInfo:function(e){var t=this;e.preventDefault(),this.$http.post("/api/changeaccountinfo",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"LoginPage"})}).catch(function(e){alert(e)})}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("회원정보 수정")]),e._v(" "),a("form",{on:{submit:e.changeAccountInfo}},[a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.current_password,expression:"user.current_password"}],attrs:{type:"password",id:"current_password",placeholder:"현재 비밀번호"},domProps:{value:e.user.current_password},on:{input:function(t){t.target.composing||e.$set(e.user,"current_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password,expression:"user.new_password"}],attrs:{type:"password",id:"new_password",placeholder:"새 비밀번호"},domProps:{value:e.user.new_password},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"input_row"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.new_password_confirm,expression:"user.new_password_confirm"}],attrs:{type:"password",id:"new_password_confirm",placeholder:"새 비밀번호 확인"},domProps:{value:e.user.new_password_confirm},on:{input:function(t){t.target.composing||e.$set(e.user,"new_password_confirm",t.target.value)}}})]),e._v(" "),a("button",[e._v("수정")])])])},staticRenderFns:[]},w=[{path:"/",name:"LoginPage",component:a("VU/8")(l,p,!1,function(e){a("wH4F")},"data-v-19124ec4",null).exports},{path:"/createaccount",name:"CreateAccountPage",component:a("VU/8")(m,v,!1,null,null,null).exports},{path:"/changepassword",name:"ChangePassword",component:a("VU/8")(_,h,!1,null,null,null).exports},{path:"/changeaccountinfo",name:"ChangeAccountInfo",component:a("VU/8")(f,g,!1,null,null,null).exports}],k={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"AdminPage"},$={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("router-link",{attrs:{to:"/admin/taskcreate"}},[e._v("태스크 생성")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/taskmanage"}},[e._v("태스크 관리")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/taskstatistics"}},[e._v("태스크 통계")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/admin/membermanage"}},[e._v("회원 관리 및 통계")]),e._v(" "),a("router-view")],1)},staticRenderFns:[]};var b={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"TaskCreate",data:function(){return{user:{taskName:"",taskDescription:"",min_upload_period:"",taskTableName:"",taskTableSchemaInfo:""}}},methods:{taskCreate:function(e){var t=this;e.preventDefault(),this.$http.post("/api/admin/taskcreate",{user:this.user}).then(function(e){alert(e.data.message),e.data.success&&t.$router.push({name:"DefineOriginalDataType"})}).catch(function(e){alert(e)})}}},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("태스크 생성")]),e._v(" "),a("form",{on:{submit:e.taskCreate}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"taskName"}},[e._v("테스크 이름")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.taskName,expression:"user.taskName"}],attrs:{type:"text",id:"taskName"},domProps:{value:e.user.taskName},on:{input:function(t){t.target.composing||e.$set(e.user,"taskName",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"taskDescription"}},[e._v("테스크 설명")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.taskDescription,expression:"user.taskDescription"}],attrs:{type:"text",id:"taskDescription"},domProps:{value:e.user.taskDescription},on:{input:function(t){t.target.composing||e.$set(e.user,"taskDescription",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"min_upload_period"}},[e._v("최소 업로드 주기 (일)")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.min_upload_period,expression:"user.min_upload_period"}],attrs:{type:"number",name:"min_upload_period",min:"0",max:"100",step:"10",default:"10"},domProps:{value:e.user.min_upload_period},on:{input:function(t){t.target.composing||e.$set(e.user,"min_upload_period",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"taskTableName"}},[e._v("테스크 데이터 테이블 이름")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.taskTableName,expression:"user.taskTableName"}],attrs:{type:"text",id:"taskTableName"},domProps:{value:e.user.taskTableName},on:{input:function(t){t.target.composing||e.$set(e.user,"taskTableName",t.target.value)}}})]),e._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"taskTableSchemaInfo"}},[e._v("테스크 데이터 테이블 스키마 정보 (,로 띄어 쓰시오)")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.user.taskTableSchemaInfo,expression:"user.taskTableSchemaInfo"}],attrs:{type:"text",id:"taskTableSchemaInfo"},domProps:{value:e.user.taskTableSchemaInfo},on:{input:function(t){t.target.composing||e.$set(e.user,"taskTableSchemaInfo",t.target.value)}}})]),e._v(" "),a("button",[e._v("테스크 생성")])])])},staticRenderFns:[]},A={created:function(){var e=this;"ADM"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.post("/api/admin/taskmanage",{accept:this.accept_task}).then(function(t){t.data.success?(e.all_tasks=t.data.all_tasks,e.tasks_YSUB=t.data.tasks_YSUB):alert(t.data.message)})},data:function(){return{all_tasks:[],tasks_YSUB:[],accept_task:[],reject_task:[]}},methods:{submit_accept:function(){var e=this;alert(this.accept_task),this.$http.post("/api/admin/taskmanage",{accept:this.accept_task}).then(function(t){alert("제출되었습니다"),t.data.success?(e.all_tasks=t.data.all_tasks,e.tasks_YSUB=t.data.tasks_YSUB):alert(t.data.message)})}},name:"TaskManage"},N={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h5",[e._v("태스크 관리")]),e._v(" "),e._l(e.all_tasks,function(t){return a("div",{key:t},[a("h3",[e._v("Task: "+e._s(t[0]))])])}),e._v(" "),a("h2",[e._v("다음의 승인 요청이 들어왔습니다.")]),e._v(" "),e._l(e.tasks_YSUB,function(t,s){return a("div",{key:t,attrs:{index:s}},[a("h4",[e._v(e._s(s+1)+"번째 요청) 태스크: "+e._s(t[0])+", 제출자: "+e._s(t[1])+",  평가 점수: "+e._s(t[2])+"\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.accept_task,expression:"accept_task"}],attrs:{type:"checkbox",name:s,id:s},domProps:{value:t,checked:Array.isArray(e.accept_task)?e._i(e.accept_task,t)>-1:e.accept_task},on:{change:function(a){var s=e.accept_task,r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=t,i=e._i(s,o);r.checked?i<0&&(e.accept_task=s.concat([o])):i>-1&&(e.accept_task=s.slice(0,i).concat(s.slice(i+1)))}else e.accept_task=n}}}),e._v("승인\n        "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.reject_task,expression:"reject_task"}],attrs:{type:"checkbox",name:s,id:s},domProps:{value:t,checked:Array.isArray(e.reject_task)?e._i(e.reject_task,t)>-1:e.reject_task},on:{change:function(a){var s=e.reject_task,r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=t,i=e._i(s,o);r.checked?i<0&&(e.reject_task=s.concat([o])):i>-1&&(e.reject_task=s.slice(0,i).concat(s.slice(i+1)))}else e.reject_task=n}}}),e._v("거절\n        ")])])}),e._v(" "),a("button",{on:{click:e.submit_accept}},[e._v("제출")])],2)},staticRenderFns:[]},y={created:function(){"ADM"!==this.$store.state.role&&(alert("권한이 없습니다"),this.$router.go(-1))},name:"TaskStatistics"},D={render:function(){var e=this.$createElement;return(this._self._c||e)("h5",[this._v("태스크 통계")])},staticRenderFns:[]},P={created:function(){var e=this;"ADM"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.get("/api/admin/membermanage").then(function(t){e.users=t.data})},data:function(){return{users:[]}}},E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h2",[e._v("가입 유저 목록입니다. 클릭 시 상세 보기로 넘어갑니다.")]),e._v(" "),e._l(e.users,function(t){return a("div",{key:t},[a("router-link",{attrs:{to:{name:"MemberManage_Each",params:{id:t.ID}}}},[e._v(e._s(t.ID)+" ("+e._s(t.ROLE)+")")])],1)})],2)},staticRenderFns:[]};var T={name:"MemberManage_Each",created:function(){var e=this;if("ADM"!==this.$store.state.role)alert("권한이 없습니다"),this.$router.go(-1);else{var t=this.$route.params.id;this.$http.get("/api/admin/membermanage/"+t).then(function(t){t.data?(e.userData=t.data[0],e.userData.ROLE="ASE"===e.userData.ROLE?"평가자":"제출자"):(e.$router.go(-1),alert("서버 문제입니다. 계속되는 경우 관리자에게 문의하세요."))}).catch(function(e){alert(e)}),this.$http.get("/api/admin/membermanage/"+t+"/task").then(function(t){void 0!==t.data[0]&&(e.taskData=t.data,e.hasTask=!0)}).catch(function(e){alert(e)})}},data:function(){return{userData:{},taskData:[],hasTask:!1}}},M={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h2",[e._v("유저 정보 상세 보기")]),e._v(" "),a("div",[e._v("유저 이름 : "+e._s(e.userData.NAME))]),e._v(" "),a("div",[e._v("아이디 : "+e._s(e.userData.ID))]),e._v(" "),a("div",[e._v("역할 : "+e._s(e.userData.ROLE)+" ")]),e._v(" "),"제출자"===e.userData.ROLE?a("div",[e._v("평가점수 : "+e._s(e.userData.EVALUATION_GRADE)+" ")]):e._e(),e._v(" "),a("div",[e._v("성별 : "+e._s(e.userData.GENDER)+" ")]),e._v(" "),a("div",[e._v("주소 : "+e._s(e.userData.ADDRESS)+" ")]),e._v(" "),a("div",[e._v("전화번호 : "+e._s(e.userData.PHONE)+" ")]),e._v(" "),a("div",[e._v("생일 : "+e._s(e.userData.BIRTHDATE)+" ")]),e._v(" "),e.hasTask?a("div",[e._v("[참여 태스크 목록]"+e._s(e.userData.TASK_NAME)+"\n        "),e._l(e.taskData,function(t){return a("div",{key:t},[e._v(e._s(t.TASK_NAME))])})],2):a("div",[e._v("(사용자가 참여중인 태스크가 없습니다)")])])},staticRenderFns:[]};var U=[{path:"/admin",name:"AdminPage",component:a("VU/8")(k,$,!1,function(e){a("L2cL")},"data-v-3ab92df0",null).exports},{path:"/admin/taskcreate",name:"TaskCreate",component:a("VU/8")(b,x,!1,null,null,null).exports},{path:"/admin/taskmanage",name:"TaskManage",component:a("VU/8")(A,N,!1,null,null,null).exports},{path:"/admin/taskstatistics",name:"TaskStatistics",component:a("VU/8")(y,D,!1,null,null,null).exports},{path:"/admin/membermanage",name:"MemberManage",component:a("VU/8")(P,E,!1,function(e){a("jiHP")},"data-v-0874d1f0",null).exports},{path:"/admin/membermanage/:id",name:"MemberManage_Each",component:a("VU/8")(T,M,!1,function(e){a("bqQX")},"data-v-df8fbc82",null).exports}],S={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("router-view")],1)},staticRenderFns:[]};var C={created:function(){var e=this;"ASE"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.get("/api/assessor/parsingevaluate").then(function(t){e.files=t.data})},data:function(){return{files:[],is_show:!1}},methods:{handle_toggle:function(){this.is_show=!this.is_show},apply:function(e){this.is_show=!this.is_show;var t=this.tasks[e].NAME,a=this.$store.state.id;this.$http.get("/api/submittee/tasklist/"+t+"/"+a).then(function(e){alert(e.data.message)})}}},R={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("파싱 데이터 시퀀스 파일 정성평가 페이지")]),e._v(" "),e._l(e.files,function(t,s){return a("div",{key:t},[a("h5",[e._v(e._s(s+1)+" "+e._s(t.ORIGINAL_DATA_TYPE_ID)+" "+e._s(t.TASK_NAME)+" "+e._s(t.TOTAL_TUPLE_NUM)+" "+e._s(t.NULL_RATIO)+" "+e._s(t.DUPLICATE_TUPLE_NUM))])])})],2)},staticRenderFns:[]},I=[{path:"/assessor",name:"AssessorPage",component:a("VU/8")({name:"AssessorPage"},S,!1,function(e){a("pm2e")},"data-v-56d46c76",null).exports},{path:"/assessor/parsingevaluate",name:"ParsingDataFileEvaluate",component:a("VU/8")(C,R,!1,null,null,null).exports}],F={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("router-view")],1)},staticRenderFns:[]};var O={created:function(){var e=this;"SUB"!==this.$store.state.role?(alert("권한이 없습니다"),this.$router.go(-1)):this.$http.get("/api/submittee/tasklist").then(function(t){e.tasks=t.data})},data:function(){return{tasks:[],is_show:!1}},methods:{handle_toggle:function(){this.is_show=!this.is_show},apply:function(e){this.is_show=!this.is_show;var t=this.tasks[e].NAME,a=this.$store.state.id;this.$http.get("/api/submittee/tasklist/"+t+"/"+a).then(function(e){alert(e.data.message)})}}},L={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("태스크 목록 및 참가신청 페이지")]),e._v(" "),e._l(e.tasks,function(t,s){return a("div",{key:t},[a("h5",[e._v(e._s(s+1)+" "+e._s(t.NAME)+" \n            "),a("button",{attrs:{type:"button"},on:{click:e.handle_toggle}},[e._v(" 신청하기 ")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.is_show,expression:"is_show"}]},[a("h5",[e._v("개인정보 이용 동의서")]),e._v(" "),a("P",[e._v("태스크에 참가신청을 하려면 개인정보 이용 동의를 해야합니다.")]),e._v(" "),a("button",{on:{click:function(t){return e.apply(s)}}},[e._v(" 동의 후 신청")])],1)])])})],2)},staticRenderFns:[]},V={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n    TaskApply\n")])},staticRenderFns:[]},j=[{path:"/submittee",name:"SubmitteePage",component:a("VU/8")({name:"SubmitteePage"},F,!1,function(e){a("Mxe/")},"data-v-d88685c0",null).exports},{path:"/submittee/tasklist",name:"TasklistAndApplyFor",component:a("VU/8")(O,L,!1,null,null,null).exports},{path:"/submittee/tasklist/:taskname/:userid",name:"TaskApply",component:a("VU/8")({name:"TaskApply"},V,!1,null,null,null).exports}];s.a.use(d.a);var B=new d.a({mode:"history",routes:[].concat(c()(w),c()(U),c()(I),c()(j))}),Y=a("mtWM"),q=a.n(Y),H=a("424j");a("MU8w");s.a.use(r.a),s.a.prototype.$http=q.a,s.a.config.productionTip=!1;var G=new r.a.Store({plugins:[Object(H.a)()],state:{loggedIn:!1,id:"",role:""},mutations:{logIn:function(e,t){e.loggedIn=!0,e.id=t.id,e.role=t.role},logOut:function(e){e.loggedIn=!1,e.id="",e.role=""}}});new s.a({el:"#app",store:G,router:B,components:{App:i},template:"<App/>"})},"Yz7+":function(e,t,a){e.exports=a.p+"static/img/banner.bf8c9b2.png"},bqQX:function(e,t){},jiHP:function(e,t){},pm2e:function(e,t){},wH4F:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f208957d390d8132b748.js.map