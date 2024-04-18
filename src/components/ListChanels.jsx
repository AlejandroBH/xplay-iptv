/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import styled from "styled-components";

const ListContainer = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: transparent;
  z-index: 2;
  background: rgba(0, 0, 0, 0.9);
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
  background: rgb(129, 129, 129);
  background: linear-gradient(
    90deg,
    rgba(129, 129, 129, 0.5) 0%,
    rgba(129, 129, 129, 0.05) 50%,
    rgba(129, 129, 129, 0) 75%
  );
  transition: 0.3s ease;

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

    &:hover {
      transform: none;
    }
  }
`;

const IvisibleInput = styled.input`
  width: 0px;
  height: 0px;
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
  useEffect(() => {
    document.getElementById(`chanel_${numChanel}`).focus();
    document.querySelector(`.item-list_${numChanel}`).style.borderLeft =
      "3px solid #ffffff";
  });

  return (
    <ListContainer>
      {chanelList.map((chanel, idArray) => (
        <ListInfo
          className={`item-list_${idArray}`}
          key={idArray}
          onClick={() => {
            setNumChanel(idArray);
            setOpenListChanels(false);
          }}
        >
          <IvisibleInput id={`chanel_${idArray}`} type="radio" readOnly />
          <ListImage src={`./assets/images/chanels/${chanel.icon}`} alt="" />
          <ListTitle>{chanel.title}</ListTitle>
        </ListInfo>
      ))}
    </ListContainer>
  );
};

export default ListChanels;
