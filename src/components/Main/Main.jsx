import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Main.css';
import { useCallback, useEffect, useState } from "react";

const Main = () => {

  const [image, setImage] = useState('');

  const { onToogleButton, tg } = useTelegram();

  const handleFileChange = (e) => {
    console.log(e.target.value)
    setImage(e.target.value);
  }

  const onSendData = useCallback(()=> {
    const data = {image};
    tg.sendData(JSON.stringify(data))
  }, [image])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  }, [onSendData])

  
  return (
    <div className="main">

    <input type="file" placeholder="Завантажити фото" onChange={(e) => handleFileChange(e)}/>

      {/* <img alt="for chat II" src="" className="img"/> */}




       {/* <div><textarea cols={11} rows={5} className="textarea" /></div> */}

      <div><Button onClick={onToogleButton}>Що зображено на малюнку?</Button></div> 

    </div>
  )
};

export default Main;