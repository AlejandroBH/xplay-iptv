import ReactPlayer from "react-player";
import GlobalStyle from "./components/GlobalStyle";
import { useEffect, useState } from "react";
import chanels from "./chanels.json";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";

const App = () => {
  const [numChanel, setNumChanel] = useState(1);
  const [objChanel, setObjChanel] = useState({
    title: null,
    icon: null,
    url: null,
  });

  useEffect(() => {
    setObjChanel(chanels.filter((ch) => ch.id === numChanel)[0]);
  }, [numChanel]);

  const handleBackChanel = () =>
    numChanel <= 1 ? setNumChanel(chanels.length) : setNumChanel(numChanel - 1);

  const handleNextChanel = () =>
    numChanel < chanels.length ? setNumChanel(numChanel + 1) : setNumChanel(1);

  const handleChangeOnWheel = (event) =>
    event.deltaY == 100 ? handleNextChanel() : handleBackChanel();

  return (
    <Container onWheel={handleChangeOnWheel}>
      <GlobalStyle />
      <ReactPlayer
        playing
        muted
        width="100%"
        height="100vh"
        url={objChanel.url}
      ></ReactPlayer>
      <ControlChanel infoChanel={objChanel} />
    </Container>
  );
};

export default App;
