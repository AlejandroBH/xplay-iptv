/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";

const ListContainer = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: transparent;
  z-index: 2;
  background: rgba(0, 0, 0, 0.9);
  overflow-y: auto;
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

  @media screen and (width < 720px) {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    margin: 10px;
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

const ListChanels = ({ chanelList, setNumChanel, setOpenListChanels }) => {
  return (
    <ListContainer>
      {chanelList.map((chanel) => (
        <ListInfo
          key={chanel.id}
          onClick={() => {
            setNumChanel(chanel.id);
            setOpenListChanels(false);
          }}
        >
          <ListImage src={`./assets/images/chanels/${chanel.icon}`} alt="" />
          <ListTitle>{chanel.title}</ListTitle>
        </ListInfo>
      ))}
    </ListContainer>
  );
};

export default ListChanels;
