/* eslint-disable react-hooks/exhaustive-deps */
import ReactPlayer from "react-player/file";
import { useEffect, useState } from "react";
import chanels from "./chanels.json";
import GlobalStyle from "./components/GlobalStyle";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";
import ListChanels from "./components/ListChanels";

const App = () => {
  const activeChanels = chanels.filter((ch) => ch.active);

  const saveChanel = parseInt(localStorage.getItem("saveChanel")) || 0;
  const [playing, setPlaying] = useState(false);
  const [numChanel, setNumChanel] = useState(saveChanel);
  const [objChanel, setObjChanel] = useState({
    title: null,
    icon: null,
    url: null,
  });
  const [openListChanels, setOpenListChanels] = useState(false);

  if (activeChanels.length < saveChanel) {
    localStorage.setItem("saveChanel", activeChanels.length - 1);
  } else {
    localStorage.setItem("saveChanel", numChanel);
  }

  useEffect(() => {
    if (activeChanels.length === 0) {
      setObjChanel({
        title: "Sin canales",
        url: "./assets/static.mp4",
      });
    } else {
      setObjChanel(activeChanels[numChanel]);
    }
  }, [numChanel]);

  const handlePlay = () => setPlaying(!playing);

  const handleBackChanel = () => {
    if (activeChanels.length > 0) {
      numChanel <= 0
        ? setNumChanel(activeChanels.length - 1)
        : setNumChanel(numChanel - 1);
    }
  };

  const handleNextChanel = () =>
    numChanel < activeChanels.length - 1
      ? setNumChanel(numChanel + 1)
      : setNumChanel(0);

  const handleChangeOnWheel = (event) => {
    if (openListChanels === false) {
      event.deltaY == 100 ? handleNextChanel() : handleBackChanel();
    } else {
      return;
    }
  };

  const handleError = () => {
    // setObjChanel({
    //   title: objChanel.title,
    //   icon: objChanel.icon,
    //   url: "./assets/static.mp4",
    // });
    setNumChanel(numChanel);
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
          lengthChanels={activeChanels.length}
          handlePlay={handlePlay}
          statusPlay={playing}
          handleBackChanel={handleBackChanel}
          handleNextChanel={handleNextChanel}
          handleListChanels={handleListChanels}
        />
      )}
      {openListChanels && activeChanels.length > 0 && (
        <ListChanels
          chanelList={activeChanels}
          setNumChanel={setNumChanel}
          setOpenListChanels={setOpenListChanels}
        />
      )}
    </Container>
  );
};

export default App;
