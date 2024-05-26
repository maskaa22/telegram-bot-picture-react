import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {

  const { user, onClose } = useTelegram();

  return (
    <div className="header">
      <h2>Привіт - <span className="username">{user?.username}</span>!</h2>
      <div className="flex-button">
        <Button>Завантажити фото</Button>
        <Button onClick={onClose}>Закрить</Button>
      </div>
    </div>
  )
};

export default Header;