/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonStyled = styled.button`
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

  & > i {
    color: #ffffffaf;
    background: transparent;
    font-size: ${(props) => (!props.$bigIcon ? "16px" : "24px")};
  }

  &:hover {
    animation: onClickAnimate 1s 1 ease-out;
  }

  &:focus-visible {
    outline: none;
  }

  @keyframes onClickAnimate {
    0% {
      color: #ffffff;
      border: 2px solid #ffffff;
      background: #ffffff6e;
    }

    100% {
      background: transparent;
    }
  }
`;

const ButtonControl = ({ eventHandle, iconButton, bigIcon = false }) => {
  return (
    <ButtonStyled onClick={eventHandle} $bigIcon={bigIcon}>
      <i className={iconButton}></i>
    </ButtonStyled>
  );
};

export default ButtonControl;
