/* eslint-disable react/prop-types */
import styled from "styled-components";

const ControlSection = styled.section`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: transparent;
  z-index: 2;
`;

const ContainerSection = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: space-between;
  max-width: 850px;
  margin: 5px auto;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #ffffff15;
`;

const InfoChanel = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: transparent;
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

const ControlChanel = ({ infoChanel }) => {
  const imageChanel = `./images/chanels/${infoChanel.icon}`;
  const altChanel = `Icono de canal ${infoChanel.title}`;

  return (
    <ControlSection>
      <ContainerSection>
        <InfoChanel>
          <ImageChanel src={imageChanel} alt={altChanel} />
          <TitleChanel>{infoChanel.title}</TitleChanel>
        </InfoChanel>
      </ContainerSection>
    </ControlSection>
  );
};

export default ControlChanel;
