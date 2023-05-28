"use strict";(self.webpackChunkla_biblio=self.webpackChunkla_biblio||[]).push([[933],{1676:function(e,t,n){n.r(t),n.d(t,{default:function(){return $}});var a=n(9439),i=n(2791),o=n(184);function r(e){var t=e.cambiaTitulo,n=e.titulo;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelTitulo",htmlFor:"titulo",children:"T\xedtulo"}),(0,o.jsx)("input",{type:"text",className:"input-titulo",placeholder:"T\xedtulo del show",value:n,onChange:t})]})}function s(e){var t=e.cambiaSubtitulo,n=e.subtitulo;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelTitulo",htmlFor:"subtitulo",children:"Subt\xedtulo"}),(0,o.jsx)("input",{type:"text",className:"input-titulo",placeholder:"Subt\xedtulo opcional",value:n,onChange:t})]})}var c=n(6770),l=n.n(c);n(6009);function u(e){var t=e.cambiaDescripcion,n=e.descripcion;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:"Descripci\xf3n"}),(0,o.jsx)(l(),{className:"input-descripcion",placeholder:"Escribir la descripcion del show",modules:{toolbar:[[{header:[!1,3,2,1]}],[{color:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]]},formats:["header","color","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image"],value:n,onChange:t})]})}var d=n(1413),h=n(7792),m=n(6571),p=n(7162),f=n(8237);function b(e){var t=e.cambiaFechaYHora,n=e.fechaYHora,a=e.labelFecha;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:a||"Fecha"}),(0,o.jsx)(m._,{dateAdapter:h.y,children:(0,o.jsx)(p.x,{inputFormat:"DD/MM/YYYY hh:mm",value:n,onChange:function(e){t(e)},renderInput:function(e){return(0,o.jsx)(f.Z,(0,d.Z)({},e))}})})]})}function x(e){var t=e.cambiaFile,n=e.imagenURL,r=(0,i.useState)(n),s=(0,a.Z)(r,2),c=s[0],l=s[1];return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:"Imagen"}),(0,o.jsxs)("div",{className:"input-imagen",children:[(0,o.jsx)("img",{className:"imagenPreview",width:"320",src:c,alt:""}),(0,o.jsx)("input",{className:"input-imagen-input",type:"file",onChange:function(e){l(URL.createObjectURL(e.target.files[0])),t(e.target.files[0])}})]})]})}var g=n(1470),j=n(7799),v=n(673),w=n(276);function S(e){var t=e.cambiaPrecios,n=e.precios;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:"Precios"}),(0,o.jsx)(l(),{className:"input-descripcion",placeholder:"Escribir la descripcion del show",modules:{toolbar:[[{header:[!1,3,2,1]}],[{color:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]]},formats:["header","color","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image"],value:n,onChange:t})]})}function y(){var e=(0,i.useState)(""),t=(0,a.Z)(e,2),n=t[0],c=t[1],l=(0,i.useState)(""),d=(0,a.Z)(l,2),h=d[0],m=d[1],p=(0,i.useState)(""),f=(0,a.Z)(p,2),y=f[0],N=f[1],Z=(0,i.useState)(Date.now),k=(0,a.Z)(Z,2),T=k[0],H=k[1],C=(0,i.useState)(""),L=(0,a.Z)(C,2),E=L[0],D=L[1],F=(0,i.useState)(!0),U=(0,a.Z)(F,2),Y=(U[0],U[1],(0,i.useState)(!1)),M=(0,a.Z)(Y,2),A=(M[0],M[1],(0,i.useState)(!1)),R=(0,a.Z)(A,2),I=(R[0],R[1],(0,i.useState)(!1)),O=(0,a.Z)(I,2),P=(O[0],O[1],(0,i.useState)(null)),q=(0,a.Z)(P,2),z=q[0],B=q[1],$=(0,i.useState)(null),J=(0,a.Z)($,2),_=J[0],V=J[1],Q=(0,i.useState)(null),W=(0,a.Z)(Q,2),X=W[0],K=W[1];return(0,o.jsxs)("div",{children:[_&&(0,o.jsx)(g.b,{message:_,resetError:function(){return V(null)}}),X&&(0,o.jsx)(g.b,{message:X,resetError:function(){return K(null)}}),(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("h2",{className:"titulo-form",children:"Agregar un show"}),(0,o.jsx)(r,{cambiaTitulo:function(e){return c(e.target.value)}}),(0,o.jsx)(s,{cambiaSubtitulo:function(e){return m(e.target.value)}}),(0,o.jsx)(u,{cambiaDescripcion:function(e){return N(e)},descripcion:y}),(0,o.jsx)(S,{cambiaPrecios:function(e){return D(e)},precios:E}),(0,o.jsx)(b,{cambiaFechaYHora:function(e){return H(e)},fechaYHora:T}),(0,o.jsx)(x,{cambiaFile:function(e){return B(e)}}),(0,o.jsx)("div",{className:"formShow-button-container",children:(0,o.jsx)("button",{className:"formShow-button",onClick:function(){!z&&V("No se puede subir un show sin una imagen");var e=(0,w.iH)(v.tO,"imagenes-shows/".concat(z.name)),t=(0,w.B0)(e,z);t.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log(t)}),(function(e){console.log(e.message)}),(function(){(0,w.Jt)(t.snapshot.ref).then((function(e){(0,j.ET)(v.qT,{titulo:n,subtitulo:h,descripcion:y,fechaYHora:T.$d,imagenURL:e,precios:E}).then((function(e){console.log(e),K('Se subi\xf3 correctamente el show \n"'.concat(n,'"')),c(""),setTimeout((function(){window.location.replace("")}),2e3)})).catch((function(e){V(e.message)}))}))}))},children:"Enviar"})})]})]})}function N(e){var t=e.cambiaTitulo,n=e.titulo;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelTitulo",htmlFor:"titulo",children:"Nombre del plato o bebida"}),(0,o.jsx)("input",{type:"text",className:"input-titulo",placeholder:"nombre del plato o bebida",value:n,onChange:t})]})}function Z(e){var t=e.cambiaCategoria,n=e.categoria;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelCategoria",htmlFor:"categoria",children:"Elegir una Categoria"}),(0,o.jsxs)("select",{name:"",className:"input-selectCategoria",id:"categoria",value:n,onChange:t,children:[(0,o.jsx)("option",{value:"",children:"elegir una categoria"}),(0,o.jsx)("option",{value:"Salados",children:"Salados"}),(0,o.jsx)("option",{value:"Dulces",children:"Dulces"}),(0,o.jsx)("option",{value:"Entradas",children:"Entradas"}),(0,o.jsx)("option",{value:"Principales",children:"Principales"}),(0,o.jsx)("option",{value:"Vinos tintos",children:"Vinos tintos"}),(0,o.jsx)("option",{value:"Vinos blancos",children:"Vinos blancos"}),(0,o.jsx)("option",{value:"Champagnes",children:"Champagnes"}),(0,o.jsx)("option",{value:"Cafeteria",children:"Cafeteria"}),(0,o.jsx)("option",{value:"Bebidas",children:"Bebidas"}),(0,o.jsx)("option",{value:"Cervezas",children:"Cervezas"}),(0,o.jsx)("option",{value:"Tragos",children:"Tragos"})]})]})}function k(e){var t=e.cambiaOrden,n=e.orden;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelOrden",htmlFor:"orden",children:"Orden en la lista"}),(0,o.jsx)("input",{type:"number",className:"input-orden",placeholder:"orden en que se muestra en la categoria. 1 es arriba",value:n,onChange:t})]})}function T(e){var t=e.cambiaDescripcion,n=e.descripcion;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:"Descripci\xf3n (opcional)"}),(0,o.jsx)(l(),{className:"input-descripcion",placeholder:"opcionalmente escribir la descripcion del plato",modules:{toolbar:[[{header:[!1,3,2,1]}],[{color:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]]},formats:["header","color","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image"],value:n,onChange:t})]})}function H(e){var t=e.cambiaPrecio,n=e.precio;return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelPrecio",htmlFor:"precio",children:"Precio (solo n\xfameros!)"}),(0,o.jsx)("input",{type:"text",className:"input-titulo",placeholder:"precio del producto en $",value:n,onChange:t})]})}function C(e){var t=e.cambiaFile,n=e.imagenURL,r=(0,i.useState)(n),s=(0,a.Z)(r,2),c=s[0],l=s[1];return(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{className:"input-labelDescripcion",htmlFor:"descripcion",children:"Imagen del plato o bebida"}),(0,o.jsxs)("div",{className:"input-imagen",children:[(0,o.jsx)("img",{className:"imagenPreview",width:"320",src:c,alt:""}),(0,o.jsx)("form",{children:(0,o.jsx)("input",{className:"input-imagen-input",type:"file",onChange:function(e){l(URL.createObjectURL(e.target.files[0])),t(e.target.files[0])}})})]})]})}function L(){var e=(0,i.useState)(""),t=(0,a.Z)(e,2),n=t[0],r=t[1],s=(0,i.useState)(),c=(0,a.Z)(s,2),l=c[0],u=c[1],d=(0,i.useState)(""),h=(0,a.Z)(d,2),m=h[0],p=h[1],f=(0,i.useState)(""),b=(0,a.Z)(f,2),x=b[0],S=b[1],y=(0,i.useState)(),L=(0,a.Z)(y,2),E=L[0],D=L[1],F=(0,i.useState)(!0),U=(0,a.Z)(F,2),Y=(U[0],U[1],(0,i.useState)(!1)),M=(0,a.Z)(Y,2),A=(M[0],M[1],(0,i.useState)(!1)),R=(0,a.Z)(A,2),I=(R[0],R[1],(0,i.useState)(!1)),O=(0,a.Z)(I,2),P=(O[0],O[1],(0,i.useState)(null)),q=(0,a.Z)(P,2),z=q[0],B=q[1],$=(0,i.useState)(null),J=(0,a.Z)($,2),_=J[0],V=J[1],Q=(0,i.useState)(null),W=(0,a.Z)(Q,2),X=W[0],K=W[1],G=function(e){(0,j.ET)(v.am,{titulo:n,orden:parseInt(l,10),categoria:m,descripcion:x,precio:parseInt(E,10),imagenURL:e||null}).then((function(e){V('Se subio correctamente el \xedtem \n"'.concat(n,'"')),setTimeout((function(){window.location.replace("")}),2e3)})).catch((function(e){B(e.message)}))};return(0,o.jsxs)("div",{children:[z&&(0,o.jsx)(g.b,{message:z,resetError:function(){return B(null)}}),_&&(0,o.jsx)(g.b,{message:_,resetError:function(){return V(null)}}),(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("h2",{className:"titulo-form",children:"Agregar un plato o bebida"}),(0,o.jsx)(N,{cambiaTitulo:function(e){return r(e.target.value)},titulo:n}),(0,o.jsx)(Z,{cambiaCategoria:function(e){return p(e.target.value)},categoria:m}),(0,o.jsx)(k,{cambiaOrden:function(e){return u(e.target.value)},orden:l}),(0,o.jsx)(T,{cambiaDescripcion:function(e){return S(e.target.value)},descripcion:x}),(0,o.jsx)(H,{cambiaPrecio:function(e){return D(e.target.value)},precio:E}),(0,o.jsx)(C,{cambiaFile:function(e){return K(e)}}),(0,o.jsx)("div",{className:"formShow-button-container",children:(0,o.jsx)("button",{className:"formShow-button",onClick:function(){if(null!=X){var e=(0,w.iH)(v.tO,"imagenes-carta/".concat(X.name)),t=(0,w.B0)(e,X);t.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log(t)}),(function(e){console.log(e.message)}),(function(){(0,w.Jt)(t.snapshot.ref).then((function(e){G(e)}))}))}else G()},children:"Enviar"})})]})]})}var E=n(3433),D=n(9353),F=n.n(D);function U(){var e=(0,i.useState)(new Date(Date.now()).toString()),t=(0,a.Z)(e,2),n=t[0],r=t[1],s=(0,i.useState)(new Date(Date.now()).toString()),c=(0,a.Z)(s,2),l=c[0],u=c[1],d=(0,i.useState)([]),h=(0,a.Z)(d,2),m=h[0],p=h[1],f=(0,i.useState)([]),x=(0,a.Z)(f,2),g=x[0],w=x[1],S=function(){var e=[];return g.forEach((function(t,n){m.indexOf(n)>=0&&e.push(t)})),e}().map((function(e){return'<table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">\n    <tr >\n      <td style="width: 10%;"><img style="width: 200px; margin-bottom: 50px; margin-top: 50px;" src="'.concat(e.imagenURL,'"></td>\n      <td style="width: 90%;">\n        <div style="padding: 20px;">\n          <h2 style="font-family: \'DM Serif Display\', Helvetica;font-size: 28px;margin:0;line-height: 28px;">').concat(e.titulo,"</h2>\n          <h6 style=\"font-family: 'Archivo', Helvetica; font-size: 16px;margin:0;\">").concat(e.subtitulo?e.subtitulo:"","</h6>\n          <p style=\"font-family: 'Archivo', Helvetica;\">").concat(e.descripcion,'\n            </p>\n            <div style="width: 100%;">\n              <img style="width:17px; display:inline;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Ficono-relojito.png?alt=media&token=e4490e9e-12ea-4d4f-8c8c-b189c29b8540" alt="">\n              <div style="display:inline;height: 17px;width:100%;">\n                <p style="display:inline;font-family: \'Archivo\', Helvetica;font-weight: 700;">').concat(e.fecha," - ").concat(e.hora,"hs.</p>\n              </div>\n              <p style=\"margin: 0px;font-family: 'Archivo', Helvetica;line-height: 20px;margin-top: 10px;\">").concat(e.precios?e.precios:"","</p>\n            </div>\n        </div>\n      </td>\n    </tr>\n  </table>")}));return(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsxs)("h2",{className:"dwHTML-titulo",children:["Descargar Newsletter",(0,o.jsx)("br",{}),"en HTML"]}),(0,o.jsx)(b,{cambiaFechaYHora:function(e){return r(e.$d)},fechaYHora:n,labelFecha:"Desde"}),(0,o.jsx)(b,{cambiaFechaYHora:function(e){return u(e.$d)},fechaYHora:l,labelFecha:"Hasta"}),(0,o.jsx)("div",{className:"containter-tablaEditar",children:(0,o.jsxs)("table",{className:"dwHTMLtable",children:[(0,o.jsx)("thead",{className:"tablaHead",children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Fecha"}),(0,o.jsx)("th",{children:"T\xedtulo"}),(0,o.jsx)("th",{children:"Seleccionados"}),(0,o.jsx)("th",{}),(0,o.jsx)("th",{})]})}),(0,o.jsxs)("tbody",{children:[(0,o.jsxs)("tr",{className:"dwHTMLrow-show",children:[(0,o.jsx)("td",{}),(0,o.jsx)("td",{}),(0,o.jsxs)("td",{children:[(0,o.jsx)("input",{onChange:function(e){e.target.checked?g.forEach((function(e,t){return p((function(e){return[].concat((0,E.Z)(e),[t])}))})):p([])},type:"checkbox"}),"Seleccionar todos"]}),(0,o.jsx)("td",{}),(0,o.jsx)("td",{})]}),g?g.map((function(e,t){return(0,o.jsxs)("tr",{className:"dwHTMLrow-show",children:[(0,o.jsxs)("td",{className:"dwHTMLcell-showFecha",children:[e.fecha," \xa0 \xa0 \xa0 \xa0"]}),(0,o.jsxs)("td",{className:"dwHTMLcell-showTitulo",children:[e.titulo," \xa0 \xa0 \xa0 \xa0"]}),(0,o.jsx)("td",{className:"dwHTMLcell-showTitulo",children:(0,o.jsx)("input",{onChange:function(e){return function(e){var t=parseInt(e,10);-1===m.indexOf(t)?p([].concat((0,E.Z)(m),[t])):m.indexOf(t)>=0&&p(m.filter((function(e){return e!==t})))}(e.target.value)},type:"checkbox",value:t,checked:m.includes(t)})})]},t)})):(0,o.jsx)("h3",{children:"Sin Shows"})]})]})}),(0,o.jsxs)("div",{className:"dwHTMLbutton-container",children:[(0,o.jsx)("button",{onClick:function(){return function(){n.$d&&r(n.$d),l.$d&&r(l.$d);var e=(0,j.IO)(v.qT,(0,j.ar)("fechaYHora",">=",n),(0,j.ar)("fechaYHora","<=",l));(0,j.IO)(v.qT,(0,j.ar)("titulo","!=",null)),(0,j.PL)(e).then((function(e){var t=e.docs.map((function(e){return{id:e.id,titulo:e.data().titulo,subtitulo:e.data().subtitulo,descripcion:e.data().descripcion,precios:e.data().precios,fecha:new Date(1e3*e.data().fechaYHora.seconds).toLocaleDateString("es-ES",{month:"long",weekday:"long",day:"numeric"}),hora:new Date(1e3*e.data().fechaYHora.seconds).toLocaleTimeString().slice(0,-3),imagenURL:e.data().imagenURL,fechaYHora:e.data().fechaYHora.seconds,seleccionado:!1}}));w(t.sort((function(e,t){return e.fechaYHora-t.fechaYHora})))})).catch((function(e){return console.log(e.message)}))}()},className:"buttonLogout-dashboard buttonMostrarShows",children:"mostrar shows"}),(0,o.jsx)("button",{onClick:function(){return function(){var e="newsletter desde ".concat(n.toLocaleDateString()," hasta ").concat(l.toLocaleDateString()," .html"),t='<!DOCTYPE html>\n  <html lang="es">\n    <head>\n        <meta charset="UTF-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>La Biblioteca Caf\xe9 newsletter </title>\n        <style type = \u201ctext/css\u201d>\n          @font-face {\n            font-family: \'DM Serif Display\';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/dmserifdisplay/v10/-nFnOHM81r4j6k0gjAW3mujVU2B2K_Q.woff) format(\'woff\');\n          }\n          @font-face {\n            font-family: \'Archivo\';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: normal;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/archivo/v18/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDNp8w.woff) format(\'woff\');\n          }\n          h1 {font-family:"DM Serif Display", Helvetica !important;margin:0px !important;}\n          p {font-family:\'Archivo\', Helvetica !important;} \n        </style>\n        <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo&family=DM+Serif+Display&display=swap" rel="stylesheet">\n          \n    </head>\n    <body style="margin: 0px; width: 100%; background-color: #e8e3df;">\n      <table style="width: 100%; height: 200px; margin: 0px; border-collapse:collapse;border-spacing: 0px;" id="banner">\n        <tr style="width: 100%; margin: 0px; background-size: cover;" background="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Fbiblioteca-baner1.jpg?alt=media&token=77e64746-f70d-4a2e-8bb3-36b0f37cce60">\n          <td style="width: 140px;">\n            <img style="display: inline; width: 80px; margin-left: 30px;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Flogo-blanco.png?alt=media&token=5a4139a7-9623-4a26-bf4a-f10bf7d8066b" alt="">\n          </td>\n          <td>\n            <h1 style="font-family: \'DM Serif Display\', Helvetica; font-weight: 400; font-size: 36px; color: #ffffff; margin: 0px;line-height: 36px;">La Biblioteca Caf\xe9</h1>\n            <p style="font-family: \'Archivo\', Helvetica; font-size: 18px; color: #ffffff; margin: 0px; margin: 0px;">Un espacio para la m\xfasica en vivo</p>\n          </td>\n        </tr>\n      </table>\n      <table style="background-color: #e8e3df; border-collapse:collapse;border-spacing: 0px;" id="show">\n          <tbody style="border-collapse:collapse">\n            <tr>\n              <td align="center">\n              <table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">\n                <tr>\n                  <td style="width: 50%; text-align: center;"><img style="width: 300px; margin-bottom: 0px; margin-top: 50px;" src="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/imagenes-carta%2FPlato2.jpeg?alt=media&token=5d0badaa-6889-43b6-b248-facd6e3a16b0"></td>\n                  <tr style="width: 80%;">\n                    <td>\n                      <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 10px;margin-bottom:10px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700">Almuerzo Ejecutivo</p>\n                      <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">d\xedas h\xe1biles de 12:30 a 15:00</p>\n                      <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">incluye plato, bebida y postre o caf\xe9</p>\n                      <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 0px;margin-bottom: 30px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">$2300</p>\n                    </td>\n                  </tr>\n                </tr>\n                </table><table style="width:80%;border-collapse:collapse;border-bottom: 3px solid #7f4437;border-spacing: 0px;">\n                </table>'+S.join("")+'</td>\n  </tr>\n\n  <tr style="width: 100%; text-align: center;">\n    <td class="footer" align="center">\n      <table style="width: 100%;border-collapse:collapse;border-spacing: 0px;">\n        <tr style="width: 80%;">\n          <td>\n            <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 30px;margin-bottom:10px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:14px;">La Biblioteca Caf\xe9 esta abierta desde las 9 horas y de lunes a viernes para almorzar (plato, bebida y postre o cafe x $2300) y tambi\xe9n para desayunar, tomar algo, leer un libro de sus estantes, o simplemente sentarse a descansar del ruido de Buenos Aires!</p>\n            <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 0px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700;">tel: 4811-0673 \xf3 15 6515-9514</p>\n            <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 5px;margin-bottom: 0px; margin-left:20px; margin-right:20px;line-height: 16px; font-size:16px; font-weight: 700;">email: edith@labibliotecacafe.com.ar</p>\n            <p style="text-align: center;font-family: \'Archivo\', Helvetica;margin-top: 5px;margin-bottom:20px; margin-left:20px; margin-right:20px;line-height: 14px; font-size:16px;font-weight: 700;">Marcelo T. de Alvear 1155 - CABA</p>\n          </td>\n        </tr>\n        <tr style="background-size: contain;background-repeat: no-repeat;" background="https://firebasestorage.googleapis.com/v0/b/la-biblio.appspot.com/o/layout%2Ffooter-newsletter2.jpg?alt=media&token=e2e359e7-5c09-4fc9-929b-021b074458a6">\n          <td style="width: 100%; height: 150px;">\n            \n          </td>\n        </tr>\n      </table>\n    </td>\n  </tr>\n\n</table>\n\n</table>\n</body>\n</html>',a=new Blob([t],{type:"text/html"});F()(a,e)}()},className:"buttonLogout-dashboard buttonDownload",children:"descargar newsletter"})]})]})})}var Y=n(5187),M=n(4165),A=n(5861);function R(e){var t=e.elId,n=e.closeSingle,c=e.getShows,l=(0,i.useState)(""),d=(0,a.Z)(l,2),h=d[0],m=d[1],p=(0,i.useState)(""),f=(0,a.Z)(p,2),y=f[0],N=f[1],Z=(0,i.useState)(""),k=(0,a.Z)(Z,2),T=k[0],H=k[1],C=(0,i.useState)(""),L=(0,a.Z)(C,2),E=L[0],D=L[1],F=(0,i.useState)(""),U=(0,a.Z)(F,2),Y=U[0],R=U[1],I=(0,i.useState)(""),O=(0,a.Z)(I,2),P=O[0],q=O[1],z=(0,i.useState)(!0),B=(0,a.Z)(z,2),$=(B[0],B[1],(0,i.useState)(!1)),J=(0,a.Z)($,2),_=(J[0],J[1],(0,i.useState)(!1)),V=(0,a.Z)(_,2),Q=(V[0],V[1],(0,i.useState)(!1)),W=(0,a.Z)(Q,2);W[0],W[1];function X(){return X=(0,A.Z)((0,M.Z)().mark((function e(t){var n,a;return(0,M.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,j.JU)(v.qT,t),e.next=3,(0,j.QT)(n);case 3:(a=e.sent).exists()?(m(a.data().titulo),N(a.data().subtitulo),H(a.data().descripcion),q(a.data().precios),D(new Date(1e3*a.data().fechaYHora.seconds)),R(a.data().imagenURL)):console.log("No such document!");case 5:case"end":return e.stop()}}),e)}))),X.apply(this,arguments)}(0,i.useEffect)((function(){!function(e){X.apply(this,arguments)}(t)}),[]);var K=(0,i.useState)(null),G=(0,a.Z)(K,2),ee=G[0],te=G[1],ne=(0,i.useState)(null),ae=(0,a.Z)(ne,2),ie=ae[0],oe=ae[1],re=(0,i.useState)(null),se=(0,a.Z)(re,2),ce=se[0],le=se[1],ue=function(){return le(null)};return(0,o.jsxs)("div",{children:[ie&&(0,o.jsx)(g.b,{message:ie,resetError:function(){return oe(null)}}),ce&&(0,o.jsx)(g.b,{message:ce,resetError:ue}),h&&(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("button",{className:"formShow-button",onClick:function(){return n()},children:"Cerrar"}),(0,o.jsxs)("h2",{className:"titulo-form",children:['Modificar "',h,'"']}),(0,o.jsx)(r,{cambiaTitulo:function(e){return m(e.target.value)},titulo:h}),(0,o.jsx)(s,{cambiaSubtitulo:function(e){return N(e.target.value)},subtitulo:y}),(0,o.jsx)(u,{cambiaDescripcion:function(e){return H(e)},descripcion:T}),(0,o.jsx)(S,{cambiaPrecios:function(e){return q(e)},precios:P}),(0,o.jsx)(b,{cambiaFechaYHora:function(e){D(e.$d)},fechaYHora:E}),(0,o.jsx)(x,{cambiaFile:function(e){return te(e)},imagenURL:Y}),(0,o.jsx)("div",{className:"formShow-button-container",children:(0,o.jsx)("button",{className:"formShow-button",onClick:function(){if(!ee&!Y&&oe("No se puede subir un show sin una imagen"),E.$d&&D(E.$d),ee){var e=(0,w.iH)(v.tO,"imagenes-shows/".concat(ee.name)),a=(0,w.B0)(e,ee);a.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log(t)}),(function(e){console.log(e.message)}),(function(){(0,w.Jt)(a.snapshot.ref).then((function(e){(0,j.pl)((0,j.JU)(v.qT,t),{titulo:h,subtitulo:y||"",descripcion:T||"",precios:P||"",fechaYHora:E,imagenURL:e}).then((function(e){console.log(e),le('Se edit\xf3 correctamente el show \n"'.concat(h,'"')),c(),setTimeout((function(){ue(),n(),m("")}),2e3)})).catch((function(e){oe(e.message)}))}))}))}else(0,j.pl)((0,j.JU)(v.qT,t),{titulo:h,subtitulo:y||"",descripcion:T||"",precios:P||"",fechaYHora:E,imagenURL:Y}).then((function(e){console.log(e),le('Se edit\xf3 correctamente el show \n"'.concat(h,'"')),c(),setTimeout((function(){ue(),n(),m("")}),2e3)})).catch((function(e){oe(e.message)}))},children:"Enviar"})})]})]})}n(2041);function I(e){var t=e.elId,n=e.elTitulo,a=e.closeEliminar,i=e.getShows,r=e.setOk,s=function(){var e=(0,A.Z)((0,M.Z)().mark((function e(){return(0,M.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,j.oe)((0,j.JU)(v.qT,t));case 3:i(),a(),r('Se elimin\xf3 el show \n"'.concat(n,'"')),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,o.jsxs)("div",{className:"alert-container",children:[(0,o.jsx)("span",{className:"alert-span",children:"\xbfEst\xe1s segura de eliminar el show ".concat(n,"?")}),(0,o.jsx)("button",{onClick:function(){return s()},className:"alert-button",children:"Ok"}),(0,o.jsx)("button",{onClick:function(){return a()},className:"alert-button",children:"Cancelar"})]})}function O(e){var t=e.setEditandoShows,n=(0,i.useState)([]),r=(0,a.Z)(n,2),s=r[0],c=r[1],l=(0,Y.d)(!1),u=(0,a.Z)(l,3),d=u[0],h=u[1],m=u[2],p=(0,Y.d)(!1),f=(0,a.Z)(p,3),b=f[0],x=f[1],w=f[2],S=(0,i.useState)(null),y=(0,a.Z)(S,2),N=y[0],Z=y[1],k=(0,i.useState)(""),T=(0,a.Z)(k,2),H=T[0],C=T[1],L=(0,i.useState)(null),E=(0,a.Z)(L,2),D=(E[0],E[1]),F=(0,i.useState)(null),U=(0,a.Z)(F,2),M=U[0],A=U[1],O=function(){return A(null)};function P(){(0,j.PL)(v.qT).then((function(e){var t=e.docs.map((function(e){return{id:e.id,titulo:e.data().titulo,subtitulo:e.data().subtitulo,descripcion:e.data().descripcion,fecha:new Date(1e3*e.data().fechaYHora.seconds).toLocaleDateString("es-ES",{month:"short",day:"numeric"}),hora:new Date(1e3*e.data().fechaYHora.seconds).toLocaleTimeString().slice(0,-3),imagenURL:e.data().imagenURL,fechaYHora:e.data().fechaYHora.seconds,precios:e.data().precios}}));c(t.sort((function(e,t){return t.fechaYHora-e.fechaYHora})))})).catch((function(e){return console.log(e.message)}))}return(0,i.useEffect)((function(){P()}),[]),(0,o.jsxs)("div",{children:[M&&(0,o.jsx)(g.b,{message:M,resetError:O}),b&&(0,o.jsx)(I,{elId:N,elTitulo:H,closeEliminar:w,getShows:P,setOk:A}),d&&(0,o.jsx)(R,{elId:N,closeSingle:m,getShows:P}),(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("h2",{className:"dwHTML-titulo",children:"Editar Shows"}),(0,o.jsx)("button",{className:"formShow-button",onClick:function(){return t(!1)},children:"Cerrar"}),(0,o.jsx)("div",{className:"containter-tablaEditar",children:(0,o.jsxs)("table",{className:"dwHTMLtable",children:[(0,o.jsx)("thead",{className:"tablaHead",children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Fecha"}),(0,o.jsx)("th",{children:"T\xedtulo"}),(0,o.jsx)("th",{}),(0,o.jsx)("th",{children:"Acciones"}),(0,o.jsx)("th",{})]})}),(0,o.jsx)("tbody",{children:s?s.map((function(e,t){return(0,o.jsxs)("tr",{className:"dwHTMLrow-show",children:[(0,o.jsxs)("td",{className:"dwHTMLcell-showFecha",children:[e.fecha,"\xa0 \xa0 \xa0 \xa0"]}),(0,o.jsxs)("td",{className:"dwHTMLcell-showTitulo",children:[e.titulo,"\xa0 \xa0 \xa0 \xa0"]}),(0,o.jsxs)("td",{children:["\xa0\xa0",(0,o.jsx)("button",{onClick:function(){return t=e.id,h(),Z(t),void window.scrollTo(0,0);var t},children:"editar"})]}),(0,o.jsxs)("td",{children:["\xa0\xa0",(0,o.jsx)("button",{onClick:function(){return t=e.id,n=e.titulo,x(),Z(t),void C(n);var t,n},children:"borrar"})]}),(0,o.jsxs)("td",{children:["\xa0\xa0",(0,o.jsx)("button",{onClick:function(){return function(e){(0,j.ET)(v.qT,{titulo:e.titulo,subtitulo:e.subtitulo||null,descripcion:e.descripcion,fechaYHora:new Date(e.fechaYHora.seconds).toLocaleTimeString(),imagenURL:e.imagenURL,precios:e.precios}).then((function(t){P(),A('Se duplic\xf3 el show \n"'.concat(e.titulo,'"')),setTimeout((function(){O()}),2e3)})).catch((function(e){D(e.message)}))}(e)},children:"duplicar"})]})]},t)})):(0,o.jsx)("h3",{children:"Sin Shows"})})]})})]})]})}var P=n(1012);function q(e){var t=e.elId,n=e.closeSingle,r=e.obtenerPlatos,s=(0,i.useState)(""),c=(0,a.Z)(s,2),l=c[0],u=c[1],d=(0,i.useState)(),h=(0,a.Z)(d,2),m=h[0],p=h[1],f=(0,i.useState)(""),b=(0,a.Z)(f,2),x=b[0],S=b[1],y=(0,i.useState)(""),L=(0,a.Z)(y,2),E=L[0],D=L[1],F=(0,i.useState)(""),U=(0,a.Z)(F,2),Y=U[0],R=U[1],I=(0,i.useState)(""),O=(0,a.Z)(I,2),P=O[0],q=O[1],z=(0,i.useState)(!0),B=(0,a.Z)(z,2),$=(B[0],B[1],(0,i.useState)(!1)),J=(0,a.Z)($,2),_=(J[0],J[1],(0,i.useState)(!1)),V=(0,a.Z)(_,2),Q=(V[0],V[1],(0,i.useState)(!1)),W=(0,a.Z)(Q,2);W[0],W[1];function X(){return X=(0,A.Z)((0,M.Z)().mark((function e(t){var n,a;return(0,M.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,j.JU)(v.am,t),e.next=3,(0,j.QT)(n);case 3:(a=e.sent).exists()?(u(a.data().titulo),p(a.data().orden),S(a.data().descripcion),D(a.data().categoria),q(a.data().precio),R(a.data().imagenURL),console.log(m)):console.log("No such document!");case 5:case"end":return e.stop()}}),e)}))),X.apply(this,arguments)}(0,i.useEffect)((function(){!function(e){X.apply(this,arguments)}(t)}),[]);var K=(0,i.useState)(null),G=(0,a.Z)(K,2),ee=G[0],te=G[1],ne=(0,i.useState)(null),ae=(0,a.Z)(ne,2),ie=ae[0],oe=ae[1],re=(0,i.useState)(null),se=(0,a.Z)(re,2),ce=se[0],le=se[1],ue=function(){return le(null)};return(0,o.jsxs)("div",{children:[ie&&(0,o.jsx)(g.b,{message:ie,resetError:function(){return oe(null)}}),ce&&(0,o.jsx)(g.b,{message:ce,resetError:ue}),(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("button",{className:"formShow-button",onClick:function(){return n()},children:"Cerrar"}),(0,o.jsxs)("h2",{className:"titulo-form",children:['Modificar "',l,'"']}),(0,o.jsx)(N,{cambiaTitulo:function(e){return u(e.target.value)},titulo:l}),(0,o.jsx)(Z,{cambiaCategoria:function(e){return D(e.target.value)},categoria:E}),(0,o.jsx)(k,{cambiaOrden:function(e){return p(e.target.value)},orden:m}),(0,o.jsx)(T,{cambiaDescripcion:function(e){return S(e)},descripcion:x}),(0,o.jsx)(H,{cambiaPrecio:function(e){return q(e.target.value)},precio:P}),(0,o.jsx)(C,{cambiaFile:function(e){return te(e)},imagenURL:Y}),(0,o.jsx)("div",{className:"formShow-button-container",children:(0,o.jsx)("button",{className:"formShow-button",onClick:function(){if(ee){var e=(0,w.iH)(v.tO,"imagenes-shows/".concat(ee.name)),a=(0,w.B0)(e,ee);a.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log(t)}),(function(e){console.log(e.message)}),(function(){(0,w.Jt)(a.snapshot.ref).then((function(e){(0,j.pl)((0,j.JU)(v.am,t),{titulo:l,orden:parseInt(m,10)||0,categoria:E,descripcion:x||"",precio:parseInt(P,10)||"",imagenURL:e}).then((function(e){le('Se edit\xf3 correctamente el item \n"'.concat(l,'"')),r(),setTimeout((function(){ue(),n(),u("")}),2e3)})).catch((function(e){oe(e.message)}))}))}))}else(0,j.pl)((0,j.JU)(v.am,t),{titulo:l,orden:parseInt(m,10)||0,categoria:E,descripcion:x||"",precio:parseInt(P,10)||"",imagenURL:Y}).then((function(e){le('Se edit\xf3 correctamente el item\n"'.concat(l,'"')),r(),setTimeout((function(){ue(),n(),u("")}),2e3)})).catch((function(e){oe(e.message)}))},children:"Enviar"})})]})]})}function z(e){var t=e.elId,n=e.elTitulo,a=e.closeEliminar,i=e.closeSingle,r=e.obtenerPlatos,s=function(){var e=(0,A.Z)((0,M.Z)().mark((function e(){return(0,M.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,j.oe)((0,j.JU)(v.am,t));case 3:r(),a(),i(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,o.jsxs)("div",{className:"alert-container",children:[(0,o.jsx)("span",{className:"alert-span",children:"\xbfEst\xe1s segura de eliminar item ".concat(n,"?")}),(0,o.jsx)("button",{onClick:function(){return s()},className:"alert-button",children:"Ok"}),(0,o.jsx)("button",{onClick:function(){return a()},className:"alert-button",children:"Cancelar"})]})}function B(e){var t=e.setEditandoCarta,n=(0,i.useState)([]),r=(0,a.Z)(n,2),s=r[0],c=r[1],l=(0,Y.d)(!1),u=(0,a.Z)(l,3),d=u[0],h=u[1],m=u[2],p=(0,Y.d)(!1),f=(0,a.Z)(p,3),b=f[0],x=f[1],w=f[2],S=(0,i.useState)(null),y=(0,a.Z)(S,2),N=y[0],Z=y[1],k=(0,i.useState)(""),T=(0,a.Z)(k,2),H=T[0],C=T[1],L=(0,i.useState)(null),E=(0,a.Z)(L,2),D=(E[0],E[1],(0,i.useState)(null)),F=(0,a.Z)(D,2),U=F[0],M=F[1];function A(){(0,j.PL)(v.am).then((function(e){var t=e.docs.map((function(e){return{id:e.id,titulo:e.data().titulo,categoria:e.data().categoria,precio:e.data().precio,imagenURL:e.data().imagenURL}}));c(t)})).catch((function(e){return console.log(e.message)}))}return(0,i.useEffect)((function(){A()}),[]),(0,o.jsxs)("div",{children:[U&&(0,o.jsx)(g.b,{message:U,resetError:function(){return M(null)}}),b&&(0,o.jsx)(z,{elId:N,elTitulo:H,closeEliminar:w,closeSingle:m,obtenerPlatos:A}),d&&(0,o.jsx)(q,{elId:N,closeSingle:m,setOk:M,obtenerPlatos:A}),(0,o.jsxs)("div",{className:"formShow-container",children:[(0,o.jsx)("h2",{className:"dwHTML-titulo",children:"Editar Carta"}),(0,o.jsx)("button",{className:"formShow-button",onClick:function(){return t(!1)},children:"Cerrar"}),(0,o.jsx)("div",{className:"containter-tablaEditar",children:(0,o.jsxs)("table",{className:"dwHTMLtable",children:[(0,o.jsx)("thead",{className:"tablaHead",children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Categoria"}),(0,o.jsx)("th",{children:"Item"}),(0,o.jsx)("th",{children:"Precio"}),(0,o.jsx)("th",{}),(0,o.jsx)("th",{})]})}),(0,o.jsx)("tbody",{children:s?s.map((function(e,t){return(0,o.jsxs)("tr",{className:"dwHTMLrow-show",children:[(0,o.jsxs)("td",{className:"dwHTMLcell-showFecha",children:[e.categoria," \xa0 \xa0 \xa0 \xa0"]}),(0,o.jsxs)("td",{className:"dwHTMLcell-showTitulo",children:[e.titulo,"\xa0 \xa0 \xa0 \xa0"]}),(0,o.jsxs)("td",{className:"dwHTMLcell-showTitulo",children:["$",e.precio]}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{onClick:function(){return t=e.id,h(),Z(t),void window.scrollTo(0,0);var t},children:"editar"})}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{onClick:function(){return t=e.id,n=e.titulo,x(),Z(t),void C(n);var t,n},children:"borrar"})})]},t)})):(0,o.jsx)("h3",{children:"Sin Shows"})})]})})]})]})}function $(){var e=(0,P.aC)().logout,t=(0,i.useState)(!1),n=(0,a.Z)(t,2),r=n[0],s=n[1],c=(0,i.useState)(!1),l=(0,a.Z)(c,2),u=l[0],d=l[1];return(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"headerDashboard-container",children:[(0,o.jsx)("h2",{className:"titulo-dashboard",children:"Hola Edith!"}),(0,o.jsxs)("div",{className:"buttonsLogoutEdit-Container",children:[(0,o.jsx)("button",{onClick:function(){return e()},className:"buttonLogout-dashboard",children:"Cerrar sesion"}),(0,o.jsx)("button",{onClick:function(){return s(!0)},className:"buttonEdit-dashboard",children:"Editar shows"}),(0,o.jsx)("button",{onClick:function(){return d(!0)},className:"buttonEdit-dashboard",children:"Editar carta"})]})]}),r&&(0,o.jsx)(O,{setEditandoShows:s}),u&&(0,o.jsx)(B,{setEditandoCarta:d}),(0,o.jsx)(U,{}),(0,o.jsx)(y,{}),(0,o.jsx)(L,{})]})}},1470:function(e,t,n){n.d(t,{b:function(){return i}});n(2041);var a=n(184);function i(e){var t=e.message,n=e.resetError;return(0,a.jsxs)("div",{className:"alert-container",children:[(0,a.jsx)("span",{className:"alert-span",children:t}),(0,a.jsx)("button",{onClick:function(){return n()},className:"alert-button",children:"Cerrar"})]})}},2041:function(){}}]);
//# sourceMappingURL=933.11192176.chunk.js.map