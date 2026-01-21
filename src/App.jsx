import ReactPlayer from "react-player/file";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import chanels from "./chanels.json";
import GlobalStyle from "./components/GlobalStyle";
import ControlChanel from "./components/ControlChanel";
import Container from "./components/Container";
import ListChanels from "./components/ListChanels";
import ChannelIndicator from "./components/ChannelIndicator";
import BufferingSpinner from "./components/BufferingSpinner";
import { useLocalStorage, useWindowSize, useKeyboardShortcuts, usePiPSupport } from "./hooks";

const App = () => {
  const activeChanels = useMemo(() => chanels.filter((ch) => ch.active), []);

  const [numChanel, setNumChanel] = useLocalStorage("saveChanel", 0);
  const { width: windowWidth } = useWindowSize();
  const pipSupported = usePiPSupport();
  const [autoPipEnabled] = useLocalStorage("autoPipEnabled", true);

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [pip, setPip] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
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

  const handlePip = useCallback(async () => {
    if (!pipSupported) {
      console.warn("Picture-in-Picture no está soportado en este navegador");
      return;
    }

    try {
      const videoElement = playerRef.current?.getInternalPlayer();

      if (!videoElement) {
        console.error("No se pudo acceder al elemento de video");
        return;
      }

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setPip(false);
      } else {
        await videoElement.requestPictureInPicture();
        setPip(true);
      }
    } catch (error) {
      console.error("Error al activar/desactivar Picture-in-Picture:", error);
      setPip(false);
    }
  }, [pipSupported]);

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

  const lastScrollTime = useRef(0);
  const SCROLL_THROTTLE_MS = 500;

  const handleChangeOnWheel = useCallback(
    (event) => {
      if (!openListChanels) {
        const now = Date.now();

        if (now - lastScrollTime.current >= SCROLL_THROTTLE_MS) {
          lastScrollTime.current = now;
          event.deltaY > 0 ? handleNextChanel() : handleBackChanel();
        }
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

  useEffect(() => {
    if ('mediaSession' in navigator && objChanel.title) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: objChanel.title,
        artist: 'xPlay IPTV',
        album: `Canal ${numChanel + 1} de ${activeChanels.length}`,
        artwork: objChanel.icon ? [
          { src: `./assets/images/chanels/${objChanel.icon}`, sizes: '512x512', type: 'image/png' }
        ] : []
      });

      navigator.mediaSession.setActionHandler('previoustrack', handleBackChanel);
      navigator.mediaSession.setActionHandler('nexttrack', handleNextChanel);
      navigator.mediaSession.setActionHandler('play', () => setPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setPlaying(false));
    }

    return () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      }
    };
  }, [objChanel, numChanel, activeChanels.length, handleBackChanel, handleNextChanel]);

  useEffect(() => {
    if (!autoPipEnabled || !pipSupported) return;

    const handleVisibilityChange = async () => {
      const videoElement = playerRef.current?.getInternalPlayer();
      if (!videoElement) return;

      if (document.hidden && isPipActive && !document.pictureInPictureElement) {
        try {
          await videoElement.requestPictureInPicture();
        } catch (error) {
          console.log("Auto-PiP no disponible sin interacción del usuario");
        }
      }

      if (!document.hidden && document.pictureInPictureElement) {
        try {
          await document.exitPictureInPicture();
        } catch (error) {
          console.log("No se pudo desactivar PiP:", error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPipActive, autoPipEnabled, pipSupported]);

  // Detectar eventos de PiP
  useEffect(() => {
    const videoElement = playerRef.current?.getInternalPlayer();
    if (!videoElement) return;

    const handleEnterPiP = () => setIsPipActive(true);
    const handleLeavePiP = () => setIsPipActive(false);

    videoElement.addEventListener('enterpictureinpicture', handleEnterPiP);
    videoElement.addEventListener('leavepictureinpicture', handleLeavePiP);

    return () => {
      videoElement.removeEventListener('enterpictureinpicture', handleEnterPiP);
      videoElement.removeEventListener('leavepictureinpicture', handleLeavePiP);
    };
  }, []);

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
        ref={playerRef}
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
          statusPip={isPipActive}
          pipSupported={pipSupported}
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
