import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Main.css';

const Main = () => {

  const {onToogleButton} = useTelegram();

  return (
    <div className="main">

      <img alt="for chat II" src="" className="img"/>

      <div><textarea cols={11} rows={5} className="textarea"/></div>

      <div><Button onClick={onToogleButton}>Що зображено на малюнку?</Button></div>

    </div>
  )
};

export default Main;