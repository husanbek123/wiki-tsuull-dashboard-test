import{r as b,j as e,B as n,a as C,b as I,c as k}from"./index-292256a4.js";import{u as v,a as S,C as A,T as r,A as D,b as M}from"./index-c289f610.js";const w="_Main_1l889_1",B="_container_1l889_10",T="_Add_1l889_18",F="_table_1l889_36",d={Main:w,container:B,Add:T,table:F},N="/assets/videoIco-7efa9957.png";function E(){var h;const a=v(["media"],"/media",{}),[p,t]=b.useState(!1),[o,s]=b.useState({status:null,id:null}),{t:i}=S(),z=[{title:i("title_uz"),dataIndex:"title_uz",key:"title_uz"},{title:i("title_en"),dataIndex:"title_en",key:"title_uz"},{title:i("frame"),dataIndex:"frame",key:"frame"},{title:i("category_uz"),dataIndex:"category_uz",key:"category_uz"},{title:i("category_en"),dataIndex:"category_en",key:"category_uz"},{title:"Crud Buttons",dataIndex:"buttons",key:"buttons",fixed:"right",width:100}];return e.jsx("div",{className:d.Main,children:e.jsxs("div",{className:d.container,children:[p&&e.jsx(A,{postUrl:"/media",option:o.status,id:o.id,setIsModalOpen:t,isModalOpen:p,url:`${o.url}`}),e.jsx("div",{className:d.Add,children:e.jsx(r,{title:"Add",color:"blue",children:e.jsx(n,{type:"primary",style:{width:"100%",height:"40px",fontSize:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},onClick:()=>{s({status:"Add"}),t(!0)},children:e.jsxs("p",{children:[i("add")," ",e.jsx(D,{})]})})},"Add")}),e.jsx("div",{className:d.table,children:e.jsx(M,{columns:z,dataSource:(h=a.data)==null?void 0:h.data.map((l,c)=>{var y,_,g,j,m,f;return{key:c+1,title_uz:e.jsx("p",{children:l.title_uz}),title_en:e.jsx("p",{children:l.title_en}),frame:e.jsx("div",{style:{width:"50px",height:"50px"},onClick:()=>{s({status:"Frame",id:l._id}),t(!0)},children:e.jsx("img",{src:N,alt:"",style:{cursor:"pointer"}})}),category_uz:e.jsx("div",{children:(g=(_=(y=a==null?void 0:a.data)==null?void 0:y.data[c])==null?void 0:_.category)==null?void 0:g.map((u,x)=>e.jsx("p",{children:u.title_uz.substring(0,15)+"..."},x))}),category_en:e.jsx("div",{children:(f=(m=(j=a.data)==null?void 0:j.data[c])==null?void 0:m.category)==null?void 0:f.map((u,x)=>e.jsx("p",{children:u.title_en.substring(0,15)+"..."},x))}),buttons:e.jsxs("div",{style:{display:"flex",gap:"5px"},children:[e.jsx(r,{color:"red",title:"Delete",children:e.jsx(n,{style:{width:"40px",height:"40px",color:"red",borderColor:"red",fontSize:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},onClick:()=>{s({status:"Delete",id:l._id}),t(!0)},children:e.jsx(C,{})})},"1"),e.jsx(r,{title:"Change",color:"orange",children:e.jsx(n,{style:{width:"40px",height:"40px",color:"orange",borderColor:"orange",fontSize:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},onClick:()=>{s({status:"Update",id:l._id}),t(!0)},children:e.jsx(I,{})})},"2"),e.jsx(r,{title:"Single",color:"green",children:e.jsx(n,{style:{width:"40px",height:"40px",fontSize:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",borderColor:"green",color:"green"},onClick:()=>{s({status:"Single",id:l._id,url:"/media"}),t(!0)},children:e.jsx(k,{})})},"3")]})}})})})]})})}export{E as default};