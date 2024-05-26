import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Main.css';
import { useState } from "react";

const Main = () => {

  const { onToogleButton } = useTelegram();

  const [url, setUrl] = useState();

  const Upload = () => <input type="file" />

  console.log(url)
  return (
    <div className="main">

      {/* <Upload onUpload={setUrl}>
        <img src={url} alt="" />
      </Upload> */}

    <input type="file" placeholder="Завантажити фото"/>

      {/* <img alt="for chat II" src="" className="img"/> */}




       {/* <div><textarea cols={11} rows={5} className="textarea" /></div> */}

      <div><Button onClick={onToogleButton}>Що зображено на малюнку?</Button></div> 

    </div>
  )
};

export default Main;