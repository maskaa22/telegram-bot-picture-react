import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Main.css';
import { useCallback, useEffect, useState } from "react";

const Main = () => {

  const [image, setImage] = useState(null);

  const { onToogleButton, tg } = useTelegram();

  // const handleFileChange = (e) => {
  //   console.log(e.target.value)
  //   setImage(e.target.value);
  // }

  const onSendData = useCallback(()=> {
    const data = {image};
    tg.sendData(JSON.stringify(data))
  }, [image])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {tg.offEvent('mainButtonClicked', onSendData)}
  }, [onSendData])

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if(file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="main">

    {/* <input type="file" placeholder="Завантажити фото" onChange={(e) => handleFileChange(e)}/> */}

      {/* <img alt="for chat II" src="" className="img"/> */}

      <input type="file" accept="image/*" onChange={handleImageChange}/>
      {image && <img src={image} alt="uploaded" className="img"/>}


       {/* <div><textarea cols={11} rows={5} className="textarea" /></div> */}

      <div><Button onClick={onToogleButton}>Що зображено на малюнку?</Button></div> 

    </div>
  )
};

export default Main;