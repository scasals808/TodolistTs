(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{60:function(e,t,a){e.exports=a(72)},65:function(e,t,a){},66:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(8),c=a.n(l),r=(a(65),a(32)),o=a(20),u=a(25),d=a(14),s=(a(66),a(113)),m=a(103),f=a(104);function v(e){var t=Object(n.useState)(""),a=Object(d.a)(t,2),l=a[0],c=a[1],r=Object(n.useState)(null),o=Object(d.a)(r,2),u=o[0],v=o[1];function b(){""!==l.trim()?(e.addItem(l.trim()),c("")):v("Title is required!")}return i.a.createElement("div",null,i.a.createElement(s.a,{size:"small",variant:"outlined",value:l,onChange:function(e){c(e.currentTarget.value),v(null)},onKeyPress:function(e){"Enter"===e.key&&b()},error:!!u,label:"Title",helperText:u}),i.a.createElement(m.a,{color:"primary",onClick:b},i.a.createElement(f.a,null)))}function b(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),l=a[0],c=a[1],r=Object(n.useState)(e.title),o=Object(d.a)(r,2),u=o[0],m=o[1];return l?i.a.createElement(s.a,{variant:"outlined",value:u,onBlur:function(){c(!1),e.saveNewTitle(u)},autoFocus:!0,onChange:function(e){m(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){c(!0),m(e.title)}},e.title)}var E=a(114),j=a(106),O=a(105),h=a(51),p=a.n(h);function T(e){return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(b,{title:e.title,saveNewTitle:function(t){e.changeTodoListTitle(e.id,t)}}),i.a.createElement(m.a,{onClick:function(){e.removeTodoList(e.id)}},i.a.createElement(O.a,null))),i.a.createElement(v,{addItem:function(t){e.addTask(t,e.id)}}),i.a.createElement("div",null,e.tasks.map((function(t){return i.a.createElement("div",{key:t.id,className:t.isDone?"is_done":""},i.a.createElement(E.a,{color:"primary",checked:t.isDone,onChange:function(a){var n=a.currentTarget.checked;e.changeTaskStatus(t.id,n,e.id)}}),i.a.createElement(b,{title:t.title,saveNewTitle:function(a){e.changeTaskTitle(t.id,a,e.id)}}),i.a.createElement(m.a,{onClick:function(){e.removeTask(t.id,e.id)}},i.a.createElement(p.a,null)))}))),i.a.createElement("div",null,i.a.createElement(j.a,{variant:"all"===e.filter?"contained":"outlined",color:"all"===e.filter?"default":"primary",onClick:function(){e.changeTodolistFilter("all",e.id)}},"All"),i.a.createElement(j.a,{variant:"active"===e.filter?"contained":"outlined",color:"active"===e.filter?"default":"primary",onClick:function(){e.changeTodolistFilter("active",e.id)}},"Active"),i.a.createElement(j.a,{variant:"completed"===e.filter?"contained":"outlined",color:"completed"===e.filter?"default":"primary",onClick:function(){e.changeTodolistFilter("completed",e.id)}},"Completed")))}var g=a(115),k=a(107),S=a(108),y=a(110),D=a(111),w=a(112),C=a(73),L=a(109);var x=function(){var e,t=Object(g.a)(),a=Object(g.a)(),l=Object(n.useState)([{id:t,title:"What to learn",filter:"all"},{id:a,title:"What to learn next",filter:"active"}]),c=Object(d.a)(l,2),s=c[0],f=c[1],b=Object(n.useState)((e={},Object(u.a)(e,t,[{id:Object(g.a)(),title:"HTML&CSS",isDone:!0},{id:Object(g.a)(),title:"JS",isDone:!0},{id:Object(g.a)(),title:"ReactJS",isDone:!1}]),Object(u.a)(e,a,[{id:Object(g.a)(),title:"RestApi",isDone:!1},{id:Object(g.a)(),title:"GraphQL",isDone:!1},{id:Object(g.a)(),title:"SASS",isDone:!1}]),e)),E=Object(d.a)(b,2),O=E[0],h=E[1];function p(e,t){var a=O[t];O[t]=a.filter((function(t){return t.id!==e})),h(Object(o.a)({},O))}function x(e,t,a){var n=O[a].find((function(t){return t.id===e}));n&&(n.isDone=t,h(Object(o.a)({},O)))}function N(e,t,a){var n=O[a].find((function(t){return t.id===e}));n&&(n.title=t,h(Object(o.a)({},O)))}function A(e,t){var a=s.find((function(t){return t.id===e}));a&&(a.title=t,f(Object(r.a)(s)))}function F(e,t){var a={id:Object(g.a)(),title:e,isDone:!1},n=O[t];O[t]=[a].concat(Object(r.a)(n)),h(Object(o.a)({},O))}function I(e,t){var a=s.find((function(e){return e.id===t}));a&&(a.filter=e,f(Object(r.a)(s)))}function J(e){f(s.filter((function(t){return t.id!==e}))),delete O[e],h(Object(o.a)({},O))}return i.a.createElement("div",{className:"App"},i.a.createElement(k.a,{position:"static"},i.a.createElement(S.a,null,i.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(L.a,null)),i.a.createElement(y.a,{variant:"h6"},"News"),i.a.createElement(j.a,{color:"inherit"},"Login"))),i.a.createElement(D.a,{fixed:!0},i.a.createElement(w.a,{container:!0,style:{padding:"20px"}},i.a.createElement(v,{addItem:function(e){var t=Object(g.a)(),a={id:t,title:e,filter:"all"};f([].concat(Object(r.a)(s),[a])),h(Object(o.a)(Object(o.a)({},O),{},Object(u.a)({},t,[])))}})),i.a.createElement(w.a,{container:!0,spacing:5},s.map((function(e){var t=O[e.id];return"active"===e.filter&&(t=O[e.id].filter((function(e){return!e.isDone}))),"completed"===e.filter&&(t=O[e.id].filter((function(e){return e.isDone}))),i.a.createElement(w.a,{item:!0},i.a.createElement(C.a,{style:{padding:"20px"},elevation:6},i.a.createElement(T,{key:e.id,id:e.id,title:e.title,filter:e.filter,tasks:t,removeTask:p,changeTodolistFilter:I,addTask:F,changeTaskStatus:x,changeTodoListTitle:A,removeTodoList:J,changeTaskTitle:N})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[60,1,2]]]);
//# sourceMappingURL=main.75785444.chunk.js.map