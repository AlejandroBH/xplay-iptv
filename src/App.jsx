import ReactPlayer from "react-player/file";
import { useEffect, useState, useMemo, useCallback } from "react";
import chanels from "./chanels.json";
import GlobalStyle from "./components/GlobalStyle";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";
import ListChanels from "./components/ListChanels";
import ChannelIndicator from "./components/ChannelIndicator";
import BufferingSpinner from "./components/BufferingSpinner";
import { useLocalStorage, useWindowSize, useKeyboardShortcuts } from "./hooks";

const App = () => {
  const activeChanels = useMemo(() => chanels.filter((ch) => ch.active), []);

  const [numChanel, setNumChanel] = useLocalStorage("saveChanel", 0);
  const { width: windowWidth } = useWindowSize();

  const [playing, setPlaying] = useState(false);
  const [pip, setPip] = useState(false);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [showChannelIndicator, setShowChannelIndicator] = useState(false);
  const [objChanel, setObjChanel] = useState({
    title: null,
    icon: null,
    url: null,
  });
  const [openListChanels, setOpenListChanels] = useState(false);

  useEffect(() => {
    if (activeChanels.length > 0 && numChanel >= activeChanels.length) {
      setNumChanel(activeChanels.length - 1);
    }
  }, [activeChanels.length, numChanel, setNumChanel]);

  useEffect(() => {
    if (activeChanels.length === 0) {
      setObjChanel({
        title: "Sin canales",
        url: "./assets/static.mp4",
      });
      document.title = "xPlay IPTV - Sin canales";
    } else {
      const currentChanel = activeChanels[numChanel];
      setObjChanel(currentChanel);
      document.title = `xPlay IPTV - ${currentChanel.title}`;
    }
  }, [numChanel, activeChanels]);

  const handlePlay = useCallback(() => setPlaying((prev) => !prev), []);
  const handlePip = useCallback(() => setPip((prev) => !prev), []);
  const handleMuted = useCallback(() => setMuted((prev) => !prev), []);

  const handleBackChanel = useCallback(() => {
    if (activeChanels.length > 0) {
      setNumChanel((prev) => (prev <= 0 ? activeChanels.length - 1 : prev - 1));
      setShowChannelIndicator(true);
    }
  }, [activeChanels.length, setNumChanel]);

  const handleNextChanel = useCallback(() => {
    if (activeChanels.length > 0) {
      setNumChanel((prev) => (prev < activeChanels.length - 1 ? prev + 1 : 0));
      setShowChannelIndicator(true);
    }
  }, [activeChanels.length, setNumChanel]);

  const handleChangeOnWheel = useCallback(
    (event) => {
      if (!openListChanels) {
        event.deltaY === 100 ? handleNextChanel() : handleBackChanel();
      }
    },
    [openListChanels, handleNextChanel, handleBackChanel],
  );

  const handleError = useCallback(() => {
    console.error("Error al cargar el stream del canal");
    setObjChanel((prev) => ({
      ...prev,
      url: "./assets/static.mp4",
    }));
  }, []);

  const handleListChanels = useCallback(() => {
    setOpenListChanels(true);
  }, []);

  const handleCloseList = useCallback(() => {
    setOpenListChanels(false);
  }, []);

  useKeyboardShortcuts({
    onPreviousChannel: handleBackChanel,
    onNextChannel: handleNextChanel,
    onTogglePlay: handlePlay,
    onToggleMute: handleMuted,
    onOpenList: handleListChanels,
    onCloseList: handleCloseList,
  }, !openListChanels);

  return (
    <Container onWheel={handleChangeOnWheel}>
      <GlobalStyle />

      <ChannelIndicator
        currentChannel={numChanel}
        totalChannels={activeChanels.length}
        channelName={objChanel.title}
        show={showChannelIndicator}
      />

      <ReactPlayer
        width="100%"
        height={windowWidth < 720 ? "auto" : "100vh"}
        playing={playing}
        pip={pip}
        muted={muted}
        playsinline={true}
        controls={false}
        url={objChanel.url}
        onError={handleError}
        onBuffer={() => setBuffering(true)}
        onBufferEnd={() => setBuffering(false)}
        loop
      />

      {buffering && <BufferingSpinner />}
      {!openListChanels && (
        <ControlChanel
          infoChanel={objChanel}
          lengthChanels={activeChanels.length}
          handlePlay={handlePlay}
          handlePip={handlePip}
          handleMuted={handleMuted}
          statusPlay={playing}
          statusMuted={muted}
          handleBackChanel={handleBackChanel}
          handleNextChanel={handleNextChanel}
          handleListChanels={handleListChanels}
        />
      )}
      {openListChanels && activeChanels.length > 0 && (
        <ListChanels
          numChanel={numChanel}
          chanelList={activeChanels}
          setNumChanel={setNumChanel}
          setOpenListChanels={setOpenListChanels}
        />
      )}
    </Container>
  );
};

export default App;
