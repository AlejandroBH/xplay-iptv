/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonControl from "./ButtonControl";

const HeaderContainer = styled.header`
  position: absolute;
  width: 100%;
  z-index: 2;
  background: transparent;
  top: 0;
`;

const HeaderDiv = styled.div`
  padding: 25px 35px;
  margin: auto;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.h1`
  background: transparent;
`;

const Header = ({ handleSettings }) => {
  return (
    <HeaderContainer>
      <HeaderDiv>
        <HeaderLogo>LOGO</HeaderLogo>
        <ButtonControl
          eventHandle={handleSettings}
          iconButton={"fa-solid fa-gear"}
          sizeIcon="65px"
          mini={true}
        />
      </HeaderDiv>
    </HeaderContainer>
  );
};

export default Header;
