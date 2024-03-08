import logo from './logo.svg';
import classes from "./App.module.css"
import { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

function App() {
  const ref = useRef();
  const [src,setSrc] = useState();
  const [text,setText] = useState();

  const handleFileChange = () => {
    const fileInputSrc = ref.current.files[0];
    const url = URL.createObjectURL(fileInputSrc)
    setSrc(url);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const worker = await createWorker();
    await worker.loadLanguage('jpn');
    await worker.initialize("jpn");
    const rectangle = {left:0,top:0,width:320,height:320}
    const { data:{text}} = await worker.recognize(src,{rectangle});
    console.log(text)
    setText(text)
    await worker.terminate();
  }

  return (
    <div className={classes.App}>
    <div className={classes.imgWrapper}>
      <img className={classes.img} src={src ? src : ""} alt="" />
    </div>
    <form action="" onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} ref={ref}/>
      <input type="submit" value="読み取る"/>
    </form>
    {text ? (<p>結果: <span className={classes.bold}>{text.replace(/\s/g,"")}</span></p>) :(<p>画像を選択してください。</p>)}

  </div>
  );
}

export default App;
