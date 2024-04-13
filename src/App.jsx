import ReactPlayer from "react-player/file";
import { useEffect, useState } from "react";
import chanels from "./chanels.json";
import GlobalStyle from "./components/GlobalStyle";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";
import ListChanels from "./components/ListChanels";

const App = () => {
  const saveChanel = parseInt(localStorage.getItem("saveChanel")) || 1;
  const [playing, setPlaying] = useState(false);
  const [numChanel, setNumChanel] = useState(saveChanel);
  const [objChanel, setObjChanel] = useState({
    title: null,
    icon: null,
    url: null,
  });
  const [openListChanels, setOpenListChanels] = useState(false);

  localStorage.setItem("saveChanel", numChanel);

  useEffect(() => {
    setObjChanel(chanels.filter((ch) => ch.id === numChanel)[0]);
  }, [numChanel]);

  const handlePlay = () => setPlaying(!playing);

  const handleBackChanel = () =>
    numChanel <= 1 ? setNumChanel(chanels.length) : setNumChanel(numChanel - 1);

  const handleNextChanel = () =>
    numChanel < chanels.length ? setNumChanel(numChanel + 1) : setNumChanel(1);

  const handleChangeOnWheel = (event) => {
    if (openListChanels === false) {
      event.deltaY == 100 ? handleNextChanel() : handleBackChanel();
    } else {
      return;
    }
  };

  const handleError = () => {
    setObjChanel({
      title: objChanel.title,
      icon: objChanel.icon,
      url: "./assets/static.mp4",
    });
  };

  const handleListChanels = () => {
    setOpenListChanels(true);
  };

  return (
    <Container onWheel={handleChangeOnWheel}>
      <GlobalStyle />
      <ReactPlayer
        width="100%"
        height={innerWidth < 720 ? "auto" : "100vh"}
        playing={playing}
        url={objChanel.url}
        onError={handleError}
        loop
      ></ReactPlayer>
      {!openListChanels && (
        <ControlChanel
          infoChanel={objChanel}
          handlePlay={handlePlay}
          statusPlay={playing}
          handleBackChanel={handleBackChanel}
          handleNextChanel={handleNextChanel}
          handleListChanels={handleListChanels}
        />
      )}
      {openListChanels && (
        <ListChanels
          chanelList={chanels}
          setNumChanel={setNumChanel}
          setOpenListChanels={setOpenListChanels}
        />
      )}
    </Container>
  );
};

export default App;
