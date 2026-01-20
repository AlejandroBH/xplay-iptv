/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import styled from "styled-components";

const ListContainer = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2;
  overflow-y: auto;
  padding-bottom: 100px;
`;

const ListInfo = styled.div`
  width: 50%;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  margin: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgba(129, 129, 129, 0.5) 0%,
    rgba(129, 129, 129, 0.05) 50%,
    rgba(129, 129, 129, 0) 75%
  );
  transition: 0.3s ease;
  border-left: ${(props) =>
    props.$isSelected ? "3px solid #ffffff" : "3px solid transparent"};

  &:hover {
    transform: translateX(15px);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 75%
    );
  }

  @media screen and (width < 720px) {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    margin: 10px;
    border-left: none;
    background: ${(props) =>
      props.$isSelected
        ? "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 75%)"
        : "linear-gradient(90deg, rgba(129, 129, 129, 0.5) 0%, rgba(129, 129, 129, 0.05) 50%, rgba(129, 129, 129, 0) 75%)"};

    &:hover {
      transform: none;
      background: linear-gradient(
        90deg,
        rgba(129, 129, 129, 0.5) 0%,
        rgba(129, 129, 129, 0.05) 50%,
        rgba(129, 129, 129, 0) 75%
      );
    }
  }
`;

const ListImage = styled.img`
  width: 60px;
  height: 60px;
  background: transparent;
`;

const ListTitle = styled.h3`
  font-size: 18px;
  background: transparent;
`;

const ListChanels = ({
  numChanel,
  chanelList,
  setNumChanel,
  setOpenListChanels,
}) => {
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, []);

  const handleChanelClick = (idArray) => {
    setNumChanel(idArray);
    setOpenListChanels(false);
  };

  return (
    <ListContainer>
      {chanelList.map((chanel, idArray) => (
        <ListInfo
          key={chanel.id}
          ref={idArray === numChanel ? selectedRef : null}
          $isSelected={idArray === numChanel}
          onClick={() => handleChanelClick(idArray)}
        >
          <ListImage
            src={`./assets/images/chanels/${chanel.icon}`}
            alt={`Logo de ${chanel.title}`}
            onError={(e) => {
              e.target.src = "./assets/images/chanels/null.png";
            }}
          />
          <ListTitle>{chanel.title}</ListTitle>
        </ListInfo>
      ))}
    </ListContainer>
  );
};

export default ListChanels;
