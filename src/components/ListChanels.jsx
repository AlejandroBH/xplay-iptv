/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";

const ListContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2;
`;

const ListChanels = ({ chanelList }) => {
  return (
    <ListContainer>
      {/* {chanelList.map((chanel) => <img key={chanel.id} width="100px" src="./assets/images/chanels/null.png" alt="" />)} */}
      {/* <img width="100px" src="./assets/images/chanels/null.png" alt="" /> */}
    </ListContainer>
  );
};

export default ListChanels;
