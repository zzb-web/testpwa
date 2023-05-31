import React,{useRef, useState,useEffect} from "react";
import './App.css'

const data = {'好':[1,2,3]}

export default ()=>{
  const editorRef = useRef(null);
  const [style, setstyle] = useState({ left: 0, top: 0 });
const [show, setshow] = useState(false);
const [polyphone, setpolyphone] = useState([]);
const [curIdx, setcurIdx] = useState(0);
  const [flag,setflag] = useState(true)
 useEffect(()=>{
  if(flag) return;
  let polyphoneDom = document.getElementsByTagName("polyphonemark");
  let fontArry = [];
  for (let i = 0, len = polyphoneDom.length; i < len; i++) {
  const element = polyphoneDom[i];
  fontArry.push(element.innerHTML);
  }
  for (let i = 0, len = polyphoneDom.length; i < len; i++) {
  const element = polyphoneDom[i];
  element.onclick = function (e) {
  let { pageX, pageY } = e;
  setstyle({
  left: pageX,
  top: pageY,
  });
  let text = element.innerHTML;
  console.log(text);
  const reg = new RegExp(text, "g");
  let match, match2;
  let idxArray = [];
  while ((match = reg.exec(editorRef.current.innerText)) !== null) {
  const index = match.index;
  idxArray.push(index);
  }
  let idxArray2 = [];
  while ((match2 = reg.exec(fontArry.join(""))) !== null) {
  const index2 = match2.index;
    idxArray2.push(index2);
  }
  let clickIdx = idxArray2.findIndex((item) => item == i);
  let _curIdx = idxArray[clickIdx];
  console.log(_curIdx);
  setcurIdx(_curIdx);
  // let { left, top } = quill.getBounds(_curIdx);
  
  // setstyle({
  // left: left + 20,
  // top: top,
  // });
  setpolyphone(data[text]);
  setshow(true);
}}
 },[flag])

  const insertCustomTag = ()=>{
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    console.log(range);
    range.deleteContents();
    const node = document.createElement('customtag');
    node.innerHTML = "5s";
    range.insertNode(node)
  }
  const format = ()=>{
    const content = editorRef.current.innerHTML;
    if(flag){
      const formattedContent = content.replace(/好/g,`<polyphonemark>好</polyphonemark>`);
      editorRef.current.innerHTML = formattedContent;
    }else{
      const formattedContent = content.replace(/<polyphonemark>(.*?)<\/polyphonemark>/g,"$1");
      editorRef.current.innerHTML = formattedContent;
    }
   setflag(!flag)
  }
  const selectpolyphoneHandle = (item)=>{
    const element = editorRef.current;
    const selection = window.getSelection();
    const range = document.createRange();
    console.log(range);
    const textNode = element.firstChild;
    
    range.setStart(textNode, curIdx);
    range.setEnd(textNode, curIdx);
    
    const customTag = document.createElement('polyphone');
    customTag.innerHTML = item;
    
    range.insertNode(customTag);
    range.setStartAfter(customTag);
    range.setEndAfter(customTag);
    
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  }
  const convertToSSMl = ()=>{
    const content = editorRef.current.innerHTML;
    const ssmlContent = content.replace(/<customtag>(.*?)<\/customtag>/g,"<breaks time='$1'/>")
    console.log(ssmlContent);
  }
  return <div >
    <div className="editor_main">
    <div contentEditable ref={editorRef} className="editor_box">
    你好，你好，你好
    </div>
    {show && (
<div style={style} className="polyphone_select_box">
{/* <div className="close_polyphone_icon" onClick={closeHandle}></div> */}
{polyphone.map((item, index) => (
<div
key={index}
onClick={() => {
selectpolyphoneHandle(item);
}}
>
{item}
</div>
))}
</div>
)}
    </div>
   
    <button onClick={insertCustomTag}>插入</button>
    <button onClick={format}>多音字</button>
    <button onClick={convertToSSMl}>ssml</button>
  </div>
}
