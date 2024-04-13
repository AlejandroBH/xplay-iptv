/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonControl from "./ButtonControl";

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

  @media screen and (width < 720px) {
    zoom: 1.3;
  }
`;

const ControlChanel = ({
  infoChanel,
  handlePlay,
  statusPlay,
  handleBackChanel,
  handleNextChanel,
}) => {
  const imageChanel =
    infoChanel.icon === null
      ? `./assets/images/chanels/null.png`
      : `./assets/images/chanels/${infoChanel.icon}`;
  const altChanel = `Icono de canal ${infoChanel.title}`;

  return (
    <ControlSection $onPlay={statusPlay}>
      <ContainerSection>
        <InfoChanel>
          <ImageChanel src={imageChanel} alt={altChanel} />
          <TitleChanel>{infoChanel.title}</TitleChanel>
        </InfoChanel>
        <ButtonsChanel>
          <ButtonControl
            eventHandle={handleBackChanel}
            iconButton={"fa-solid fa-backward"}
          ></ButtonControl>
          <ButtonControl
            eventHandle={handlePlay}
            iconButton={!statusPlay ? "fa-solid fa-play" : "fa-solid fa-pause"}
            bigIcon
          ></ButtonControl>
          <ButtonControl
            eventHandle={handleNextChanel}
            iconButton={"fa-solid fa-forward"}
          ></ButtonControl>
        </ButtonsChanel>
      </ContainerSection>
    </ControlSection>
  );
};

export default ControlChanel;
