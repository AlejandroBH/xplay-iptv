import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import chanels from "./chanels.json";
import GlobalStyle from "./components/GlobalStyle";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";

const App = () => {
  const saveChanel = parseInt(localStorage.getItem("saveChanel")) || 1;
  const [playing, setPlaying] = useState(false);
  const [numChanel, setNumChanel] = useState(saveChanel);
  const [objChanel, setObjChanel] = useState({
    title: null,
    icon: null,
    url: null,
  });

  localStorage.setItem("saveChanel", numChanel);

  useEffect(() => {
    setObjChanel(chanels.filter((ch) => ch.id === numChanel)[0]);
  }, [numChanel]);

  const handlePlay = () => setPlaying(!playing);

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
        width="100%"
        height={innerWidth < 720 ? "auto" : "100vh"}
        playing={playing}
        url={objChanel.url}
      ></ReactPlayer>
      <ControlChanel
        infoChanel={objChanel}
        handlePlay={handlePlay}
        statusPlay={playing}
        handleBackChanel={handleBackChanel}
        handleNextChanel={handleNextChanel}
      />
    </Container>
  );
};

export default App;
