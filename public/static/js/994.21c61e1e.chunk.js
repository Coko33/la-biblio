"use strict";(self.webpackChunkla_biblio=self.webpackChunkla_biblio||[]).push([[994],{5187:function(e,s,a){a.d(s,{d:function(){return i}});var n=a(9439),c=a(2791),i=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],s=(0,c.useState)(e),a=(0,n.Z)(s,2),i=a[0],t=a[1],o=function(){return t(!0)},l=function(){return t(!1)};return[i,o,l]}},2994:function(e,s,a){a.r(s),a.d(s,{default:function(){return m}});var n=a(9439),c=a(7799),i=a(2791),t=a(5187),o=a(673),l=a(4165),r=a(5861),h=(a(7393),a(184)),d=function(e){var s=e.closeSingle,a=e.elId,t=(0,i.useState)(),d=(0,n.Z)(t,2),u=d[0],m=d[1];function f(){return(f=(0,r.Z)((0,l.Z)().mark((function e(){var s,n;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=(0,c.JU)(o.qT,a),e.next=4,(0,c.QT)(s);case 4:n=e.sent,m(n.data()),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return(0,i.useEffect)((function(){!function(){f.apply(this,arguments)}()}),[]),(0,h.jsxs)("div",{children:[u?(0,h.jsxs)("div",{className:"elShow-container",children:[(0,h.jsxs)("div",{className:"elShow-imagen-container",children:[(0,h.jsx)("button",{onClick:s,className:"volver",children:(0,h.jsx)("i",{className:"material-icons volver-icon",children:"keyboard_arrow_left"})}),(0,h.jsx)("img",{className:"elShow-imagen",alt:"",src:u.imagenURL}),(0,h.jsxs)("div",{className:"elShow-text-container mobile",children:[(0,h.jsx)("h2",{className:"elShow-titulo",children:u.titulo}),(0,h.jsx)("h3",{className:"elShow-subtitulo",children:u.subtitulo})]})]}),(0,h.jsxs)("div",{className:"elShow-dataContainer",children:[(0,h.jsxs)("div",{className:"elShow-text-container desk",children:[(0,h.jsx)("h2",{className:"elShow-titulo",children:u.titulo}),(0,h.jsx)("h3",{className:"elShow-subtitulo",children:u.subtitulo})]}),(0,h.jsxs)("div",{className:"elShow-descripcion-container",children:[(0,h.jsx)("div",{className:"elShow-descripcion-container",dangerouslySetInnerHTML:{__html:u.descripcion}}),(0,h.jsx)("div",{className:"elShow-precios-container",dangerouslySetInnerHTML:{__html:u.precios}})]}),(0,h.jsxs)("div",{className:"elShow-fecha-container",children:[(0,h.jsx)("div",{className:"elShow-fecha-iconoSchedule",children:(0,h.jsx)("i",{className:"material-icons",children:"schedule"})}),(0,h.jsxs)("p",{className:"elShow-fecha-texto",children:[new Date(1e3*u.fechaYHora.seconds).toLocaleDateString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"})," ",(0,h.jsx)("br",{})," ",new Date(1e3*u.fechaYHora.seconds).toLocaleTimeString().slice(0,-3)+" hs."]})]})]})]}):(0,h.jsx)("p",{}),(0,h.jsx)("button",{className:"elShow-fecha-button",onClick:s,children:"Volver"})]})},u=a(4991),m=function(){var e=(0,i.useState)([]),s=(0,n.Z)(e,2),a=s[0],l=s[1],r=(0,t.d)(!1),m=(0,n.Z)(r,3),f=m[0],x=m[1],j=m[2],w=(0,i.useState)(null),v=(0,n.Z)(w,2),S=v[0],N=v[1],g=(0,i.useState)(!1),p=(0,n.Z)(g,2),b=p[0],k=p[1];function H(){k(!0);var e=(0,c.IO)(o.qT,(0,c.ar)("fechaYHora",">=",new Date(Date.now())));(0,c.IO)(o.qT,(0,c.ar)("titulo","!=",null));(0,c.PL)(e).then((function(e){var s=e.docs.map((function(e){return{id:e.id,titulo:e.data().titulo,subtitulo:e.data().subtitulo,descripcion:e.data().descripcion,fecha:new Date(1e3*e.data().fechaYHora.seconds).toLocaleDateString("es-ES",{weekday:"long",month:"long",day:"numeric"}),hora:new Date(1e3*e.data().fechaYHora.seconds).toLocaleTimeString().slice(0,-3),imagenURL:e.data().imagenURL,fechaYHora:e.data().fechaYHora.seconds}}));l(s.sort((function(e,s){return e.fechaYHora-s.fechaYHora}))),k(!1)})).catch((function(e){return console.log(e.message)}))}return(0,i.useEffect)((function(){return H(),H()}),[]),(0,h.jsxs)("div",{children:[b&&(0,h.jsx)(u.Z,{}),f&&(0,h.jsx)(d,{closeSingle:j,elId:S}),!f&&(0,h.jsx)("div",{className:"shows-container",children:a?a.map((function(e,s){return(0,h.jsxs)("div",{className:"show-container",children:[(0,h.jsx)("img",{className:"show-img",alt:"imagen show",src:e.imagenURL}),(0,h.jsxs)("div",{className:"show-dataContainer",children:[(0,h.jsxs)("div",{className:"show-descripcionContainer",children:[(0,h.jsx)("h2",{className:"show-titulo",children:e.titulo}),(0,h.jsx)("h3",{className:"show-subtitulo",children:e.subtitulo}),(0,h.jsx)("div",{className:"descripcion-container line-clamp",dangerouslySetInnerHTML:{__html:e.descripcion}})]}),(0,h.jsxs)("div",{className:"fecha-container",children:[(0,h.jsx)("div",{className:"fecha-iconoSchedule",children:(0,h.jsx)("i",{className:"material-icons",children:"schedule"})}),(0,h.jsxs)("p",{className:"fecha-texto",children:[e.fecha," ",(0,h.jsx)("br",{})," ",e.hora+"hs."]}),(0,h.jsx)("button",{onClick:function(){return s=e.id,N(s),x(),void window.scrollTo(0,0);var s},className:"fecha-button",children:"+ Informaci\xf3n"})]})]})]},s)})):(0,h.jsx)("h3",{children:"Sin Shows"})})]})}}}]);
//# sourceMappingURL=994.21c61e1e.chunk.js.map