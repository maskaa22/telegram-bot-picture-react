import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {



  const {onClose } = useTelegram();



  return (
    <div className="header">
      <h2 className="h2">Привіт!</h2>
      <div className="flex-button">
        {/* <input type="file" placeholder="Завантажити фото"/> */}
        <Button onClick={onClose}>Закрить</Button>
      </div>
    </div>
  )
};

export default Header;