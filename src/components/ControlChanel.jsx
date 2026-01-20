/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonControl from "./ButtonControl";
import { useWindowSize } from "../hooks";

const ControlSection = styled.section`
  opacity: ${(props) => (props.$onPlay ? "0" : "100")};
  width: 100%;
  position: absolute;
  bottom: 0;
  background: transparent;
  z-index: 2;
  transition: 0.3s ease-out;

  &:hover {
    opacity: 100;
  }

  @media screen and (width < 720px) {
    position: static;
    opacity: 100;
  }
`;

const ContainerSection = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: space-between;
  max-width: 850px;
  margin: 5px auto;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #ffffff15;

  @media screen and (width < 720px) {
    flex-direction: column;
    border: none;
  }
`;

const InfoChanel = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: transparent;
  cursor: pointer;

  @media screen and (width < 720px) {
    background: #ffffff42;
    padding: 10px;
    max-width: 600px;
    width: 100%;
    zoom: 0.7;
    border-radius: 16px;
    margin-bottom: 20px;
  }
`;

const ImageChanel = styled.img`
  width: 100px;
  height: 100px;
  background: transparent;
`;

const TitleChanel = styled.h2`
  font-size: 30px;
  background: transparent;
`;

const ButtonsChanel = styled.div`
  display: flex;
  background: transparent;
  align-items: center;
  gap: 10px;

  @media screen and (width < 720px) {
    zoom: 1.35;
    gap: 5px;
  }

  @media screen and (width < 350px) {
    zoom: 1.1;
  }
`;

const ControlChanel = ({
  infoChanel,
  lengthChanels,
  handlePlay,
  handlePip,
  handleMuted,
  statusPlay,
  statusMuted,
  handleBackChanel,
  handleNextChanel,
  handleListChanels,
}) => {
  const { width: windowWidth } = useWindowSize();

  const imageChanel =
    infoChanel.icon === null || infoChanel.icon === undefined
      ? `./assets/images/chanels/null.png`
      : `./assets/images/chanels/${infoChanel.icon}`;
  const altChanel = `Icono de canal ${infoChanel.title}`;

  return (
    <ControlSection $onPlay={statusPlay}>
      <ContainerSection>
        <InfoChanel
          onClick={() => {
            lengthChanels > 0 ? handleListChanels() : null;
          }}
        >
          <ImageChanel src={imageChanel} alt={altChanel} />
          <TitleChanel>{infoChanel.title}</TitleChanel>
        </InfoChanel>
        <ButtonsChanel>
          <ButtonControl
            eventHandle={handleMuted}
            iconButton={
              statusMuted
                ? "fa-solid fa-volume-xmark"
                : "fa-solid fa-volume-high"
            }
            sizeIcon="35px"
            mini={true}
          ></ButtonControl>
          <ButtonControl
            eventHandle={handleBackChanel}
            iconButton={"fa-solid fa-backward"}
          ></ButtonControl>
          <ButtonControl
            eventHandle={handlePlay}
            iconButton={!statusPlay ? "fa-solid fa-play" : "fa-solid fa-pause"}
            sizeIcon="65px"
          ></ButtonControl>
          <ButtonControl
            eventHandle={handleNextChanel}
            iconButton={"fa-solid fa-forward"}
          ></ButtonControl>
          <ButtonControl
            eventHandle={handlePip}
            iconButton={"fa-solid fa-arrow-up-right-from-square"}
            sizeIcon="35px"
            mini={true}
          ></ButtonControl>
        </ButtonsChanel>
      </ContainerSection>
    </ControlSection>
  );
};

export default ControlChanel;
