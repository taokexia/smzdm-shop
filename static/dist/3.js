webpackJsonp([3],{521:function(e,t,r){"use strict";function n(e){r(561)}Object.defineProperty(t,"__esModule",{value:!0});var o=r(555),a=r.n(o);for(var i in o)"default"!==i&&function(e){r.d(t,e,function(){return o[e]})}(i);var s=r(565),l=r(135),u=n,c=l(a.a,s.a,!1,u,"data-v-16dd070f",null);t.default=c.exports},529:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(530),o=r(135),a=o(null,n.a,!1,null,null,null);t.default=a.exports},530:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-menu",{staticClass:"el-menu-demo",attrs:{theme:"dark","default-active":e.$route.path,mode:"horizontal",router:!0}},[r("el-menu-item",{attrs:{index:"/"}},[e._v("什么值得买")]),e._v(" "),r("el-menu-item",{attrs:{index:"/admin/categories"}},[e._v("分类管理")]),e._v(" "),r("el-menu-item",{attrs:{index:"/admin/tags"}},[e._v("标签管理")]),e._v(" "),r("el-menu-item",{attrs:{index:"/admin/products"}},[e._v("商品管理")]),e._v(" "),r("el-menu-item",{attrs:{index:"/admin/users"}},[e._v("用户管理")])],1),e._v(" "),e._t("body")],2)},o=[],a={render:n,staticRenderFns:o};t.a=a},555:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(529),i=n(a),s=r(563),l=n(s),u=r(136);t.default={components:{"layout-component":i.default,"form-component":l.default},data:function(){return{cates:[],showAddDialog:!1,addForm:{name:"",url:""},showEditDialog:!1,editForm:{},showRemoveDialog:!1,removeForm:{}}},head:{title:{inner:"分类管理"}},methods:{getAll:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.fetch.get(u.category.findAll);case 2:r=t.sent,e.cates=r.data.cates;case 4:case"end":return t.stop()}},t,e)}))()},add:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.fetch.post(u.category.add,e.addForm);case 2:return r=t.sent,n=r.data.ok?"success":"error",t.next=6,e.getAll();case 6:e.showAddDialog=!1,e.addForm={},e.$message({message:r.data.msg,type:n});case 9:case"end":return t.stop()}},t,e)}))()},edit:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.fetch.post(u.category.edit,e.editForm);case 2:return r=t.sent,n=r.data.ok?"success":"error",t.next=6,e.getAll();case 6:e.showEditDialog=!1,e.$message({message:r.data.msg,type:n});case 8:case"end":return t.stop()}},t,e)}))()},remove:function(){var e=this;return o(regeneratorRuntime.mark(function t(){var r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.fetch.post(u.category.remove,e.removeForm);case 2:return r=t.sent,n=r.data.ok?"success":"error",t.next=6,e.getAll();case 6:e.showRemoveDialog=!1,e.$message({message:r.data.msg,type:n});case 8:case"end":return t.stop()}},t,e)}))()}},mounted:function(){this.getAll()}}},556:function(e,t,r){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{title:String,showDialog:Boolean,model:Object},data:function(){return{formLabelWidth:"120px",rules:{name:[{required:!0,message:"请输入分类名称",trigger:"blur"}],url:[{required:!0,message:"请输入分类URL",trigger:"blur"}]}}},computed:{form:function(){return this.model}},methods:{hide:function(){this.$emit("hide")},confirm:function(){var e=this;return n(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.validate();case 2:r=t.sent,r&&e.$emit("confirm");case 4:case"end":return t.stop()}},t,e)}))()},validate:function(){var e=this;return new Promise(function(t,r){e.$refs.form.validate(function(e){e?t(!0):r(!1)})})}}}},561:function(e,t,r){var n=r(562);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(520)("5ed64c12",n,!0,{})},562:function(e,t,r){t=e.exports=r(202)(!1),t.push([e.i,".add-btn[data-v-16dd070f]{margin:10px}",""])},563:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(556),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,function(){return n[e]})}(a);var i=r(564),s=r(135),l=s(o.a,i.a,!1,null,null,null);t.default=l.exports},564:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:e.title,visible:e.showDialog,"before-close":e.hide},on:{"update:visible":function(t){e.showDialog=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:"分类名称","label-width":e.formLabelWidth,prop:"name"}},[r("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"标签URL","label-width":e.formLabelWidth,prop:"url"}},[r("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.hide}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确 定")])],1)],1)},o=[],a={render:n,staticRenderFns:o};t.a=a},565:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("layout-component",[r("div",{attrs:{slot:"body"},slot:"body"},[r("el-button",{staticClass:"add-btn",attrs:{type:"primary",icon:"plus"},on:{click:function(t){e.showAddDialog=!0}}},[e._v("添加分类")]),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.cates}},[r("el-table-column",{attrs:{prop:"name",label:"名称",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"url",label:"url",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{prop:"prettyCreatedAt",label:"添加时间",width:"150"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(r){e.showEditDialog=!0,e.editForm=t.row}}},[e._v("\n                        编辑\n                    ")]),e._v(" "),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){e.showRemoveDialog=!0,e.removeForm=t.row}}},[e._v("\n                        删除\n                    ")])]}}])})],1),e._v(" "),r("form-component",{attrs:{title:"添加分类",showDialog:e.showAddDialog,model:e.addForm},on:{confirm:e.add,hide:function(t){e.showAddDialog=!1}}}),e._v(" "),r("form-component",{attrs:{title:"编辑分类",showDialog:e.showEditDialog,model:e.editForm},on:{confirm:e.edit,hide:function(t){e.showEditDialog=!1}}}),e._v(" "),r("el-dialog",{attrs:{title:"删除分类",visible:e.showRemoveDialog},on:{"update:visible":function(t){e.showRemoveDialog=t}}},[r("el-alert",{attrs:{title:"确定删除分类："+e.removeForm.name+"？",type:"error",closable:!1}}),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.showRemoveDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.remove}},[e._v("确 定")])],1)],1)],1)])},o=[],a={render:n,staticRenderFns:o};t.a=a}});
//# sourceMappingURL=3.js.map