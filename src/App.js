import './App.css';
import { useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  return (
    <div >
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
