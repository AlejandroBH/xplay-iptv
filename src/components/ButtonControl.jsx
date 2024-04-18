/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonStyled = styled.button`
  background: transparent;
  font-size: 16px;
  border-radius: 100%;
  width: ${(props) => props.$sizeIcon};
  height: ${(props) => props.$sizeIcon};
  border: ${(props) => (!props.$mini ? "2px solid #ffffff5d" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > i {
    color: ${(props) => (!props.$mini ? "#ffffffaf" : "#ffffff5d")};
    background: transparent;
    font-size: ${(props) => (props.$sizeIcon > "50px" ? "24px" : "16px")};
  }

  &:active {
    animation: onClickAnimate 1s 1 ease-out;
  }

  &:focus-visible {
    outline: none;
  }

  @keyframes onClickAnimate {
    0% {
      color: #ffffff;
      background: #ffffff6e;
    }

    100% {
      background: transparent;
    }
  }
`;

const ButtonControl = ({
  eventHandle,
  iconButton,
  sizeIcon = "50px",
  mini = false,
}) => {
  return (
    <ButtonStyled onClick={eventHandle} $sizeIcon={sizeIcon} $mini={mini}>
      <i className={iconButton}></i>
    </ButtonStyled>
  );
};

export default ButtonControl;
