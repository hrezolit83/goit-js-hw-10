import{i}from"./vendor-651d7991.js";const n=document.querySelector(".form");function l(e,o){return new Promise((s,t)=>{setTimeout(()=>{o==="fulfilled"?s(`Promise resolved after ${e} milliseconds`):t(`Promise rejected after ${e} milliseconds`)},e)})}n.addEventListener("submit",e=>{e.preventDefault();const o=parseInt(e.target.elements.delay.value,10),s=e.target.elements.state.value;l(o,s).then(t=>{console.log(t),i.success({title:"",message:`${t}`,position:"topRight"})}).catch(t=>{console.log(t),i.error({title:"",message:`${t}`,position:"topRight"})})});
//# sourceMappingURL=02-snackbar-dc62aac1.js.map
