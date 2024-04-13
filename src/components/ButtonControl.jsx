/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonStyled = styled.button`
  color: #ffffffaf;
  background: transparent;
  font-size: 16px;
  border-radius: 100%;
  width: ${(props) => (!props.$bigIcon ? "50px" : "65px")};
  height: ${(props) => (!props.$bigIcon ? "50px" : "65px")};
  border: 2px solid #ffffff5d;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }
`;

const IconStyled = styled.i`
  background: transparent;
  color: #bfbfbf;
`;

const ButtonControl = ({ eventHandle, iconButton, bigIcon = false }) => {
  return (
    <ButtonStyled onClick={eventHandle} $bigIcon={bigIcon}>
      <IconStyled className={iconButton}></IconStyled>
    </ButtonStyled>
  );
};

export default ButtonControl;
